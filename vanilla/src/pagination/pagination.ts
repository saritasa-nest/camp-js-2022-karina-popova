import { lastDocFilm, renderFilms } from '../films/renderFilms';
import { ChangePage } from '../enum/enum';

const nextButton = document.querySelector<Element>('.next-button');
const prevButton = document.querySelector<Element>('.prev-button');
const page = document.querySelector<HTMLElement>('.number-page');

let numberPage = 1;

nextButton?.addEventListener('click', () => pagination(ChangePage.Next));
prevButton?.addEventListener('click', () => pagination(ChangePage.Prev));

/**
 * Stops or continues pagination.
 * @param changePage Next or prev page.
 */
export async function pagination(changePage: ChangePage): Promise<void> {
  if (
    (changePage === ChangePage.Next && lastDocFilm === null) ||
    (changePage === ChangePage.Prev && numberPage === 1)
  ) {
    return;
  }
  await renderFilms(changePage);
  editNumberPage(changePage);
  updateВuttonsPagination();
}

/**
 * Edit number page.
 * @param changePage Page arrow.
 */
export function editNumberPage(changePage: ChangePage): void {
  if (changePage === ChangePage.Next) {
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
