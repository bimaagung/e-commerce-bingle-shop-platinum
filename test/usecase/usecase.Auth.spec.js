const AuthUseCase = require("../../usecase/auth");
const mockAuthRepo = require("../mock/repository.auth.mock");
const mockUserRepo = require("../mock/repository.user.mock");
const mockOtpRepo = require("../mock/repository.otp.mock")

let authValues,
  userValues, otpValues = {};
let authUC = null;

const bcrypt = {
  hashSync: jest
    .fn()
    .mockReturnValue("sdjsdkjnfjfw&*23672(%^SHGHGSjhsjkh87623"),
  compareSync: jest.fn().mockReturnValue(true),
};
const cloudinary = {
  uploadCloudinaryAvatar: jest
    .fn()
    .mockReturnValue("https://cloudinary.com/avatars/image.jpg"),
};
const _ = {
  omit : jest.fn().mockReturnValue()
}

describe("auth", () => {
  beforeEach(() => {
    authValues = {
      returnRegisterUser: true,
      returnLoginUser: true,
    };
    userValues = {
      returnGetUserExist: true,
    };
    otpValues = {
      returnDeleteAllOtp :true,
      returnGenerateOtp : true,
      returnGetOtp :true,
      returnGetOtpByEmail :true
    }
    authUC = new AuthUseCase(
      mockAuthRepo(authValues),
      mockUserRepo(userValues),
      mockOtpRepo(otpValues),
      bcrypt,
      cloudinary, _
    );
  });
  describe("Test Register", () => {
    test("should return true", async () => {
      userValues.returnGetUserExist = null;
otpValues.returnGetOtp = {
   email : "customer@mail",
        otp_code : "123456",
        otp_type : "REGISTRATION",
        expired_at : "12-09-2022 23:30:00"
}
      authUC = new AuthUseCase(
        mockAuthRepo(authValues),
        mockUserRepo(userValues),
        mockOtpRepo(otpValues),
        bcrypt,
        cloudinary,_
      );
      let res = await authUC.register({
        name: "kian",
        username: "kian28",
        image:
          "http://res.cloudinary.com/dnvltueqb/image/upload/v1665839687/avatar/1665839685354_test_trwixd.jpg",
        telp: "0823155511",
        email: "kian@gmail.com",
        is_admin: false,
      });

      expect(res.isSuccess).toBeTruthy();
    });

    test("should return fasle User already user", async () => {
      let res = await authUC.register({
        name: "kian",
        username: "kian28",
        image:
          "http://res.cloudinary.com/dnvltueqb/image/upload/v1665839687/avatar/1665839685354_test_trwixd.jpg",
        telp: "0823155511",
        email: "kian@gmail.com",
        is_admin: false,
      });

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual("username or email not aviable");
    });
    test("should return fasle confirm Password not match", async () => {
      authValues.returnRegisterUser = null;
      authUC = authUC = new AuthUseCase(
        mockAuthRepo(authValues),
        mockUserRepo(userValues),
        bcrypt,
        cloudinary
      );
      let res = await authUC.register({
        password: "12345678",
        confrimPassword: "123456789",
      });

      expect(res.isSuccess).toBeFalsy();
      expect(res.reason).toEqual("password and confrim password not match");
      expect(res.data).toBeNull();
    });

    describe("Test Login", () => {
      test("should return true success login", async () => {
        let res = await authUC.login({
          username: "kian28",
          password: "password",
        });

        expect(res.isSuccess).toBeTruthy();
        expect(typeof res.data === "object").toBeTruthy();
      });
      test("should return false failed login", async () => {
        bcrypt.compareSync = jest.fn().mockReturnValue(false);
        authUC = authUC = new AuthUseCase(
          mockAuthRepo(authValues),
          mockUserRepo(userValues),
          bcrypt,
          cloudinary
        );
        let res = await authUC.login({
          username: "kian28",
          password: "password",
        });

        expect(res.isSuccess).toBeFalsy();
        expect(res.reason).toEqual("incorect username or password");
      });
    });
  });
});
