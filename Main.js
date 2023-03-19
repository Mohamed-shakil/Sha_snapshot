import React from "react";
import { Route,Routes } from "react-router-dom";
import App from "./App";


function Main()
{
    return <Routes>
      <Route path="/" element={<App data="mountains"/>}/>
      <Route path="/beaches" element={<App data="beaches"/>}/>
      <Route path="/birds" element={<App data="birds"/>}/>
      <Route path="/food" element={<App data="food"/>}/>
    </Routes>
}

export default Main;