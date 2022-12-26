import { Button, Form, FloatingLabel } from 'react-bootstrap';
import CommonUtil from "../Util/CommonUtil";
import $ from "jquery";
import axios from 'axios';

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
    const [ CompInfo ] = MainState( [ [ "UserName", "아이디" ], [ "Password", "비밀번호" ], [ "PasswordChk", "비밀번호 확인" ],
                                      [ "PersonName", "이름" ], [ "Email", "이메일" ], [ "Phone", "전화번호" ] ] );
    return (
        <div className='container mt-5'>
            <Form>
                {
                    CompInfo.map( info => <FormComp ControlIdState={ info[0] } ControleLabel={ info[1] } MainState={ MainState } /> )
                }
                <Button variant="primary" type="button" id="JoinBtn" className='mt-3' onClick={ async () => {

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

export const GetFindInfo = ( props ) => {
    const MainState = props.MainState;
    let [ FindInfo ] = MainState( [ [ 'UserName', '아이디' ], [ 'Password', '비밀번호' ] ] );
    return (
        <div className='container'>
            <Form>
                {
                    FindInfo.map( info => <FormComp ControlIdState={ info[0] } ControleLabel={ info[1] } /> )
                }
                <Button 
                    variant="primary" 
                    type="button" 
                    id="findBtn" 
                    className='mt-3'
                    onClick={ () => {
                        const findInfo = {
                            username : $( "#UserName" ).val(),
                            password : $( "#Password" ).val()
                        }
                        axios.post( "/memberInfo", findInfo ).then( findRes => {
                            findRes.data ? alert( `${ $( "#UserName" ).val() }의 비밀번호 : \n${ findRes.data.password }입니다.` ) : alert( "일치하는 정보가 없습니다." );
                        } );
                    } }>
                        회원가입
                </Button>
            </Form>
        </div>
    )
}

const FormComp = ( props ) => {
    const CompId = props.ControlIdState;
    const CompLabel = props.ControleLabel;
    const MainState = props.MainState;

    const [ SearchUser, setSearchUser ] = MainState( false );
    const [ UserNameCheck, setUserNameCheck ] = MainState( false );
    const [ PasswordCheck, setPasswordCheck ] = MainState( false );
    return (
        <>
            <FloatingLabel
                controlId={ CompId }
                label={ CompLabel }
                className="mt-3"
                >
                <Form.Control
                    type={ CompId === "Password" ? "password" : "text" }
                    label={ CompLabel }
                    onChange={ async ( e ) => {
                        if( CompId !== "" ) return;
                        const LengthCheck = e.target.value.length >= 4;
                        LengthCheck ? setUserNameCheck( true ) : setUserNameCheck( false );
                        await setSearchUser( false );
                        if( LengthCheck ) {
                            await setSearchUser( await JoinValidation( e, axios ) );
                        }
                        SearchUser ? $( "#JoinBtn" ).attr( "disabled", true ) : $( "#JoinBtn" ).attr( "disabled", false );
                    } }>
                </Form.Control>
            </FloatingLabel>
        </>
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