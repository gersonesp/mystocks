import React from 'react'
import {reduxForm, Field} from 'redux-form'

const TickerForm = ({handleChange, handleSubmit, value}) => (
  <form onSubmit={handleSubmit} className="tickerForm">
    <div>
      <label htmlFor="ticker">
        <p>Enter ticker symbol</p>
      </label>
      <Field
        component="input"
        name="ticker"
        type="text"
        value={value}
        onChange={handleChange}
        style={{textTransform: 'uppercase'}}
      />

      <label htmlFor="quantity">
        <p>Quantity</p>
      </label>
      <Field
        component="input"
        name="quantity"
        type="number"
        min="1"
        value={value}
        onChange={handleChange}
        style={{textTransform: 'uppercase'}}
      />

      <button type="submit">Buy</button>
    </div>
  </form>
)

export default reduxForm({form: 'TickerForm', fields: ['ticker']})(TickerForm)
