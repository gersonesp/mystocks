// ACTION TYPES
export const GET_STOCKS = 'GET_STOCKS'

// INITIAL STATE

const defaultStocks = {}

// ACTION CREATOR
const getStocks = stocks => ({type: GET_STOCKS, stocks})

// THUNK CREATOR
export const stock = (ticker, quantity, id) => dispatch => {
  fetch(`/api/stocks?ticker=${ticker}`)
    .then(res => res.json())
    .then(data => dispatch(getStocks(data)))

  fetch(`/api/users/${id}/${ticker}/${quantity}`)
    .then(res => res.json())
    .then(data => console.log('Data added to Portfolio', data))
}

// REDUCER
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GET_STOCKS:
      return {
        symbol: action.stocks['Meta Data']['2. Symbol'],
        price:
          action.stocks['Time Series (5min)'][
            Object.keys(action.stocks['Time Series (5min)'])[0]
          ]['4. close']
      }
    default:
      return state
  }
}
