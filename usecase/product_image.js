/* eslint-disable no-return-await */
const defaultImage = require("../internal/constant/defaultImage");
const _ = require("loadsh");
class ProductImageUC {
  constructor(ProductImageRepository, ProductRepository, cloudinary, _) {
    this.productImageRepository = ProductImageRepository;
    this.productRepository = ProductRepository;
    this.cloudinary = cloudinary;
    this._ = _;
  }

  async getImageProductByProductID(product_id) {
    let result = {
      isSuccess: false,
      reason: "success",
      status: 404,
      data: [],
    };

    let existProduct = await this.productRepository.getProductByID(product_id);
    if (existProduct === null) {
      result.reason = "product not found";
      return result;
    }
    let image = await this.productImageRepository.getAllImageByProductID(
      product_id
    );

    result.isSuccess = true;
    result.status = 200;
    result.data = image;

    return result;
  }
  async getImageProductByID(imageId) {
    let result = {
      isSuccess: false,
      reason: "failed",
      status: 404,
      data: null,
    };
    let image = await this.productImageRepository.getImageByID(imageId);
    if (image === null) {
      result.reason = "image not found";
      return result;
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = image;
    return result;
  }

  async createImageProduct(data) {
    let result = {
      isSuccess: false,
      reason: "failed",
      status: 404,
      data: null,
    };
    if (data.url === null) {
      result.reason = "failed upload, please insert file";
      return result;
    }

    let product = await this.productRepository.getProductByID(data.product_id);
    if (product == null) {
      result.reason = "failed add image, product not found";
      return result;
    }

    let existImage = await this.productImageRepository.getAllImageByProductID(
      data.product_id
    );

    if (existImage.length === 9) {
      result.reason = "failed add image, maximum limit image";
      result.status = 400;
      return result;
    }
    await this.deleteDefaultImage(existImage);

    let uploadImage = await this.cloudinary.uploadCloudinaryProduct(data.url);
    data.url = uploadImage;
    let image = await this.productImageRepository.createImage(data);

    await this.setCoverImageByProductId(data.product_id);

    result.isSuccess = true;
    result.status = 200;
    result.data = image;
    return result;
  }

  async setCoverImage(images) {
    let existCover = this._.find(images, ["cover_image", true]);

    if (!existCover && images.length) {
      let image = images[0];

      const newCoverImage = {
        cover_image: true,
      };
      await this.productImageRepository.updateImage(newCoverImage, image.id);

      const setCoverImageID = {
        cover_imageID: image.id,
      };
      await this.productRepository.updateProduct(
        setCoverImageID,
        image.product_id
      );
    }
  }
  async setCoverImageByProductId(product_id) {
    let images = await this.productImageRepository.getAllImageByProductID(
      product_id
    );
    if (images.length === 0) {
      let dataImage = {
        url: defaultImage.DEFAULT_PRODUCT_IMAGE,
        cover_image: true,
        product_id: product_id,
      };
      let newImage = await this.productImageRepository.createImage(dataImage);

      const setCoverImageID = {
        cover_imageID: newImage.id,
      };
      await this.productRepository.updateProduct(setCoverImageID, product_id);
    }
    let existCover = this._.find(images, ["cover_image", true]);

    if (!existCover && images.length) {
      let image = images[0];
      const newCoverImage = {
        cover_image: true,
      };
      await this.productImageRepository.updateImage(newCoverImage, image.id);
      const setCoverImageID = {
        cover_imageID: image.id,
      };

      await this.productRepository.updateProduct(setCoverImageID, product_id);
    }
  }

  async deleteDefaultImage(image) {
    await image.forEach((data) => {
      if (data.url === defaultImage.DEFAULT_PRODUCT_IMAGE) {
        this.deleteImageProduct(data.id);
      }
    });
  }

  async updateImageProduct(imageData, id) {
    let result = {
      isSuccess: false,
      reason: "success",
      status: 404,
      data: null,
    };
    let image = await this.productImageRepository.getImageByID(id);
    if (image == null) {
      result.reason = "image not found";
      return result;
    }
    imageData.url = await cloudinary.uploadCloudinaryProduct(imageData.url);
    image = await this.productImageRepository.updateImage(imageData, id);
    result.isSuccess = true;
    result.status = 200;
    result.data = image;
    return result;
  }

  async changeCoverImage(image_id, product_id) {
    let result = {
      isSuccess: false,
      reason: "failed",
      status: 404,
    };

    let imageExist = await this.productImageRepository.getAllImageByProductID(
      image_id
    );
    if (imageExist === null) {
      result.reason = "image not found";
      return result;
    }

    let getCoverImage = await this.productImageRepository.getCoverImage(
      product_id
    );
    if (getCoverImage == null) {
      result.reason = "image not found";
      return result;
    }
    const changeCoverImageToFalse = {
      cover_image: false,
    };
    await this.productImageRepository.updateImage(changeCoverImageToFalse, getCoverImage.id);
    const newCoverImage = {
      cover_image: true,
    };

    await this.productImageRepository.updateImage(newCoverImage, image_id);

    const setCoverImageID = {
      cover_imageID: image_id,
    };
    await this.productRepository.updateProduct(setCoverImageID, product_id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async deleteImageProduct(id) {
    let result = {
      isSuccess: false,
      reason: "success",
      status: 404,
      data: null,
    };
    let image = await this.productImageRepository.getImageByID(id);
    let product_id = image.product_id;
    if (image == null) {
      result.reason = "image not found";
      return result;
    }

    await this.productImageRepository.deleteImage(id);
    await this.setCoverImageByProductId(product_id);
    result.isSuccess = true;
    result.status = 200;
    return result;
  }
}

module.exports = ProductImageUC;
