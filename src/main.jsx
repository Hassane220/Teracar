// CORRECT : main.jsx sans Router
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* PAS de Router ici ! */}
  </React.StrictMode>,
)