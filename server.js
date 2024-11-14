const express = require ('express' ) ;
const cors = require('cors') ;
const mongoose = require( 'mongoose' ) ;
const bodyParser = require('body-parser') ;
global. Vocab = require('./Api/models/vocabModel.js');
const routes = require('./Api/routes/vocabRoutes.js' ) ;

mongoose. Promise = global.Promise;
mongoose. connect ( 'mongodb+srv://phathtgcs220469:Hotanphat2004@fwgweb2.g0ai9.mongodb.net/',
    { useNewUrlParser: true }
);
const port = process.env.PORT || 3000;
const app = express ( ) ;
app.use(cors());
app. use(bodyParser.urlencoded( { extended: true }) ) ;
app.use(bodyParser. json() );

routes (app) ;
app. listen(port);
app. use((req, res) => {
    res.status (404). send({ url: `${req.originalUrl} not found` }) ;
});
console. log (`Server started on port ${port}`);
