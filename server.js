const MethodOverride  = require( "method-override" );
const MongoClient     = require( "mongodb" ).MongoClient;
const express         = require( "express" );
const path            = require( "path" );
const cors            = require( "cors" );
const app             = express();
const http            = require( "http" ).createServer( app );

app.use( MethodOverride( "_method" ) );
app.use( express.static( `${ __dirname }/build` ) );
app.use( express.json() );
app.use( cors() );

let db;

MongoClient.connect( "mongodb+srv://admin:qwer1234@cluster0.t2fk11g.mongodb.net/?retryWrites=true&w=majority", ( err, client ) => {
    if( err ) {
        return console.log( { err } );
    }
    db = client.db( "movieSearch" );
    http.listen( 8080 );
} );

app.get( "/", ( req, res ) => {
    res.sendFile( `${ __dirname }/build/index.html` );
} );

app.get( "/getMember", async ( req, res ) => {
    await db.collection( "member" ).find().toArray().then( findUserRes => {
        console.log(findUserRes);
        return res.json( findUserRes );
    } );
} );

app.post( "/memberInfo", async ( req, res ) => {
    const findTargettUserName = req.body.username;
    console.log(findTargettUserName);
    await db.collection( "member" ).findOne( { username : findTargettUserName } ).then( findUserRes => {
        const returnData = findUserRes && res.json( findUserRes );
        console.log(returnData);
        return returnData;
    } );
} );

app.get( "*", ( req, res ) => {
    res.sendFile( `${ __dirname }/build/index.html` );
} );
