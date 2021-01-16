/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// import path from 'path';
// import express from 'express';

const express = require('express');
const path = require('path');

const dirname = path.resolve();
const app = express();
const port = process.env.port || 4004;

// app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(dirname, 'dist', 'main.html'));
});

app.get('/test/pages-invoice.html', (req, res) => {
  // handle root
  console.log('yo');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
