// BUILD YOUR SERVER HERE
const express = require('express');

const User = require('./users/model')

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    let user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert(user)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
});

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(() => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
});

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
});

server.delete('/api/users/:id', (req, res) => {
    res.json("not implemented");
});

server.put('/api/users/:id', (req, res) => {
    res.json("not implemented");
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
