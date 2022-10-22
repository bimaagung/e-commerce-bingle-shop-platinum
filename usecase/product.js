/* eslint-disable no-return-await */
class ProductUC {
  constructor(
    productRepository,
    categoryRepository,
    productImageRepository,
    defaultImage,
    _,
  ) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.productImageRepository = productImageRepository;
    this.defaultImage = defaultImage;
    this._ = _;
  }

  async getAllProducts(filters) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: [],
    };
    let getAllProducts = await this.productRepository.getAllProducts(filters);

    result.isSuccess = true;
    result.status = 200;
    result.data = getAllProducts;
    return result;
  }

  async getProductByKeyword(keyword) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: [],
    };
    let product = await this.productRepository.getAllProducts(keyword);
    if (product.length === 0) {
      result.reason = 'no matching product ';
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = product;
    return result;
  }

  async getProductById(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let getProductByID = await this.productRepository.getProductByID(id);
    if (getProductByID == null) {
      result.reason = 'product not found';
      return result;
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = getProductByID;
    return result;
  }

  async addProduct(dataProduct) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    let existCategory = await this.categoryRepository.getCategoryByID(
      dataProduct.category_id,
    );
    if (existCategory === null) {
      result.reason = 'failed to add, category not found';
      return result;
    }

    let product = await this.productRepository.addProduct(dataProduct);

    const setImageAsCover = {
      url: this.defaultImage.DEFAULT_PRODUCT_IMAGE,
      cover_image: true,
      product_id: product.id,
    };
    let cover_image = await this.productImageRepository.createImage(
      setImageAsCover,
    );

    const setCoverImageID = {
      cover_imageID: cover_image.id,
    };

    await this.productRepository.updateProduct(setCoverImageID, product.id);
    let getProduct = await this.productRepository.getProductByID(product.id);

    result.isSuccess = true;
    result.data = getProduct;
    result.status = 201;
    return result;
  }

  async updateProduct(product, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: '',
      data: null,
    };

    // check product not null
    let existProduct = await this.productRepository.getProductByID(id);

    if (existProduct === null) {
      result.reason = 'product not found';
      return result;
    }
    let updateProduct = await this.productRepository.updateProduct(product, id);

    result.isSuccess = true;
    result.status = 200;
    result.data = updateProduct;
    return result;
  }

  async deleteProduct(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: '',
      data: null,
    };
    let product = await this.productRepository.getProductByID(id);
    if (product === null) {
      result.reason = 'product not found';
      return result;
    }
    let image = await this.productImageRepository.getAllImageByProductID(
      product.id,
    );
    await this.deleteAllImageProduct(image);

    result.isSuccess = true;
    result.status = 200;
    return result;
  }

  async deleteAllImageProduct(image) {
    await image.forEach((data) => {
      if (data.product_id === data.product_id) {
        this.productImageRepository.deleteImage(data.id);
        if (data.length === 0) {
          this.productRepository.deleteProduct(image.product_id);
        }
      }
    });
  }
}

module.exports = ProductUC;
