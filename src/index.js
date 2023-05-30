import { fetchBreeds, fetchCatByBreed } from './catapi.js';
import './css/style.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

let selectedCatId = '';

function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'block';
  catInfo.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
  catInfo.style.display = 'block';
}

function showError(message) {
  Notiflix.Notify.Failure(message);
}

showLoader();

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      return option;
    });
    breedSelect.append(...breedOptions);
    hideLoader();
  })
  .catch(error => {
    console.log(error);
    hideLoader();
    showNotification('Oops, something went wrong. Please try again later.');
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId !== selectedCatId) {
    loader.style.display = 'block';
    breedSelect.style.display = 'block';
    catInfo.innerHTML = '';
  }

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      selectedCatId = selectedBreedId;
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" width="500" height="300">
        <h3>${catData.breeds[0].name}</h3>
        <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      console.error(error);
      showNotification('Oops, something went wrong. Please try again later.');
    })
    .finally(() => {
      hideLoader();
    });
});

function showNotification(message) {
  Notiflix.Notify.failure(message);
}