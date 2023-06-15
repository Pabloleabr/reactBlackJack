import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Rules from './templates/rules.jsx'
//import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <h1 className='text-4xl m-4 text-center'> Black Jack</h1>
    <Rules />
    <App />
  </>,
)
