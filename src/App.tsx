// App.tsx
import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Builder from "./views/Builder";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/builder" element={<Builder />}/>
      </Routes>
    </>
  );
};

export default App;
