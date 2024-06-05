require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');

const app = express();

// Initialize middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database
require('./dbs/init.mongodb');

// Initialize routes
app.use(require('./routes'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
});

module.exports = app;
