const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
})

module.exports = Transaction
