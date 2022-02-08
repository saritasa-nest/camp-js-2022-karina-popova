import { renderFilms, resetDocFilms } from '../films/renderFilms';
import { resetNumberPage, updateВuttonsPagination } from '../pagination/pagination';

const searchButton = document.querySelector<HTMLButtonElement>('.search__button');
const searchInput = document.querySelector<HTMLInputElement>('.search__input');

export let searchText = '';

searchButton?.addEventListener('click', async() => {
  if (searchInput === null) {
    return;
  }

  searchText = searchInput.value;

  resetDocFilms();
  await renderFilms();
  resetNumberPage();
  updateВuttonsPagination();
});
