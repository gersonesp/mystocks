const router = require('express').Router()
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

// route for storing users owned stocks
router.get('/:id/:ticker/:quantity', (req, res, next) => {
  let {id, ticker, quantity} = req.params
  Stock.findOrCreate({
    where: {
      ticker,
      userId: id
    },
    defaults: {ticker, quantity}
  })
    .then(([stock, created]) => {
      return stock.increment('quantity', {by: quantity})
    })
    .then(stock => {
      res.json(stock)
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
