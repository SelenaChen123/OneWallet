import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Login';
import { UserInfo } from './UserInfo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserInfo />
  },
  {
    path: "/login",
    element: <Login />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
