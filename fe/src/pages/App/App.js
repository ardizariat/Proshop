import { Router } from '../../config'
import React from 'react'
import store from '../../redux/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
