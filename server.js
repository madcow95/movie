const express = require( "express" );
const path    = require( "path" );
const cors    = require( "cors" );
const app     = express();

app.use( express.static( `${ __dirname }/build` ) );
app.use( express.json() );
app.use( cors() );

app.listen( 8080, ( req, res ) => {
    console.log("8080 is running");
} );

app.get( "/", ( req, res ) => {
    res.sendFile( `${ __dirname }/build/index.html` );
} );