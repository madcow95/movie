import { Button, Form } from 'react-bootstrap';
import $ from "jquery";

const GetLoginPage = ( props ) => {
    const axios = props.AxiosState;
    return (
        <div className='container mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="UserName">
                    <Form.Control type="text" placeholder="아이디" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Control type="password" placeholder="비밀번호" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={ () => {
                    const enterdUserName = $( "#UserName" ).val();
                    const enterdPassword = $( "#Password" ).val();
                    axios.post( "/memberInfo", {
                        username : enterdUserName,
                        password : enterdPassword
                    } ).then( findRes => {
                        console.log({findRes});
                    } );
                } }>
                    로그인
                </Button>
            </Form>
        </div>
    )
}

export default {
    GetLoginPage
}