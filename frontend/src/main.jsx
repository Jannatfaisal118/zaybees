import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import LanguageContextProvider from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <LanguageContextProvider>
          <App />
      </LanguageContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
);
