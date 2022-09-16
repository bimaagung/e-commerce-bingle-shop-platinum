const jwt = require('jsonwebtoken')
function generate_access_token(data) {
    let userData = {
        id: data.id,
        name: data.name,
        email: data.email
    }
    const accessToken = jwt.sign(
        
      userData, process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )

    return accessToken
}

module.exports = generate_access_token