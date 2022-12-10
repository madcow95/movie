import { Container, Nav, Navbar } from 'react-bootstrap';

const GetHeader = () => {
    return (
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
    )
}

const GetFooter = () => {
    return (
        <h1>TEST</h1>
    )
}

export default {
    GetHeader,
    GetFooter
}