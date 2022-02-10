import { renderFilms, resetDocFilms } from '../films/renderFilms';
import { resetNumberPage, updateВuttonsPagination } from '../pagination/pagination';
import { StoreService } from '../services/StoreService';

const searchButton = document.querySelector<HTMLButtonElement>('.search__button');
const searchInput = document.querySelector<HTMLInputElement>('.search__input');

searchButton?.addEventListener('click', async() => {
  if (searchInput === null) {
    return;
  }

  StoreService.setStore({
    searchText: searchInput.value,
  });

  resetDocFilms();
  await renderFilms();
  resetNumberPage();
  updateВuttonsPagination();
});
