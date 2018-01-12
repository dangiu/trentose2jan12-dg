var _ = require('lodash')
var globalID = 500;
var array = [
    {
        "id":123,
        "firstName":"Daniele",
        "lastName":"Giuliani",
        "isInSpace":true
    },
    {
        "id":456,
        "firstName":"Willi",
        "lastName":"Menapace",
        "isInSpace":true
    },
    {
        "id":789,
        "firstName":"Alessio",
        "lastName":"Paternoster",
        "isInSpace":false
    }
];

function equals(a, b) {
    return _.isEqual(a, b);
}

function contains(obj) {
    for(var i = 0; i < array.length; i++) {
        var current = array[i];
        if(equals(current, obj)) return i;
    }
    return -1;
}

function getByID(ID) {
    for(var i = 0; i < array.length; i++) {
        var current = array[i];
        if(current.id === ID) return array[i];
    }
    return null;
}

function getAll() {
    return array;
}

function add(obj) {
    if(obj.hasOwnProperty('firstName') && obj.hasOwnProperty('lastName') && obj.hasOwnProperty('isInSpace')) {
        //create real object
        var elemID = globalID;
        globalID++;
        var elem = {
            "id": elemID,
            "firstName":obj.firstName,
            "lastName":obj.lastName,
            "isInSpace":obj.isInSpace
        }
        array.push(elem);
        return elemID;
    }
    return null;
}


function size() {
    return array.length;
}

module.exports = {
    add:add,
    getByID:getByID,
    getAll:getAll,
    size:size
};