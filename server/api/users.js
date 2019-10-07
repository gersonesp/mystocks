const router = require('express').Router()
const {User} = require('../db/models')
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

router.get('/:id/:ticker/:quantity', async (req, res, next) => {
  let {id, ticker, quantity} = req.params
  const user = await User.findByPk(id)
  user.update({
    stocks: {[ticker]: quantity}
  })

  const field = Object.keys(user.stocks)[0]

  user
    .save({fields: [user.stocks[field]]})
    .then(data => console.log(data.stocks))
})
