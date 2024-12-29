import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо елементи форми та лоадер
const form = document.querySelector('.search-form');
const loader = document.querySelector('#loader');

// Додаємо слухач події для відправлення форми
form.addEventListener('submit', async event => {
  event.preventDefault();

  // Знаходимо поле введення за атрибутом name
  const queryInput = form.querySelector('input[name="searchQuery"]');
  const query = queryInput?.value.trim(); // Захист від помилок, якщо елемент не знайдено

  console.log('Search query value:', query); // Перевірка, що значення вірне

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  // Очищаємо галерею та показуємо лоадер
  clearGallery();
  loader.classList.add('visible');

  try {
    const data = await fetchImages(query);
    loader.classList.remove('visible');

    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'Sorry, there are no images matching your search query.' });
      return;
    }

    renderGallery(data.hits);
  } catch (error) {
    loader.classList.remove('visible');
    iziToast.error({ title: 'Error', message: 'Failed to load images. Please try again later.' });
  }
});
