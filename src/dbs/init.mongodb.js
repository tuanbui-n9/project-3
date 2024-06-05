'use strict';

const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');

const connectString = 'mongodb://mongoadmin:mongopass@localhost:27017';

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 5,
      })
      .then(() => {
        countConnect();
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
