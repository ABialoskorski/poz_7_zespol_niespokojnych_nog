const { ensureToken } = require('../utils/middlewares')
const axios = require('axios')
const { getLink, processItem } = require('../utils/processItem')
const router = require('express').Router()

router.get('/', ensureToken, async (req, res) => {
  res.json(req.token.access_token)
})

router.get('/search', ensureToken, async (req, res) => {
  try {
    const url = 'https://api.allegro.pl/offers/listing'
    const { data } = await axios.get(url, {
      params: {
        phrase: req.query.phrase,
        offset: 1000,
        limit: 100,
      },
      headers: {
        Authorization: 'Bearer ' + req.token.access_token,
        Accept: 'application/vnd.allegro.public.v1+json'
      }
    })
    const promoted = data.items.promoted.map(processItem)
    const regular = data.items.regular.map(processItem)
    return res.json(promoted.concat(regular))
  } catch (error) { 
    console.error('Request error', error.message)
    return res.json(error.message)
  }
})

module.exports = router
