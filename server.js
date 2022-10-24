require('dotenv').config()
const app = require('./app')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
