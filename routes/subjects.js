const errors = ('restify.errors');
const mongoose = require('mongoose');
const Subject = require('../models/Subject');

module.exports = server => {
    server.get('/subjects', async (req, res, next) => {
        
        console.log(`Got a GET requester! -> ${req.getRoute().name} `);
        try {
            const subjects = await Subject.find({});
            res.send(subjects);
            next();
        } catch (error) {
            console.log(error);
        }
    });

    server.get('/subjects/average', async (req, res, next) => {
        
        console.log(`Got a GET requester! -> ${req.getRoute().name} `);
        try {
            const subjects = await Subject.find({});
            var fRe = subjects;
            var sum = 0;
            var count = 0;
            for(i in fRe){
                mrk = parseInt(fRe[i].mark.toString());
                sum += mrk;
                count++;
            } 
            res.send({
                studentAvg: `${parseFloat((sum/count).toFixed(2))}`
            });
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