import UNSPLASH_API_KEY from './apiKey';

const count = 3;

const unsplashUri = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${count}`;

// get photos for unsplash
async function getPhotos() {
  try {
    const response = await fetch(unsplashUri);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos();
