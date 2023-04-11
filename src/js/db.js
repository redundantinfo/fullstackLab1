require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.dbURL
// get the database connection string from the environment variable
// or use the default connection string

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

