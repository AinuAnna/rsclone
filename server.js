/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = process.env.port || 4004;

app.use(express.static('dist'));

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
