const mockChatRepo = (
    {
        returnDeleteAllOtp,
        returnGenerateOtp,
        returnGetOtp,
        returnGetOtpByEmail,

    }
) => {
  const repo = {};

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
  repo.getOtp = jest.fn().mockReturnValue(
    returnGetOtp !== true ?  returnGetOtp : true
  )
  repo.returnGetOtpByEmail = jest.fn().mockReturnValue(
    returnGetOtpByEmail !== true ?  returnGetOtpByEmail : true
  )
};

module.exports = mockChatRepo;

