import UNSPLASH_API_KEY from './apiKey';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count = 5;
let ready = false;
let imagesLoaded = 0;
let totatlImages = 0;
let photosArray = [];

const unsplashUri = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&count=${count}`;

const setAttributes = (elem, attrObj) => {
  for (const key in attrObj) {
    elem.setAttribute(key, attrObj[key]);
  }
};

const imgLoaded = () => {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totatlImages) {
    ready = true;
    loader.hidden = true;
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  totatlImages = photosArray.length;
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
    imgTag.addEventListener('load', imgLoaded);
    anchorTag.append(imgTag);
    imageContainer.append(anchorTag);
  });
};

// get photos for unsplash
async function getPhotos() {
  try {
    const response = await fetch(unsplashUri);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight > document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
