const errors = ('restify.errors');
const mongoose = require('mongoose');
const Subject = require('../models/Subject');

module.exports = server => {
    server.get('/subjects', async (req, res, next) => {
        try {
            var subjects = await Subject.find({});
            // const resp = Object.assign({Average:}) //Figure it out...
            res.send(subjects);
            next();
        } catch (error) {
            console.log(error);
        }
    });

    server.post('/subjects', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(`Expecting 'application/json, got '${req}'`);
        }
        const {name, code, mark} = req.body;
        const subject = new Subject({
            name,
            code,
            mark
        });
        try {
            const newSubject = await subject.save();
            res.write();
            res.send(201, "GOOD");
            next();
        } catch (error) {
            return next();
        }

    });
}   