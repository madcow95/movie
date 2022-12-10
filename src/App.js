import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import component from "./CommonUtil/component";

function App() {
  return (
    <>
      <component.GetHeader />
    </>
  );
}

export default App;
