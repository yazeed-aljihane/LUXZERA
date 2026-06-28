import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import { CartProvider }     from "./context/CartContext.jsx";
import { WardrobeProvider } from "./context/WardrobeContext.jsx";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId="404546324859-b29lgq8vjkpvf7tkov149dpc9sr8hia4.apps.googleusercontent.com"
    >
      <BrowserRouter>
        <CartProvider>
          <WardrobeProvider>
            <App />
          </WardrobeProvider>
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);  