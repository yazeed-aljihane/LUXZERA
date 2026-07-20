import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import { CartProvider }     from "./context/CartContext.jsx";
import { WardrobeProvider } from "./context/WardrobeContext.jsx";
import { AuthProvider }     from "./context/AuthContext.jsx";

import ErrorBoundary from "./components/ErrorBoundary.jsx";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider
        clientId="404546324859-b29lgq8vjkpvf7tkov149dpc9sr8hia4.apps.googleusercontent.com"
      >
        <BrowserRouter>
          <CartProvider>
            <WardrobeProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </WardrobeProvider>
          </CartProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);  