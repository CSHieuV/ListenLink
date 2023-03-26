import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoresProvider, stores } from "./stores";
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <RouterProvider router={router} />
    </StoresProvider>
  </React.StrictMode>,
)
