import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider domain="dev-5z13ny3t3ert21qz.us.auth0.com"
      clientId="i2SKLfpT33xgcuJ4RCaIbjQRjDman6eZ"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "weather",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
