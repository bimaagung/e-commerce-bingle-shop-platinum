class UserImageUC {
    constructor(UserImageRepository, UserRespository) {
      this.userImageRepository = UserImageRepository;
      this.userRespository = UserRespository;
    }
    async createImageUser(imageData) {
      let is_success = false;
      let image = null;
      let user = await this.userRespository.getUserByID(
        imageData.user_id
      );
      if (user == null) {
        return {
          is_success: is_success,
          image: image,
          message: "failed add image, user not found",
        };
      }
      image = await this.userImageRepository.createAvatar(imageData);
      if (image == null) {
        return {
          is_success: is_success,
          user: user,
          message: "internal server error ",
        };
      }
      is_success = true;
      return {
        is_success: is_success,
        image: image,
      };
    }
    async updateImageUser(imageData, id) {
      let is_success = false;
      let image = null;
      image = await this.userImageRepository.getAvatarByID(id);
      if (image == null) {
        return {
          is_success: is_success,
          image: image,
          message: "image not found",
        };
      }
      image = await this.userImageRepository.updateAvatar(imageData, id);
      if (image == null) {
        return {
          is_success: is_success,
          image: image,
          message: "internal server error",
        };
      }
      is_success = true;
      return {
        is_success: is_success,
        image: image,
      };
    }
    async deleteImageUser(id) {
      let is_success = false;
      let image = null;
      image = await this.userImageRepository.getAvatarByID(id);
      if (image == null) {
        return {
          is_success: is_success,
          image: image,
          message: "image not found",
        };
      }
      image = await this.userImageRepository.deleteAvatar(id);
      if (image == null) {
        return {
          is_success: is_success,
          image: image,
          message: "internal server error",
        };
      }
      is_success = true;
      return {
        is_success: is_success,
        image: image,
      };
      
    }
  }
  
  module.exports = UserImageUC;