import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import component from "./Page/component";
import memberPage from "./Page/member";
import main from "./Page/main";

function App() {
  // const navigate = useNavigate();
  
  return (
    <>
      {/* <component.GetHeader NavigateState={ navigate }/> */}
      <component.GetHeader/>
        <Routes>
          <Route path="/" element={<main.getMainPage/>} />
          <Route path="/login" element={<memberPage.GetLoginPage AxiosState={ axios }/>} />
          <Route path="/join" element={<memberPage.GetJoinPage AxiosState={ axios } MainState={ useState }/>} />
          {/* <Route path="/join" element={ <compUtil.GetJoinPage /> } />
          <Route path="/cart" element={ <compUtil.GetCartPage /> } />
          <Route path="/*" element={ <div>잘못 들어오신거 같은데요?</div> } /> */}
        </Routes>
      {/* <component.GetFooter/>   */}
    </>
  );
}

export default App;
