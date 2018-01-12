const express = require('express');
const db = require('./db');

/* CONST */
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const PATH = '/api/v1/astronauts/';

/* ERROR MESSAGES AND RESPONSES */
const BAD_REQUEST = 'Richiesta non valida!';
const NOT_FOUND = 'Astronauta non trovato!';

/* LISTENERS FOR DIFFERENT METHODS */
app.get(PATH, function(req, res) {

    var id;
    if(req.query.hasOwnProperty('id')) {
        id = parseInt(req.query.id);
    }

    if(id !== undefined) {
        var arr = [];
        var obj = db.getByID(id);
        if(obj !== null) {
            arr.push(obj);
            res.json(arr);
            res.status(200);
        } else {
            res.json(arr);
            res.status(404);
        }
    } else {
        res.json(db.getAll());
        res.status(200);
    }

    return;
});

app.post(PATH, function(req, res) {
    var jsonBody = req.body;

    var result = db.add(jsonBody);
    if(result !== null) {
        res.status(200);
        res.send("Entry added with ID: " + result);
    } else {
        res.status(400);
        res.send(BAD_REQUEST);
    }
});

app.put(PATH, function(req, res) {
    var jsonBody = req.body;
    var id, firstName, lastName, isInSpace;

    if(jsonBody.hasOwnProperty("id")) {
        id = jsonBody.id;
    }
    if(jsonBody.hasOwnProperty("firstName")) {
        firstName = jsonBody.firstName;
    }
    if(jsonBody.hasOwnProperty("lastName")) {
        lastName = jsonBody.lastName;
    }
    if(jsonBody.hasOwnProperty("isInSpace")) {
        isInSpace = jsonBody.isInSpace;
    }

    var result = db.getByID(id);
    if(result !== null) {
        if(firstName !== undefined) {
            result.firstName = firstName;
        }
        if(lastName !== undefined) {
            result.lastName = lastName;
        }
        if(isInSpace !== undefined) {
            result.isInSpace = isInSpace;
        }

        res.status(200);
        res.send("Astronauta modificato!");
        
    } else {
        res.status(404);
        res.send(NOT_FOUND);
    }
});


var server = app.listen(PORT, function() {
    console.log('Server started on port: ' + PORT);
});

//function used externally (in test files) to stop the server
function close() {
    server.close();
}

//export of functions
module.exports = {
    close:close
};