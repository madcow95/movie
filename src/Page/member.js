import { Button, Form, FloatingLabel } from 'react-bootstrap';
import CommonUtil from "../Util/CommonUtil";
import $ from "jquery";

const GetLoginPage = ( props ) => {
    const axios = props.AxiosState;
    const navigate = props.NavagateState;
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
                    if( !CommonUtil.UserValidation( [ "UserName", "Password" ] ) ) return;
                    const enterdUserName = $( "#UserName" ).val();
                    const enterdPassword = $( "#Password" ).val();

                    await axios.post( "/memberInfo", {
                        username : enterdUserName,
                        password : enterdPassword
                    } ).then( findRes => {
                        if( findRes.data ) {
                            navigate( "/" );
                        } else {
                            alert( "일치하는 회원이 없습니다." );
                        }
                    } );
                } }>
                    로그인
                </Button>

                <Form.Text className="text-muted" 
                    style={{
                        float : "right",
                        cursor : "pointer"
                    }}
                    onClick={
                        () => {
                            navigate( "/findInfo" );
                        }
                    }
                    >
                    아이디/비밀번호 찾기
                </Form.Text>
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
        return SearchRes.data;
    } else {
        return false;
    }
}

const GetJoinPage = ( props ) => {
    const axios = props.AxiosState;
    const MainState = props.MainState;
    const navigate = props.NavagateState;
    const [ UserNameCheck, setUserNameCheck ] = MainState( false );
    const [ SearchUser, setSearchUser ] = MainState( false );
    const [ PasswordCheck, setPasswordCheck ] = MainState( false );
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
                        LengthCheck ? setUserNameCheck( true ) : setUserNameCheck( false );
                        await setSearchUser( false );
                        if( LengthCheck ) {
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
                    controlId="PasswordChk" 
                    label="Password Check"
                    onChange={ ( e ) => {
                        if( $( "#Password" ).val() == e.target.value ) {
                            setPasswordCheck( true );
                        } else {
                            setPasswordCheck( false );
                        }
                    } }>
                    <Form.Control type="password" placeholder="비밀번호" />
                    {
                        <Form.Text id="PasswordCheckTxt" muted>
                            { PasswordCheck ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다." }
                        </Form.Text>
                    }
                </FloatingLabel>
                <FloatingLabel
                    className="mb-3" 
                    controlId="PersonName" 
                    label="Name">
                    <Form.Control type="email" placeholder="이름" />
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

                    if( !CommonUtil.UserValidation( [ "UserName", "Password" ] ) ) return;

                    const enteredUserName = $( "#UserName" );
                    const enteredPassword = $( "#Password" );
                    const enteredName     = $( "#PersonName" );
                    const enteredEmail = $( "#Email" );
                    const enteredPhone = $( "#Phone" );

                    await axios.post( "/memberJoin", {
                        username   : enteredUserName.val(),
                        password   : enteredPassword.val(),
                        personName : enteredName.val(),
                        Email      : enteredEmail.val(),
                        Phone      : enteredPhone.val()
                    } ).then( () => {
                        alert( "회원가입이 완료되었습니다." );
                        navigate( "/" );
                    } ).catch( () => {
                        alert("에러가 발생했습니다.\n잠시 후 다시 시도해주세요.");
                    } );
                } }>
                    회원가입
                </Button>
            </Form>
        </div>
    )
}

export const GetFindInfo = () => {
    return (
        <div>
            <h1>아이디/비밀번호 찾기 페이지</h1>
        </div>
    )
}

export const Test = () => {
    const APIKey = "AIzaSyD6Gzk_-YieLA_oo0v_m1WyyM63QWoBUbo";
    return (
        <>
            <button className="btn" onClick={() => {
                $.ajax(
                    {
                        type : "get",
                        url : "https://www.googleapis.com/youtube/v3/search?",
                        data : {
                            part : "snippet",
                            key : APIKey,
                            type : "video",
                            q : "백종원"
                        },
                        success : ( e ) => {
                            console.log(e);
                        }
                    }
                )
            }}>숏박스</button>
            <div className="container"></div>
        </>
    )
}

export default {
    GetLoginPage,
    GetJoinPage,
    GetFindInfo,
    Test
}