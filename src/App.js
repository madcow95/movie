import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import component from "./Page/component";
import memberPage from "./Page/member";
import main from "./Page/main";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <component.GetHeader/>
        <Routes>
          <Route path="/" element={<main.getMainPage MainState={ useState } NavagateState={ navigate }/>} />
          <Route path="/login" element={<memberPage.GetLoginPage AxiosState={ axios } NavagateState={ navigate }/>} />
          <Route path="/join" element={<memberPage.GetJoinPage AxiosState={ axios } MainState={ useState }  NavagateState={ navigate }/>} />
        </Routes>
    </>
  );
}

export default App;
