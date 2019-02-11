const errors = require('restify-errors');
const mongoose = require('mongoose');
const Subject = require('../models/Subject');

module.exports = server => {
    //Get list of Subjects and details.
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

    //Get student's average
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
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Subject By Id
    server.get('/subjects/:id', async (req, res, next) => {
        
        console.log(`Got a GET requester! -> ${req.getRoute().name} `);
        try {
            const subject = await Subject.findById(req.params.id);
            res.send(subject);
            next();
        } catch (error) {
            next(new errors.ResourceNotFoundError(`There is no Subject with id: ${req.params.id}`));
        }
    });

    //Post New Subject
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