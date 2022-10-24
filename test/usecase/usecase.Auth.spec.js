const AuthUseCase = require("../../usecase/auth");
const mockAuthRepo = require("../mock/repository.auth.mock");
const mockUserRepo = require("../mock/repository.user.mock");
const mockOtpRepo = require("../mock/repository.otp.mock");
const defaultImage = require("../../internal/constant/defaultImage");
const func = require('../../libs/function');
const _ = require('lodash');
// const generateToken = require('../../helper/jwt');

let authValues,
  userValues, otpValues = {};
let authUC = null;


const bcrypt = {
  hashSync: jest
    .fn()
    .mockReturnValue("sdjsdkjnfjfw&*23672(%^SHGHGSjhsjkh87623"),
  compareSync: jest.fn().mockReturnValue(true),
};

const googleOauth = jest.fn().mockReturnValue({
        name: "kian",
        email: "kian@gmail.com",
})

const cloudinary = {
  uploadCloudinaryAvatar: jest
    .fn()
    .mockReturnValue("https://cloudinary.com/avatars/image.jpg"),
};


const generateToken = jest.fn().mockReturnValue(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MiwibmFtZSI6ImN1c3RvbWVyIiwidXNlcm5hbWUiOiJjdXN0b21lciIsImVtYWlsIjoiY3VzdG9tZX
    JuQG1haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY1Njk0ODgsImV4cCI6MTY2NjU5MTA4OH0.
    vtMW_4uev15R141j_MNIru9nbi1uLGu1swNtfm5-19M`)


describe("auth", () => {
  beforeEach(() => {
    authValues = {
      returnRegisterUser: true,
      returnLoginUser: true,
      returnLoginWithGoogle: true,

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
      cloudinary, 
      generateToken,
      _,
      googleOauth,
      func,
      defaultImage,
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
        cloudinary, 
        generateToken,
        _,
        googleOauth,
        func,
        defaultImage,
      );

      let res = await authUC.register({
        name: "kian",
        username: "kian28",
        image:
          "http://res.cloudinary.com/dnvltueqb/image/upload/v1665839687/avatar/1665839685354_test_trwixd.jpg",
        telp: "0823155511",
        email: "kian@gmail.com",
        is_admin: false,
        password: "12345678",
        confrimPassword: "12345678"
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
      authUC = new AuthUseCase(
        mockAuthRepo(authValues),
        mockUserRepo(userValues),
        mockOtpRepo(otpValues),
        bcrypt,
        cloudinary, 
        generateToken,
        _,
        googleOauth,
        func,
        defaultImage,
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
        authValues.returnLoginUser = {
          dataValues: {
            name: "test",
            image: "url_image",
            username: "testusername",
            email: "test@email.com",
          }
        }
        let res = await authUC.login({
          username: "kian28",
          password: "password",
        });

        expect(res.isSuccess).toBeTruthy();
        expect(typeof res.data === 'object').toBeTruthy();
      });

      test("should return false failed login", async () => {
        bcrypt.compareSync = jest.fn().mockReturnValue(false);
          authUC = new AuthUseCase(
          mockAuthRepo(authValues),
          mockUserRepo(userValues),
          mockOtpRepo(otpValues),
          bcrypt,
          cloudinary, 
          generateToken,
          _,
          googleOauth,
          func,
          defaultImage,
        );
        let res = await authUC.login({
          username: "kian28",
          password: "password",
        });

        expect(res.isSuccess).toBeFalsy();
        expect(res.reason).toEqual("incorect email or password");
      });
    });

     describe("Test Login Google", () => {
      const idToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
          eyJpZCI6MiwibmFtZSI6ImN1c3RvbWVyIiwidXNlcm5hbWUiOiJjdXN0b21lciIsImVtYWlsIjoiY3VzdG9tZX
          JuQG1haWwuY29tIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY1Njk0ODgsImV4cCI6MTY2NjU5MTA4OH0.
          vtMW_4uev15R141j_MNIru9nbi1uLGu1swNtfm5-19M
          `
      test("should return true success login", async () => {

        let res = await authUC.loginGoogle(idToken);

        expect(res.isSuccess).toBeTruthy();
        expect(typeof res.data === 'object').toBeTruthy();
      });

      test("should return true success login with login google is null", async () => {
        authValues.returnLoginWithGoogle = null

        authUC = new AuthUseCase(
          mockAuthRepo(authValues),
          mockUserRepo(userValues),
          mockOtpRepo(otpValues),
          bcrypt,
          cloudinary, 
          generateToken,
          _,
          googleOauth,
          func,
          defaultImage,
        );

        let res = await authUC.loginGoogle(idToken);

        expect(res.isSuccess).toBeTruthy();
        expect(typeof res.data === 'object').toBeTruthy();
      });

    
    });

  });
});
