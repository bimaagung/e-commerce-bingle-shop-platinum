class Email {
    constructor(emailRepository, email_message) {
        this.emailRepository = emailRepository
        this.email_message = email_message
    }
    async sendMailOrder(email, otp_type) {
        let result = {
            isSuccess: false,
            status: 400,
            reason: '',
            data: null,
        };
        // let otp = await this.getOTPByEmail(email);
        // if (otp !== null) {
        //     result.reason = "wait until : " + otp.expired_at
        //     return result
        // }

        let content = this.email_message.ORDERCOMPLETED
        otp = await this.otpRepository.generateOTP(email, otp_type)
        let text = content.text_value.replace('{otp}', otp.otp_code)
        let html = content.html_value.replace('{otp}', otp.otp_code)
        await this.emailRepository.sendEmail('OTP Code', email, text, html)

        result.isSuccess = true
        result.status = 200,
        result.reason = "check your email"
        return result
    }
    async getOTPByEmail(email) {
        return await this.otpRepository.getOTPByEmail(email)
    }
    async deleteAllOtp(email) {
        await this.otpRepository.deleteAllOtp(email)
    }
}
module.exports = Email