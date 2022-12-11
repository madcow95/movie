import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import component from "./Page/component";
import memberPage from "./Page/member";

function App() {
  // const navigate = useNavigate();
  
  return (
    <>
      {/* <component.GetHeader NavigateState={ navigate }/> */}
      <component.GetHeader/>
        <Routes>
          {/* <Route path="/"/> */}
          <Route path="/login" element={<memberPage.GetLoginPage />} />
          {/* <Route path="/join" element={ <compUtil.GetJoinPage /> } />
          <Route path="/cart" element={ <compUtil.GetCartPage /> } />
          <Route path="/*" element={ <div>잘못 들어오신거 같은데요?</div> } /> */}
        </Routes>
    </>
  );
}

export default App;
