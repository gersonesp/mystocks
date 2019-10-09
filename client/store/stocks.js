// ACTION TYPES
export const GET_STOCKS = 'GET_STOCKS'
export const GET_CURRENT_PRICE = 'GET_CURRENT_PRICE'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'

// INITIAL STATE

const defaultStocks = {}

// ACTION CREATOR
const getStocks = stocks => ({type: GET_STOCKS, stocks})
const gotError = errorMessage => ({type: ERROR, errorMessage})
const gotSuccess = successMessage => ({type: SUCCESS, successMessage})

// THUNK CREATOR
export const stock = (ticker, quantity, id) => dispatch => {
  // make call to alpha advantage api and retreive stock data
  fetch(`/api/stocks?ticker=${ticker}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(gotError(data.error))
      } else {
        dispatch(getStocks(data))
      }
    })
    .catch(error => console.log(error))

  // add portfolio data to db
  fetch(`/api/users/${id}/${ticker}/${quantity}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(gotError(data.error))
      } else {
        dispatch(gotSuccess('Stocks add to your Portfolio!'))
      }
    })
    .catch(error => console.log(error))

  //add transactions to db
  fetch(`/api/users/${id}/${ticker}/${quantity}/addTransaction`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(gotError(data.error))
      } else {
        dispatch(gotSuccess('Stocks add to your Portfolio!'))
      }
    })
    .catch(error => console.log(error))
}

// REDUCER
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        success: action.successMessage
      }
    case ERROR:
      return {
        error: action.errorMessage
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
