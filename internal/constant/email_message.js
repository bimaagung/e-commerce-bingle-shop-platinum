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
    html_value: `<body style="font-family: sans-serif;">
        <center>
        <div style="background-color: black; width: 500px;">
            <div style="background-color: darkorange; padding: 5px">
                <h1><center>Trimakasih Telah Belanja di toko Kami (Maju Jaya)<br><span style="font-size: 16px; font-weight: 400; margin-top: 5px">Maju Jaya Sentosa Luar Biasa</span></center></h1>
            </div>
            <div style="color: aliceblue; padding-bottom: 10px">
            <center><p>Detail Pesanan {customerName} </center>
            
            <div>name : {customerName} </div>
            <div>username : {username}</div>
            <div>Product : {productName}</div>
            <div>Price : {productPrice}</div>
            <div>qty : {qty}</div>
            <div>total : {total_price}</div>
            <div>Order Date : {completed_date}</div>
            
            </div>
            </div>
        </center>
        </body>`,
  },
};
module.exports = email_message;
