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

const JoinValidation = async ( e, axios ) => {
    if( e.target.value.length >= 4 ) {
        const SearchRes = await axios.post( "/memberInfo", {
            username : e.target.value
        } ).catch( e => {
            console.log({e});
        } );
        return SearchRes;
    } else {
        return false;
    }
}

const GetJoinPage = ( props ) => {
    const axios = props.AxiosState;
    const MainState = props.MainState;
    const [ UserNameCheck, setUserNameCheck ] = MainState( false );
    const [ SearchUser, setSearchUser ] = MainState( false );
    return (
        <div className='container mt-5'>
            <Form>
                <FloatingLabel
                    controlId="UserName"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="아이디" onChange={ async ( e ) => {
                        const LengthCheck = e.target.value.length >= 4;
                        LengthCheck >= 4 ? setUserNameCheck( true ) : setUserNameCheck( false );
                        await setSearchUser( false );
                        if( LengthCheck >= 4 ) {
                            await setSearchUser( await JoinValidation( e, axios ) );
                        }
                        SearchUser ? $( "#JoinBtn" ).attr( "disabled", true ) : $( "#JoinBtn" ).attr( "disabled", false );
                     } }/>
                        { 
                            !UserNameCheck &&
                            <Form.Text id="passwordHelpBlock" muted>
                                아이디는 4글자 이상 입력해주세요.
                            </Form.Text>
                        }
                        {
                            UserNameCheck &&
                            <Form.Text id="UserExistCheck" muted>
                                { SearchUser ? "이미 사용중인 아이디 입니다." : "사용 가능한 아이디 입니다." }
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
                <Button variant="primary" type="button" id="JoinBtn" onClick={ async () => {
                    const enteredUserName = $( "#UserName" );
                    const enteredPassword = $( "#Password" );
                    const enteredEmail = $( "#Email" );
                    const enteredPhone = $( "#Phone" );
                    const ValidationProp = [];
                    [ enteredUserName, enteredPassword ].forEach( p => {
                        if( !p.val() ) {
                            ValidationProp.push( document.getElementById( p ).placeholder );
                        }
                    } );
                    if( ValidationProp.length > 0 ) {
                        alert( `다음 항목은 필수값입니다.\n${ ValidationProp.toString() }`);
                        return;
                    }
                    await axios.post( "/memberInfo", {
                        username : enteredUserName.val()
                    } ).then( findRes => {
                        if( findRes ) {
                            console.log(findRes);
                        } else {
                            console.log("no result");
                        }
                    } );
                } }>
                    회원가입
                </Button>
            </Form>
        </div>
    )
}

export default {
    GetLoginPage,
    GetJoinPage
}