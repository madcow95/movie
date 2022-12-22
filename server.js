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
        return res.json( findUserRes );
    } );
} );

app.post( "/memberInfo", async ( req, res ) => {
    const findData = {
        username : req.body.username,
        password : req.body.password
    }
    const findUserRes = await db.collection( "member" ).findOne( findData );
    console.log(findUserRes);
    res.json( findUserRes );
    
} );

app.post( "/memberJoin", async ( req, res ) => {
    const JoinData = {
        username   : req.body.username,
        password   : req.body.password,
        personName : req.body.personName,
        email      : req.body.Email,
        phone      : req.body.Phone
    }
    await db.collection( "member" ).insertOne( JoinData ).then( () => {
        res.send( req.body.username );
    } ).catch( () => {
        res.send( "error" );
    } );
} );

app.get( "*", ( req, res ) => {
    res.sendFile( `${ __dirname }/build/index.html` );
} );
