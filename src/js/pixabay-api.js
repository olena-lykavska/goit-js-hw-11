export async function fetchImages(query) {
  const API_KEY = '47732907-b8d033787a8c1460109d1a6df';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
