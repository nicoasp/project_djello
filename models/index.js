var mongoose = require('mongoose');
var bluebird = require('bluebird');

// Set bluebird as the promise
// library for mongoose
mongoose.Promise = bluebird;

var models = {};

// Load models and attach to models here
models.User = require('./User');
models.Board = require('./Board');
models.List = require('./List');
models.Card = require('./Card');
models.Activity = require('./Activity');

module.exports = models;