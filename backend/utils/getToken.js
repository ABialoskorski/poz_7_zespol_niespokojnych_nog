const axios = require('axios')
const getToken = async (username, password) => {
  const url = 'https://allegro.pl/auth/oauth/token?grant_type=client_credentials'
  const response = await axios.get(url, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  })
  return response.data
}

module.exports = getToken
