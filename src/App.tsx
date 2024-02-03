// App.tsx
import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Builder from "./views/Builder";
import Login from "./features/auth/components/Login"
import SignUp from "./features/auth/components/SignUp"


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/builder" element={<Builder />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<SignUp />}/>
      </Routes>
    </>
  );
};

export default App;
