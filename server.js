/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// import path from 'path';
// import express from 'express';

const express = require('express');
const path = require('path');

const port = process.env.port || 4004;
const dirname = path.resolve();
const app = express();
app.use(express.static('dist'));
app.engine('html', require('ejs').renderFile);

app.get('/pages-profile.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});

app.get('/login.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'login.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
