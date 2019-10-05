const router = require('express').Router()
const axios = require('axios')

module.exports = router

router.get('/', async (req, res, next) => {
  const ticker = req.query.ticker
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=F6A5SHKGFHR00T5Q`

  await axios
    .get(URL)
    .then(response => res.send(response))
    .catch(error => console.error(error))
})
