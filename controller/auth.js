const resData = require('../helper/response');
const defaultImage = require('../internal/constant/defaultImage');

module.exports = {
  login: async (req, res, next) => {
    /*
      #swagger.tags = ['Auth']
    */
    try {
      let { username, password } = req.body;
      let resUser = await req.authUC.login(username, password);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      res.status(200).json(resData.success({
        user: resUser.data,
        token: resUser.token,
      }));
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {
    /*
      #swagger.tags = ['Auth']
      
      #swagger.consumes = ['multipart/form-data']
      #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            username: {
                                type: "string"
                            },
                            image: {
                                type: "string",
                                format: "binary"
                            },
                            telp: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            },
                            confirmPassword: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            },
                            otp_code: {
                                type: "string"
                            },

                        },
                        required: ["product_id", "url"]
                    }
                }
            }
        }


      #swagger.responses[200] = {
        description: "Berhasil mengubah alamat",
          content: {
              "application/json": {
                  schema:{
                      $ref: "#/definitions/successRegister"
                  }
              }
          }
      }

       #swagger.responses[400] = {
          content: {
              "application/json": {
                examples: {
                  have_order_pending: {
                    value:{
                      "status": "failed",
                      "message": "username or email not aviable"
                    },
                    summary: "username atau email tidak tersedia"
                  },
                  product_order_empty: {
                    value:{
                      "status": "failed",
                      "message": "password and confrim password not match"
                    },
                    summary: "Password and Confirm Password tidak sesuai"
                  }
                },
                schema:{
                  oneOf: [
                    {
                        $ref: "#/definitions/notAvailable"
                    },
                    {
                        $ref: "#/definitions/passwordNotMatch"
                    }
                  ]
                },
              }
          }
      }
    */
    try {
      let userData = {
        name: req.body.name,
        username: req.body.username,
        image: null,
        telp: req.body.telp,
        email: req.body.email,
        password: req.body.password,
        confrimPassword: req.body.confrimPassword,
        is_admin: false,
        otp_code : req.body.otp_code
      };

      let image = null;
      if (req.file !== undefined) {
        image = (req.file.path);
      } else {
        image = defaultImage.DEFAULT_AVATAR;
      }
      userData.image = image;
      let resUser = await req.authUC.register(userData);
      if (resUser.isSuccess !== true) {
        return res
          .status(resUser.status)
          .json(resData.failed(resUser.reason));
      }
      res.status(200).json(resData.success({
        user: resUser.data,
        token: resUser.token,
      }));
    } catch (e) {
      next(e);
    }
  },
};
