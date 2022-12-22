
import $ from "jquery";

const UserValidation = ( userProp ) => {
    const ValidationProp = [];
    userProp.forEach( p => {
        if( !$( `#${ p }` ).val() ) {
            ValidationProp.push( $( `#${ p }` ).attr( "placeholder" ) );
        }
    } );
    if( ValidationProp.length > 0 ) {
        alert( `다음 항목은 필수값입니다.\n${ ValidationProp.toString() }`);
        return false;
    }
    return true;
}

const getYoutubeData = ( searchKey ) => {
    const APIKey = "AIzaSyD6Gzk_-YieLA_oo0v_m1WyyM63QWoBUbo";
    $.ajax(
        {
            type : "get",
            url : "https://www.googleapis.com/youtube/v3/search?",
            data : {
                part : "snippet",
                key : APIKey,
                type : "video",
                q : searchKey
            },
            success : ( e ) => {
                return e;
            }
        }
    )
}

export default {
    UserValidation,
    getYoutubeData
}