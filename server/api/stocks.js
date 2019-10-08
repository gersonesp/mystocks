const router = require('express').Router()
const request = require('request')

module.exports = router

router.get('/', (req, res, next) => {
  const ticker = req.query.ticker
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=F6A5SHKGFHR00T5Q`

  request({url: URL}, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({type: 'error', message: error.message})
    }

    res.json(JSON.parse(body))
  })
})

router.get('/:ticker/price', (req, res, next) => {
  const {ticker} = req.params
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=F6A5SHKGFHR00T5Q`

  request({url: URL}, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({type: 'error', message: error.message})
    }

    res.json(JSON.parse(body))
  })
})
