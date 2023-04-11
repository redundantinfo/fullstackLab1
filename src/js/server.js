require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();
const port = process.env.PORT;

// start a server on port 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});