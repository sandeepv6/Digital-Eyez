import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import VoiceToText from './components/VoiceToText.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <VoiceToText />
    </>
  </React.StrictMode>
)
