import { Button, Form, FloatingLabel } from 'react-bootstrap';
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
                <Button variant="primary" type="button" onClick={ async () => {
                    const enterdUserName = $( "#UserName" ).val();
                    const enterdPassword = $( "#Password" ).val();
                    await axios.post( "/memberInfo", {
                        username : enterdUserName,
                        password : enterdPassword
                    } ).then( findRes => {
                        if( findRes ) {
                            console.log(findRes);
                        } else {
                            console.log("no result");
                        }
                    } );
                } }>
                    로그인
                </Button>
            </Form>
        </div>
    )
}

const GetJoinPage = ( props ) => {
    const axios = props.AxiosState;
    const MainState = props.MainState;
    const [ UserNameCheck, setUserNameCheck ] = MainState( false );
    return (
        <div className='container mt-5'>
            <Form>
                <FloatingLabel
                    controlId="UserName"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="아이디" onChange={ ( e ) => {
                        if( e.target.value.length >= 4 ) {
                            setUserNameCheck( true );
                        } else {
                            setUserNameCheck( false );
                        }
                    } }/>
                    { 
                    !UserNameCheck && 
                    <Form.Text id="passwordHelpBlock" muted>
                        아이디는 4글자 이상 입력해주세요
                    </Form.Text> 
                    }
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3" 
                    controlId="Password" 
                    label="Password">
                    <Form.Control type="password" placeholder="비밀번호" />
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3" 
                    controlId="Email" 
                    label="Email">
                    <Form.Control type="email" placeholder="ex) name@example.com" />
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3" 
                    controlId="Phone" 
                    label="Phone">
                    <Form.Control type="text" placeholder="전화번호" />
                </FloatingLabel>
                <Button variant="primary" type="button" onClick={ async () => {
                    const enteredUserName = $( "#UserName" ).val();
                    const enteredPassword = $( "#Password" ).val();
                    const enteredEmail = $( "#Email" ).val();
                    const enteredPhone = $( "#Phone" ).val();
                    const ValidationProp = [];
                    [ "UserName", "Password" ].forEach( p => {
                        if( !$( `#${ p }` ).val() ) {
                            ValidationProp.push( document.getElementById( p ).placeholder );
                        }
                    } );
                    if( ValidationProp.length > 0 ) {
                        alert( `다음 항목은 필수값입니다.\n${ ValidationProp.toString() }`);
                        return;
                    }
                    // await axios.post( "/memberInfo", {
                    //     username : enteredUserName,
                    //     password : enteredPassword
                    // } ).then( findRes => {
                    //     if( findRes ) {
                    //         console.log(findRes);
                    //     } else {
                    //         console.log("no result");
                    //     }
                    // } );
                } }>
                    로그인
                </Button>
            </Form>
        </div>
    )
}

export default {
    GetLoginPage,
    GetJoinPage
}