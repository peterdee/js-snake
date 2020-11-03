const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const port = Number(process.env.PORT) || 1100;
app.listen(
  port,
  () => console.log(`-- JS Snake static files served on ${port}`),
);
