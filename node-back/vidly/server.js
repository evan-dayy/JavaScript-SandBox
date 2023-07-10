const app = require("./app");
const DatabaseDebugger = require('debug')('app:database')
const HttpDebugger = require('debug')('app:http'); 
const LocalDebugger = require('debug')('app:local'); 
const TransactionDebugger = require('debug')('app:transaction')

const express = require('express');
const winston = require('winston');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  HttpDebugger(`Listening on port ${port}...`);
  winston.info('Listening on port 3000...');
});

module.exports = server; // for testing