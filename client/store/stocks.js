// ACTION TYPES
export const GET_STOCKS = 'GET_STOCKS'
export const GET_CURRENT_PRICE = 'GET_CURRENT_PRICE'

// INITIAL STATE

const defaultStocks = {}

// ACTION CREATOR
const getStocks = stocks => ({type: GET_STOCKS, stocks})
const getCurrentPrice = stock => ({type: GET_CURRENT_PRICE, stock})

// THUNK CREATOR
export const stock = (ticker, quantity, id) => dispatch => {
  fetch(`/api/stocks?ticker=${ticker}`)
    .then(res => res.json())
    .then(data => dispatch(getStocks(data)))
    .catch(error => console.log(error))

  fetch(`/api/users/${id}/${ticker}/${quantity}`)
    .then(res => res.json())
    .then(data => console.log('Data added to Portfolio', data))
    .catch(error => console.log(error))
}

export const currentPrice = ticker => dispatch => {
  fetch(`/api/stocks/${ticker}/price`)
    .then(res => res.json())
    .then(data => dispatch(getCurrentPrice(data)))
    .catch(error => console.log(error))
}

// REDUCER
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GET_CURRENT_PRICE:
      return {
        [action.stock['Meta Data']['2. Symbol']]:
          action.stock['Time Series (5min)'][
            Object.keys(action.stock['Time Series (5min)'])[0]
          ]['4. close']
      }
    case GET_STOCKS:
      return {
        symbol: action.stocks['Meta Data']['2. Symbol'],
        open:
          action.stocks['Time Series (5min)'][
            Object.keys(action.stocks['Time Series (5min)'])[0]
          ]['4. close'],
        close:
          action.stocks['Time Series (5min)'][
            Object.keys(action.stocks['Time Series (5min)'])[0]
          ]['4. close']
      }
    default:
      return state
  }
}
