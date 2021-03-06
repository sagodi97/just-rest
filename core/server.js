const restify = require('restify');
const config = require("../settings")
const mongoose = require('mongoose');


const server = restify.createServer();

//Middleware

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    try {
        mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
    } catch (error) {
        console.log(error);
    }
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('../routes/subjects')(server);
    console.log("Connection to DB established succesfully");
    console.log(`En vivo desde ${config.PORT}!`)
});