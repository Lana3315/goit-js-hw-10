const url = 'https://api.thecatapi.com/v1/breeds';
const imageUrl = 'https://api.thecatapi.com/v1/images/search';
const api_key =
  'live_wiC60OFEUqzeRcuy1bwn3yYBHRpNqzjqT8Cy8cqXt9BgcRKHkumJM3XaVpUczFvL';

function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  const url = `${imageUrl}?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data[0];
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };