// import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider.tsx";
import "./index.css";
import "tailwindcss/tailwind.css";



ReactDOM.createRoot(document.getElementById("root")!).render(
  
    <BrowserRouter>
   {/* <React.StrictMode> */}
      <DataProvider>
        <App />
      </DataProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>

);
