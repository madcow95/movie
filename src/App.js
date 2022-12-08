import { Routes, Route, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand href="#home">SHOP</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link href="/">홈</Nav.Link>
                  <Nav.Link href="/login">로그인</Nav.Link>
                  <Nav.Link href="/join">회원가입</Nav.Link>
              </Nav>
          </Container>
      </Navbar>
    </div>
  );
}

export default App;
