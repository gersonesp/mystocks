const router = require('express').Router()
const request = require('request')
const {User, Stock, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'balance']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// route for storing user's stocks
router.get('/:id/:ticker/:quantity', (req, res, next) => {
  let {id, ticker, quantity} = req.params

  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=S8W944C1GY7T8XYU`

  request({url: URL}, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({type: 'error', message: error.message})
    }

    const data = JSON.parse(body)

    const price =
      data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]][
        '4. close'
      ]

    // Make a api call to confirm ticker is valid, if not valid send error message
    if (Object.keys(data)[0] === 'Error Message') {
      res.json({
        error: 'Oops something went wrong. Did you enter a valid ticker name?'
      })

      //if the ticker is valid find or create the data in Stock model
    } else {
      User.findByPk(id).then(user => {
        if (user.balance - price * quantity > 0) {
          Stock.findOrCreate({
            where: {
              ticker,
              userId: id
            },
            defaults: {ticker, quantity: 0}
          })
            .then(([stock, created]) => {
              return stock.increment('quantity', {by: quantity})
            })
            .then(stock => {
              res.json(stock)
            })
        } else {
          res.json({error: 'Oops not enough cash!'})
        }
      })
    }
  })
})

// route for getting users personal portfolio
router.get('/:id/portfolio', (req, res, next) => {
  let {id} = req.params
  Stock.findAll({
    where: {
      userId: id
    }
  }).then(portfolio => {
    res.json(portfolio)
  })
})

// route for creating user transaction history
router.get('/:id/:ticker/:quantity/addTransaction', (req, res, next) => {
  let {id, ticker, quantity} = req.params
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
      const price =
        data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]][
          '4. close'
        ]
      User.findByPk(id).then(user => {
        if (user.balance - price * quantity > 0) {
          // add data to Transaction model
          Transaction.create({
            userId: id,
            ticker,
            quantity,
            price: price
          }).then(stock => {
            res.json(stock)
          })

          user.decrement('balance', {by: price * quantity})
        } else {
          res.json({error: 'Oops not enough cash!'})
        }
      })

      res.json(price)
    }
  })
})

// route for getting users history of all transactions
router.get('/:id/transactions', (req, res, next) => {
  let {id} = req.params
  Transaction.findAll({
    where: {
      userId: id
    }
  }).then(transactions => {
    res.json(transactions)
  })
})
