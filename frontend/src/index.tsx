import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8s4z77rcverlv0at.us.auth0.com"
      clientId="LmIU1umYzy70HALfwCbYPzaRF08oCg1x"
      redirectUri={window.location.origin}
      audience="https://hacknc2022ast-api"
      scope="read:bankinfo"
    >
      <RouterProvider router={router} />
    </Auth0Provider>,
  </React.StrictMode>
);
