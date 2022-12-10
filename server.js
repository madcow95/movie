const express = require( "express" );
const path    = require( "path" );
const app     = express();

app.listen( 8080, ( req, res ) => {
    console.log("8080 is running");
} );

app.use( express.static( `${ __dirname }/build` ) );

app.get( "/", ( req, res ) => {
    res.sendFile( `${ __dirname }/build/index.html` );
} );