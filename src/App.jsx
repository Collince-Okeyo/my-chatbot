import React from 'react'
import Chatbot from './components/Chatbot'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Facebook AI Chatbot</h2>
      <Chatbot />
      <Analytics />
    </div>
  )
}

export default App
