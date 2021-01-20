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

app.get('/index.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'index.html'));
});
app.get('/main/student/index.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'index.html'));
});
app.get('/main/admin/index.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'index.html'));
});
app.get('/main/teacher/index.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'index.html'));
});
app.get('/profile.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'profile.html'));
});
app.get('/main/student/profile.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'profile.html'));
});
app.get('/main/admin/profile.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'profile.html'));
});
app.get('/main/teacher/profile.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'profile.html'));
});

app.get('/login.html/', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'login.html'));
  console.log(req);
  console.log(req.uid);
});

app.get('/*', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'main.html'));
});

/// ///////NODEMAILER///////////////////
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rschool999@gmail.com',
    pass: 'Rschool999d+',
  },
  tls: {
    rejectUnathorized: false,
  },
});

const mailOptions = {
  from: '"RS-School" <rschool999@gmail.com>',
  to: 'anna.26.tereshko@gmail.com',
  subject: 'Inventation',
  text: 'This inventation from RS-School.',
  html: 'This <i>inventation</i> from RS-School.',
};

app.post('/login.html', (req, res) => {
  const output = `<>You have a new contact request</p>`;
});

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Email sent: ${info.response}`);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
