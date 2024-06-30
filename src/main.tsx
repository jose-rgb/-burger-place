import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { CartProvider } from './contexts/CartContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <ToastContainer autoClose={1500} position="top-center"/>
    </CartProvider>
  </React.StrictMode>,
)
