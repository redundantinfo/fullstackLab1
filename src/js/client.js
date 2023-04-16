const form = document.querySelector('#add-album-form');

const fetchStartPage = async () => {
  try {
    const response = await fetch('/');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('frontend / route is kaputt')
    console.log(err);
  }
};

async function fetchAlbums() {
  try {
    const response = await fetch('/albums', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Could not fetch album data');
    }
  } catch (err) {
    console.log('frontend /api/albums route is kaputt')
    console.log(err);
  }
}

async function addAlbum(album) {
  try {
    const response = await fetch('/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Could not add album');
    }
  } catch (err) {
    console.log('frontend /api/albums route is kaputt')
    console.log(err);
  }
}

// submit to add new album
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = form.title.value;
  const artist = form.artist.value;
  const year = form.year.value;

  const album = { title, artist, year };
  try {
    const addAlbum = await addAlbum(album);
    console.log(addAlbum);
  } catch (err) {
    console.log('frontend /api/albums route is kaputt')
    console.log(err);
  }
});
