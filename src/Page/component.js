import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import axios from 'axios';

const GetHeader = ( props ) => {
    // const navigate = props.NavigateState();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">SHOP</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href='/login'>홈</Nav.Link>
                  <Nav.Link href='/login'>로그인</Nav.Link>
                  <Nav.Link href="/join">회원가입</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

const GetFooter = () => {
    return (
        <Button onClick={ async () => {
            await getMember().then( memberRes => {
                console.log({memberRes});
            } );
        } }>TEST</Button>
    )
}

const getMember = async () => {
    await axios.get( "/getMember" ).then( res => {
        console.log(res.data);
        return res.data;
    })
}

export default {
    GetHeader,
    GetFooter
}