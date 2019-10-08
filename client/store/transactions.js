const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

const defaultTransactions = []

const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})

export const transactions = id => dispatch => {
  fetch(`/api/users/${id}/transactions`)
    .then(res => res.json())
    .then(data => dispatch(getTransactions(data)))
    .catch(error => console.error(error))
}

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
