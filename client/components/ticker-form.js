import React from 'react'
import {reduxForm, Field} from 'redux-form'

const TickerForm = ({handleChange, handleSubmit, value}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="ticker">
        <small>Enter ticker symbol</small>
      </label>
      <Field
        component="input"
        name="ticker"
        type="text"
        value={value}
        onChange={handleChange}
      />

      <label htmlFor="quantity">
        <small>Qty:</small>
      </label>
      <Field
        component="input"
        name="quantity"
        type="number"
        min="1"
        value={value}
        onChange={handleChange}
      />

      <button type="submit">Buy</button>
    </div>
  </form>
)

export default reduxForm({form: 'TickerForm', fields: ['ticker']})(TickerForm)
