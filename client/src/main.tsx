import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StoresProvider, stores } from "./stores";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <App />
    </StoresProvider>
  </React.StrictMode>,
)
