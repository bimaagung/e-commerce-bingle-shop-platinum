class Otp {
    constructor(otpRepository, emailRepository, email_message) {
        this.otpRepository = otpRepository
        this.emailRepository = emailRepository
        this.email_message = email_message
    }
    async generateOTP(email, otp_type) {
        let result = {
            isSuccess: false,
            status: 400,
            reason: '',
            data: null,
        };
        let otp = await this.getOTPByEmail(email);
        if (otp !== null) {
            result.reason = "wait until : " + otp.expired_at
            return result
        }

        let content = this.email_message[otp_type.toUpperCase()]
        if (typeof content === undefined) {
           
            return result
        }

        otp = await this.otpRepository.generateOTP(email, otp_type)
        let text = content.text_value.replace('{otp}', otp.otp_code)
        let html = content.html_value.replace('{otp}', otp.otp_code)
        await this.emailRepository.sendEmail('OTP Code', email, text, html)

        result.isSuccess = true
        result.status = 200,
        result.reason = "check your email"
        return result
    }
    async verifyOTP(email, otp_code, otp_type) {
        let result = {
            is_success: false,
            status: 400,
            reason: '',
            data: null
        }
    
     let otp = await this.otpRepository.getOTP(email, otp_code, otp_type)
     if(otp === null){
        result.reason = "invalid otp"
        return result
     }
     result.is_success = true
     result.status = 200
     result.reason = "otp valid"
     return result
    }
    async getOTPByEmail(email) {
        return await this.otpRepository.getOTPByEmail(email)
    }
    async deleteAllOtp(email) {
        await this.otpRepository.deleteAllOtp(email)
    }
}
module.exports = Otp