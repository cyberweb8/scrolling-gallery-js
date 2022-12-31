import UNSPLASH_API_KEY from './apiKey';
const imageContainer = document.getElementById('image-container');

const count = 3;

const unsplashUri = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${count}`;

const setAttributes = (elem, attrObj) => {
  for (const key in attrObj) {
    elem.setAttribute(key, attrObj[key]);
  }
};

let photosArray = [];
const displayPhotos = () => {
  photosArray.map((photo) => {
    const anchorTag = document.createElement('a');
    setAttributes(anchorTag, {
      href: photo.links.html,
      target: '_blank',
    });
    const imgTag = document.createElement('img');
    setAttributes(imgTag, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    anchorTag.append(imgTag);
    imageContainer.append(anchorTag);
  });
};

// get photos for unsplash
async function getPhotos() {
  try {
    const response = await fetch(unsplashUri);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// getPhotos();
