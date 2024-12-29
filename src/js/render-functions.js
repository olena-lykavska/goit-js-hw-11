import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery__item">
        <img src="${webformatURL}" alt="${tags}" class="gallery__image" />
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    `)
    .join('');
  
  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
