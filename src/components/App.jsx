import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Keeper from "./Keeper";
import Login from "./Login";
import Register from "./Register";

function App(){
    return (
    <BrowserRouter>
      <Routes>
          <Route path="/keeper/:id" element={<Keeper/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;