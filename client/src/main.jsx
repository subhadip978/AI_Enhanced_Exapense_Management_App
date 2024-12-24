import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GridBackground from './components/ui/GridBackground.jsx'
import {AuthContextProvider} from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
// Toaster
// AuthContextProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Toaster/>
    <AuthContextProvider>
      <GridBackground>
        <App />
      </GridBackground>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
)
