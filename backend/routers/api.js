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

router.get('/rekurencja', ensureToken, async (req, res) => {
  try {
    const sum = []
    const queue = ['2']
    while (queue.length) {
      const url = 'https://api.allegro.pl/sale/categories'
      const { data } = await axios.get(url, {
        params: {
          'parent.id': queue.shift()
        },
        headers: {
          Authorization: 'Bearer ' + req.token.access_token,
          Accept: 'application/vnd.allegro.public.v1+json'
        }
      })
      Array.prototype.push.apply(sum, (data.categories.map(c => {
        return {
          id: c.id,
          name: c.name
        }
      })))
      Array.prototype.push.apply(queue, (data.categories.map(c => c.id)))
    }
    return res.json(sum)
  } catch (error) {
    console.error('Request error', error.message)
    return res.json(error.message)
  }
})

router.get('/categories', ensureToken, async (req, res) => {
  try {
    const url = 'https://api.allegro.pl/sale/categories'
    const { data: data1 } = await axios.get(url, {
      params: {
        'parent.id': '4226'
      },
      headers: {
        Authorization: 'Bearer ' + req.token.access_token,
        Accept: 'application/vnd.allegro.public.v1+json'
      }
    })
    const { data: data2 } = await axios.get(url, {
      params: {
        'parent.id': '4475'
      },
      headers: {
        Authorization: 'Bearer ' + req.token.access_token,
        Accept: 'application/vnd.allegro.public.v1+json'
      }
    })
    const data = data1.categories.concat(data2.categories).filter(e => {
      return !['pozostałe', 'serwisowy', 'przenośne', 'kieszenie', 'uszkodzone'].some(r => {
        return e.name.toLowerCase().includes(r)
      })
    })
    return res.json(data.map(c => {
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
