const restify = require('restify');
const config = require("../settings")
const mongoose = require('mongoose');


const server = restify.createServer();

//Middleware

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    
    mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('../routes/subjects')(server);
    console.log(`En vivo desde ${config.PORT}!`)
});