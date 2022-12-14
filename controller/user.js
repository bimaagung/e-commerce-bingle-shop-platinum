const resData = require("../helper/response");

module.exports = {
  getOneUser: async (req, res, next) => {
    /*
      #swagger.tags = ['User']
      #swagger.responses[200] = {
        description: "Berhasil melihat profil berdasarkan id pengguna",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successGetUserById"
                  }
              }
          }
      }
      #swagger.responses[404] = {
        description: "Pengguna tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/userNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.user;
      let user = await req.userUC.getUserByID(id);

      if (user.isSuccess === false) {
        return res.status(user.statusCode).json(resData.failed(user.reason));
      }

      res.status(user.statusCode).json(resData.success(user.data));
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    /*
      #swagger.tags = ['User']

      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdateUser" }
      }

      #swagger.responses[200] = {
        description: "Berhasil memperbaharui profil pengguna",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successUser"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Pengguna tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/userNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.user;
      let user = {
        name: req.body.name,
        username: req.body.username,
        telp: req.body.telp,
      };

      let updateUser = await req.userUC.updateUserProfile(user, id);

      if (updateUser.isSuccess === false) {
        return res
          .status(updateUser.statusCode)
          .json(resData.failed(updateUser.reason));
      }

      res.status(updateUser.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },

  updateAvatar: async (req, res, next) => {
    /*
    #swagger.tags = ['User']
    #swagger.consumes = ['multipart/form-data']
    #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            image: {
                                type: "string",
                                format: "binary"
                            }
                        },
                    }
                }
            }
        }

    #swagger.responses[200] = {
      description: "Berhasil memperbaharui password pengguna",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/definitions/successUser"
                }
            }
        }
    }

    #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }
    */
    try {
      let { id } = req.user;
      let user = {
        image: req.file.path,
      };
      let updateAvatar = await req.userUC.updateUserImage(user, id);
      if (updateAvatar.isSuccess === false) {
        return res
          .status(updateAvatar.statusCode)
          .json(resData.failed(updateAvatar.reason));
      }
      res.status(updateAvatar.statusCode).json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  updatePassword: async (req, res, next) => {
    /*
      #swagger.tags = ['User']

      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/bodyUpdatePassword" }
      }

      #swagger.responses[200] = {
        description: "Berhasil memperbaharui password pengguna",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successUser"
                  }
              }
          }
      }

      #swagger.responses[400] = {
        description: "Password dan confirmPassword tidak sesuai",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/notMatchPassword"
                  }
              }
          }
      }

      #swagger.responses[404] = {
        description: "Pengguna tidak ditemukan",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/userNotFound"
                  }
              }
          }
      }

      #swagger.responses[401] = {
        description: "Akun tidak valid",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/unathorized"
                  }
              }
          }
      }

    */
    try {
      let { id } = req.user;
      let dataPassword = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmNewPassword: req.body.confirmNewPassword,
      };

      let updatePassword = await req.userUC.updatePassword(dataPassword, id);

      if (updatePassword.isSuccess === false) {
        return res
          .status(updatePassword.statusCode)
          .json(resData.failed(updatePassword.reason));
      }

      res.status(updatePassword.statusCode).json(resData.success());
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    /*
      #swagger.tags = ['User']
    */
    let email = req.query.email;
    let user = {
      newPassword: req.body.newPassword,
      confirmNewPassword: req.body.confirmNewPassword,
      otp_code: req.body.otp_code,
    };
    try {
      resReset = await req.userUC.resetPassword(user, email);
      if (resReset.isSuccess !== true) {
        return res
          .status(resReset.statusCode)
          .json(resData.failed(resReset.reason));
      }
      res.status(resReset.statusCode).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
  updateEmail: async (req, res, next) => {
    /*
      #swagger.tags = ['User']
    */

    let id = req.user.id;
    let userData = {
      email: req.body.email,
      otp_code: req.body.otp_code,
    };
    try {
      let resUpdate = await req.userUC.updateEmail(userData, id);
      if (resUpdate.isSuccess !== true) {
        return res
          .status(resUpdate.statusCode)
          .json(resData.failed(resUpdate.reason));
      }
      res.status(resUpdate.statusCode).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
