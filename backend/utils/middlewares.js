const getToken = require('./getToken')
let token = null
const ensureToken = async(req, res, next) => {
  if (!token) {
    token = await getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
  }
  req.token = token
  next()
}

module.exports = {
  ensureToken
}
