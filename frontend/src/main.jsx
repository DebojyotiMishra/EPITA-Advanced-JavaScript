import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import './index.css'
import './fonts.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          theme="dark"
          style={{ top: '80px' }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
) 