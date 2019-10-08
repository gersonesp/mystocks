const GET_PORTFOLIO = 'GET_PORTFOLIO'

const defaultPortfolio = {}

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

export const portfolio = id => dispatch => {
  fetch(`/api/users/${id}/portfolio`)
    .then(res => res.json())
    .then(data => dispatch(getPortfolio(data)))
    .catch(error => console.error(error))
}

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio
    default:
      return state
  }
}
