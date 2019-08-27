const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const controllers = require('../controllers');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/all', controllers.getAll);
app.get('/channels', controllers.getChannels)
app.get('/messages/:channel', controllers.getMessages);
app.put('/:channel', controllers.addMessage)

module.exports = app;
