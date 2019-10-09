const router = require('express').Router()
const request = require('request')

module.exports = router

router.get('/', (req, res, next) => {
  const ticker = req.query.ticker
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=S8W944C1GY7T8XYU`

  request({url: URL}, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({type: 'error', message: error.message})
    }

    const data = JSON.parse(body)

    if (Object.keys(data)[0] === 'Error Message') {
      res.json({
        error: 'Oops something went wrong. Did you enter a valid ticker name?'
      })
    } else {
      res.json(data)
    }
  })
})
