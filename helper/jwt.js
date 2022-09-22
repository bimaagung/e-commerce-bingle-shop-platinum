const jwt = require('jsonwebtoken');

function generateAccessToken(data) {
  const userData = {
    id: data.id,
    name: data.name,
    username: data.username,
    email: data.email,
    is_admin: data.is_admin,
  };

  const accessToken = jwt.sign(
    userData,
    process.env.JWT_KEY_SECRET,
    {
      expiresIn: '6h',
    },
  );

  return accessToken;
}

module.exports = generateAccessToken;
