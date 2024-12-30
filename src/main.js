// Імпортуємо необхідні функції та бібліотеки
import { fetchImages } from './js/pixabay-api'; // Функція для отримання зображень з Pixabay API
import { renderGallery, clearGallery } from './js/render-functions'; // Функції для рендерингу галереї та очищення
import iziToast from "izitoast"; // Бібліотека для показу повідомлень користувачу
import "izitoast/dist/css/iziToast.min.css"; // Підключаємо стилі для iziToast

// Отримуємо елементи форми та лоадер із HTML
const form = document.querySelector('.search-form'); // Форма для введення запиту на пошук
const loader = document.querySelector('#loader'); // Лоадер, який ми будемо показувати під час завантаження

// Додаємо слухач події для відправлення форми
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Попереджаємо перезавантаження сторінки при відправці форми

  // Знаходимо поле введення за атрибутом name та отримуємо значення запиту
  const queryInput = form.querySelector('input[name="searchQuery"]'); // Знаходимо поле введення за атрибутом name="searchQuery"
  const query = queryInput.value.trim(); // Отримуємо значення запиту, очищуємо від зайвих пробілів

  // Лог для перевірки значення запиту
  console.log('Search query value:', query);

  // Якщо користувач не ввів запит, показуємо повідомлення про помилку
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' }); // Показуємо помилку за допомогою iziToast
    return; // Зупиняємо виконання, щоб не робити запит без запиту
  }

  // Якщо є запит, очищаємо галерею та показуємо лоадер
  clearGallery(); // Очищаємо попередні результати галереї
  loader.classList.remove('hidden'); // Знімаємо клас 'hidden', щоб показати лоадер
  loader.classList.add('visible'); // Додаємо клас 'visible', щоб зробити лоадер видимим

  // Викликаємо fetchImages і обробляємо результат за допомогою промісів
  fetchImages(query) // Викликаємо функцію для отримання зображень, передаючи запит
    .then(function(data) { // Якщо запит пройшов успішно
      loader.classList.remove('visible'); // Приховуємо лоадер
      loader.classList.add('hidden'); // Додаємо клас 'hidden' для приховування лоадера

      // Якщо не знайдено жодних зображень, показуємо попередження
      if (data.hits.length === 0) {
        iziToast.warning({ title: 'No Results', message: 'Sorry, there are no images matching your search query.' });
        return; // Якщо немає результатів, зупиняємо подальшу обробку
      }

      // Якщо зображення знайдені, рендеримо їх на сторінці
      renderGallery(data.hits); // Викликаємо функцію для рендерингу галереї з отриманими зображеннями
    })
    .catch(function(error) { // Якщо запит завершився помилкою
      loader.classList.remove('visible'); // Приховуємо лоадер
      loader.classList.add('hidden'); // Додаємо клас 'hidden' для приховування лоадера
      iziToast.error({ title: 'Error', message: 'Failed to load images. Please try again later.' }); // Показуємо помилку
    });
});
