const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');

const app = express();

// Initialize middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Initialize database

// Initialize routes
app.get('/', (req, res) => {
  res.status(200).json('Hello World');
});

module.exports = app;
