/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// import path from 'path';
// import express from 'express';
// import Admin from './src/components/Admin/Admin';

// const admin = new Admin(document.getElementById('container'));

const express = require('express');
const path = require('path');

const port = process.env.port || 4004;
const dirname = path.resolve();
const app = express();
const productRouter = express.Router();
app.use(express.static('dist'));
app.engine('html', require('ejs').renderFile);

app.get('/main', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});

app.get('/login', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'login.html'));
});

app.get('/*', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
