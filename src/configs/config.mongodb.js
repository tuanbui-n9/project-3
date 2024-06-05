'use strict';

const dev = {
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
  },
  db: {
    uri: process.env.DB_URI,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
  },
  db: {
    uri: process.env.DB_URI,
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];
