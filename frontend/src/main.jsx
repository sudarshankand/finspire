import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

document.title = "Finspire"

document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
