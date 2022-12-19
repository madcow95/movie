
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

export default {
    UserValidation
}