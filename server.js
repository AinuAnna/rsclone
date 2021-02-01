/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 4004;
const dirname = path.resolve();
const app = express();
const productRouter = express.Router();

app.use(express.static('dist'));
app.use(bodyParser.json());
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

app.get('/login.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'login.html'));
  console.log(req);
  console.log(req.uid);
});
app.get('/signup.html', (req, res) => {
  res.render(path.resolve(dirname, 'dist', 'signup.html'));
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
});

const mailOptions = {
  from: '"RS-School" <rschool999@gmail.com>',
  subject: 'Добро пожаловать на курс!',
  text: 'This inventation from RS-School.',
};

app.post('/api/sendMail', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      to: req.body.mail,
      html: `<h1>Привет, ${req.body.name}!</h1>
      </br>
      <p>Добро пожаловать на курс Математического Моделирования, мы рады приветствовать Вас и желаем удачи в прохождении!!!</p>`,
    });

    console.log(`Email sent: ${info.response}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port}`);
});
