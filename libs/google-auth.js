require("dotenv").config();

const {OAuth2Client} = require('google-auth-library')

async function verify(token){
    const clientId = process.env.CLIENT_ID
    const clinet = new OAuth2Client(clientId) 

    let ticket = await clinet.verifyIdToken({
        idToken : token,
        audience : clientId
    })
    return ticket.getPayload()
}

module.exports = verify