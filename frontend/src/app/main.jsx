import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "@/app/App";
import { CartProvider }     from "@/modules/cart/context/CartContext";
import { WardrobeProvider } from "@/modules/wishlist/context/WardrobeContext";
import { AuthProvider }     from "@/modules/auth/context/AuthContext";

import ErrorBoundary from "@/shared/components/ui/ErrorBoundary";

import "@/styles/globals.css";

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