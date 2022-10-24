const mockOTPRepo = (
    {
        returnDeleteAllOtp,
        returnGenerateOtp,
        returnGetOtp,
        returnGetOtpByEmail,

    }
) => {
  const repo = {};
  const user = {
    email : "customer@mail",
        otp_code : "123456",
        otp_type : "REGISTRATION",
        expired_at : "12-09-2022 23:30:00"
  }

  repo.deleteAllOtp = jest.fn().mockReturnValue(
    returnDeleteAllOtp !== true ?  returnDeleteAllOtp : true
  )
  
  repo.generateOtp = jest.fn().mockReturnValue(
    returnGenerateOtp !== true ?  returnGenerateOtp : {
        email : "customer@mail",
        otp_code : "123456",
        otp_type : "REGISTRATION",
        expired_at : "12-09-2022 23:30:00"
    }
  )
  repo.getOTP = jest.fn().mockReturnValue(
    returnGetOtp !== true ?  returnGetOtp : {
        email : "customer@mail",
        otp_code : "123456",
        otp_type : "REGISTRATION",
        expired_at : "12-09-2022 23:30:00"
    }
  )
  repo.returnGetOtpByEmail = jest.fn().mockReturnValue(
    returnGetOtpByEmail !== true ?  returnGetOtpByEmail : true
  )

  return repo
};

module.exports = mockOTPRepo;

