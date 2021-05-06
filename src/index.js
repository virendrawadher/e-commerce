import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import setupMockServer from "./api/server_mock"
import {CartProdProvider} from "./context/CartProdContext"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from './context/authcontextprovider';
import { CartProvider } from './context/cartContext';
import { ToastProvider } from './context/toastContext';
import { WishListProvider } from './context/wishlistcontext';
// setupMockServer();


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ToastProvider>
          <CartProdProvider>
            <CartProvider>
              <WishListProvider>
                <App />
              </WishListProvider>
            </CartProvider>
          </CartProdProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
