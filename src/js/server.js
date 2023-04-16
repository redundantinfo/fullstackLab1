require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Album = require('./model');

const app = express();
const port = process.env.PORT;

app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// serve index.html from src/html folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));

});

// get all albums
app.get('/albums', async (req, res) => {
  const albums = await Album.find();
  if (!albums) return res.status(404).send('No albums found');
  res.json(albums);
});

// TODO: get album by title

// add new album
app.post('/albums', async (req, res) => {
  if (!req.body.title || !req.body.artist || !req.body.year) return res.status(400).send('Missing required fields');
  try {
    const newAlbum = await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year
    });
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// TODO: update an album

// TODO: delete an album

// FRONTEND TODO: populate index file with API data with a row for each album, each row has buttons for update, delete and show details

app.listen(port, () => console.log(`Server listening on port ${port}`));