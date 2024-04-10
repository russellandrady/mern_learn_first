import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './redux/store.js'//we are importing the store from redux to provide it all over the app. 
import {Provider} from 'react-redux'//we are importing the provider from react-redux to provide the store to all the components.

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
