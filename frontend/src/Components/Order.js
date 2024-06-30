import React from 'react'
import NavigationButtons from './NavigationButtons'
import OrderPromptForm from '../inputForm/OrderPromptForm'

const Order = () => {
  return (
    <div>
      <center>
        <NavigationButtons/>
      <div>
        <OrderPromptForm/>
      </div>
      </center>
    </div>
  )
}

export default Order
