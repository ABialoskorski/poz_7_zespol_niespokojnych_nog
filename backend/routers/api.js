const { ensureToken } = require('../utils/middlewares')
const axios = require('axios')
const { getLink, processItem } = require('../utils/processItem')
const router = require('express').Router()

router.get('/', ensureToken, async (req, res) => {
  res.json(req.token)
})

router.get('/search', ensureToken, async (req, res) => {
  try {
    const url = 'https://api.allegro.pl/offers/listing'
    const { data } = await axios.get(url, {
      params: {
        phrase: req.query.phrase,
        offset: req.query.offset,
        limit: req.query.limit,
        'category.id': req.query.category
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

router.get('/categories', ensureToken, async (req, res) => {
  try {
    const url = 'https://api.allegro.pl/sale/categories'
    const { data } = await axios.get(url, {
      params: {
        'parent.id': '4226'
      },
      headers: {
        Authorization: 'Bearer ' + req.token.access_token,
        Accept: 'application/vnd.allegro.public.v1+json'
      }
    })
    return res.json(data.categories.map(c => {
      return {
        id: c.id,
        name: c.name
      }
    }))
  } catch (error) { 
    console.error('Request error', error.message)
    return res.json(error.message)
  }
})

module.exports = router
