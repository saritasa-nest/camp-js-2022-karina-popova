import { lastDocFilm, renderFilms } from '../films/renderFilms';
import { PaginationDirection } from '../enum/enum';

const nextButton = document.querySelector<HTMLButtonElement>('.next-button');
const prevButton = document.querySelector<HTMLButtonElement>('.prev-button');
const page = document.querySelector<HTMLElement>('.number-page');

let numberPage = 1;

nextButton?.addEventListener('click', () => handlePagination(PaginationDirection.Next));
prevButton?.addEventListener('click', () => handlePagination(PaginationDirection.Prev));

/**
 * Stops or continues pagination.
 * @param paginationDirection Next or prev page.
 */
export async function handlePagination(paginationDirection: PaginationDirection): Promise<void> {
  if (
    (paginationDirection === PaginationDirection.Next && lastDocFilm === null) ||
    (paginationDirection === PaginationDirection.Prev && numberPage === 1)
  ) {
    return;
  }
  await renderFilms(paginationDirection);
  editNumberPage(paginationDirection);
  updateВuttonsPagination();
}

/**
 * Edit number page.
 * @param paginationDirection Page arrow.
 */
export function editNumberPage(paginationDirection: PaginationDirection): void {
  if (paginationDirection === PaginationDirection.Next) {
    numberPage++;
  } else {
    numberPage--;
  }
  if (page?.textContent) {
    page.textContent = numberPage.toString();
  }
}

/**
 * Edit next and prev button.
 */
export function updateВuttonsPagination(): void {
  if (numberPage === 1) {
    prevButton?.classList.add('disabled');
    prevButton?.classList.remove('waves-effect');
  } else {
    prevButton?.classList.remove('disabled');
    prevButton?.classList.add('waves-effect');
  }
  if (lastDocFilm !== null) {
    nextButton?.classList.add('waves-effect');
    nextButton?.classList.remove('disabled');
  } else {
    nextButton?.classList.remove('waves-effect');
    nextButton?.classList.add('disabled');
  }
}
