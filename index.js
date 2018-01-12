const express = require('express');
const db = require('./db');

/* CONST */
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const PATH = '/api/v1/astronauts/';

/* ERROR MESSAGES AND RESPONSES */
const BAD_REQUEST = 'Request not valid!';

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
    //to implement
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