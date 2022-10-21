const ejs = require("ejs");
const email_message = {
  REGISTRATION: {
    text_value: "your otp code for registration: {otp}",
    html_value: "<b>your otp code for registration: {otp} </b>",
  },
  UPDATEEMAIL: {
    text_value: "your otp code for update email: {otp}",
    html_value: "<b>your otp code for update email: {otp}</b>",
  },
  RESETPASSWORD: {
    text_value: "your otp code for reset password: {otp}",
    html_value: "<b>your otp code for reset password: {otp}</b>",
  },
  ORDERCOMPLETED: {
    text_value: "qty {qty} total_price {total_price}",
    html_value:
      // ejs.renderFile(__dirname + '/../../views/order_email.ejs')

      `<body style="font-family: sans-serif;">
        <center>
        <div style="background-color: aliceblue ; width: 500px;">
            <div style="background-color: Magenta; padding: 5px">
                <h1 style="color: white"><center>Hai.. {customerName} Trimakasih Telah Belanja di BingleShop<br><span style="font-size: 16px; font-weight: 400; margin-top: 5px">Maju Jaya Sentosa Luar Biasa</span></center></h1>
            </div>
            <div style="color: black; padding-bottom: 10px">
            <center><p>Pesanan {customerName} sebesar Rp {total_price} akan segera diKirim ke : </center>
            <div>alamat : {address} </div>
            <div>Order Date : {completed_date}</div>
            
            </div>
            </div>
        </center>
        </body>`,
  },
};
module.exports = email_message;
