class UserUC {
  constructor(
    UserRepository,
    OtpRepository,
    bcrypt,
    cloudinary,
  ) {
    this.UserRepository = UserRepository;
    this.OtpRepository = OtpRepository;
    this.bcrypt = bcrypt;
    this.cloudinary = cloudinary; 
  }

  async getUserExist(username, email) {
    return await this.UserRepository.getUserExist(username, email);
  }

  async getUserByID(id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };
    const user = await this.UserRepository.getUserByID(id);
    if (user === null) {
      result.reason = 'user not found';
      return result;
    }

    result.isSuccess = true;
    result.data = user;
    result.statusCode = 200;
    return result;
  }

  async updateUserProfile(userData, id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };
    let user = await this.UserRepository.getUserByID(id);
    if (user == null) {
      result.reason = 'user not found';
      return result;
    }
    
    let usernameExist = await this.UserRepository.getUserByUsername(userData.username)

    
    if(user.username === usernameExist.username){
      result.reason = 'please enter a new username'
      result.status = 400
      return result
    }
    if(usernameExist.username !== null){
      result.reason = 'username not aviable'
      result.status = 400
      return result
    }

    user = await this.UserRepository.updateUser(userData, id);
    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async updatePassword(user, id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };
    if (user.newPassword !== user.confirmNewPassword) {
      result.reason = 'password not match';
      result.statusCode = 400;
      return result;
    }
    let userById = await this.UserRepository.getUserByID(id);
    if (userById === null) {
      result.reason = 'user not found';
      return result;
    }

    user.password = user.newPassword;
    user.password = this.bcrypt.hashSync(user.password, 10);

    await this.UserRepository.updateUser(user, id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async updateEmail(userData, id) {
    let result = {
      isSuccess: false,
      reason: null,
      status: 400,
    };
    
    let user = await this.UserRepository.getUserByID(id);
    if (user === null) {
      result.reason = "user not found";
      result.status = 404;
      return result;
    }

    let otp = await this.OtpRepository.getOTP(
      userData.email,
      userData.otp_code,
      "UPDATEEMAIL"
    );
    if (otp === null) {
      result.reason = "invalid otp code";
      return result;
    }
    await this.UserRepository.updateUser(userData, id);
    await this.OtpRepository.deleteAllOtp(userData.email);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async resetPassword(userData, email) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 400,
    };
    if(email === undefined || email ===null){
      result.reason = "please insert email"
      return result
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      result.reason = "confrim new password not match";
      return result;
    }
    let user = await this.UserRepository.getUserByEmail(email);
    if (user === null) {
      result.reason = "user not found";
      result.statusCode = 400;
      return result;
    }
    let otp = await this.OtpRepository.getOTP(
      email,
      userData.otp_code,
      "RESETPASSWORD"
    );
    if (otp === null) {
      result.reason = "invalid otp code";
      return result;
    }
    userData.password = userData.newPassword;
    userData.password = this.bcrypt.hashSync(userData.password, 10);
    await this.UserRepository.updateUser(userData, user.id);
    await this.OtpRepository.deleteAllOtp(email);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async updateUserImage(userData, id) {
    let result = {
      isSuccess: false,
      reason: null,
      statusCode: 404,
      data: null,
    };

    let userBody = userData;

    let user = await this.UserRepository.getUserByID(id);

    if (user === null) {
      result.reason = 'user not found';
      return result;
    }

    userBody.image = await this.cloudinary.uploadCloudinaryAvatar(
      userBody.image,
    );

    await this.UserRepository.updateUser(userBody, id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = UserUC;
