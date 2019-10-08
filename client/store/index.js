import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {reducer as formReducer} from 'redux-form'
import user from './user'
import stocks from './stocks'
import portfolio from './portfolio'
import transactions from './transactions'
// import GET_STOCKS for redux-form, needs to be seperated from stocks import to avoid redux error
import {GET_STOCKS} from './stocks'

const reducers = {
  user,
  stocks,
  portfolio,
  transactions,
  form: formReducer.plugin({
    TickerForm: (state, action) => {
      switch (action.type) {
        case GET_STOCKS:
          return undefined // <--- Clear form data
        default:
          return state
      }
    }
  })
}

const reducer = combineReducers(reducers)
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './stocks'
export * from './portfolio'
export * from './transactions'
