const { UserImage } = require("../models")

class UserImageRepository {
  constructor() {
    this.userImageModel = UserImage;
  }
  async createAvatar(images) {
    return await this.userImageModel.create(images)

  }
  async updateAvatar(images, id) {
    return await this.userImageModel.update(images, {
      where: {id},
    })
}
  async getAvatarByID(id){
    return await this.userImageModel.findOne({
      where : {id},
    })
  }
  async deleteAvatar(id){
    return await this.userImageModel.destroy({
      where : {id},
    })
  }
}

module.exports = UserImageRepository