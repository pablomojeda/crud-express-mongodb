const mongoose = require('mongoose');

let db;

module.exports = function Connection() {
    if(!db) {
      mongoose.connect('mongodb://localhost/crud-example', {useNewUrlParser: true, useUnifiedTopology: true});

      db = mongoose.connection;
    }
    return db;
}