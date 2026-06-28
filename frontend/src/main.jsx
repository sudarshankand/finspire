import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App.jsx'

document.title = "Finspire"

document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)