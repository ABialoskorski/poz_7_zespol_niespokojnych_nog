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
 const mockCategories = [
   {
     "id": "260019",
     "name": "Karty graficzne",
     "required": true
   },
   {
     "id": "259437",
     "name": "Zasilacze",
     "required": true
   },
   {
     "id": "257226",
     "name": "Pamięć RAM",
     "required": true
   },
   {
     "id": "4228",
     "name": "Płyty główne",
     "required": true
   },
   {
     "id": "257222",
     "name": "Procesory",
     "required": true
   },
   {
     "id": "4475",
     "name": "Dyski i pamięci przenośne",
     "required": true
   },
   {
     "id": "258226",
     "name": "Systemy operacyjne",
     "required": false
   },
   {
     "id": "259436",
     "name": "Obudowy",
     "required": true
   },
   {
     "id": "260015",
     "name": "Chłodzenie i tuning",
     "required": true
   },
   {
     "id": "257260",
     "name": "Napędy optyczne i nośniki",
     "required": false
   },
   {
     "id": "260017",
     "name": "Monitory komputerowe",
     "required": false
   },
   {
     "id": "259422",
     "name": "Mikrofony i słuchawki",
     "required": false
   },
   {
     "id": "4551",
     "name": "Listwy zasilające i UPS",
     "required": false
   },
   {
     "id": "260735",
     "name": "Karty sieciowe",
     "required": false
   }
 ]
  res.json(mockCategories)
})

module.exports = router
