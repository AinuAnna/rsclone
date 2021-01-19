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

app.get('/main.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});

app.get('/index.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'login.html'));
  console.log(req);
  console.log(req.uid);
});

app.get('/*', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});
/*
app.get('/main/student/results/', (req, res) => {
  res.send('/main/student/results/');
});
*/
app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
