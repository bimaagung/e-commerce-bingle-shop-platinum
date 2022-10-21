const nodemailer_transport = require("../libs/nodemailer");
const email_message = require("../internal/constant/email_message");
class EmailRepository {
  constructor() {}
  async sendEmail(subject, recipient, text, html) {
    await nodemailer_transport.sendMail({
      from: `"${process.env.MAILER_SENDER_NAME}" <${process.env.MAILER_SENDER_EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
  }
  async sendOrderEmail(email, data) {
    let content = email_message.ORDERCOMPLETED;
    let text = content.text_value
      .replaceAll("{customerName}", data.customerName)
      .replaceAll("{username}", data.username)
      .replaceAll("{productName}", data.productName)
      .replaceAll("{productPrice}", data.productPrice)
      .replaceAll("{qty}", data.qty)
      .replaceAll("{total_price}", data.total_price)
      .replaceAll("{completed_date}", data.completed_date);

    let html = content.html_value
      .replaceAll("{customerName}", data.customerName)
      .replaceAll("{username}", data.username)
      .replaceAll("{productName}", data.productName)
      .replaceAll("{productPrice}", data.productPrice)
      .replaceAll("{qty}", data.qty)
      .replaceAll("{total_price}", data.total_price)
      .replaceAll("{completed_date}", data.completed_date);

    await this.sendEmail("order", email, text, html);
  }
}
module.exports = EmailRepository;
