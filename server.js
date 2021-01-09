const express = require('express');

const app = express();

app.use(express.static('dist'));

// app.get('/', (req, res) => {
//   res.send('Hello API');
// });

app.listen(4004, () => {
  // eslint-disable-next-line no-console
  console.log('API app start');
});
