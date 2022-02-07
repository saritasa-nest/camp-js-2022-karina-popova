import { lastDocFilm, renderFilms } from '../films/renderFilms';
import { PageArrow } from '../enum/enum';

const nextButton = document.querySelector<Element>('.next-button');
const prevButton = document.querySelector<Element>('.prev-button');
const page = document.querySelector<HTMLElement>('.number-page');

let numberPage = 1;

nextButton?.addEventListener('click', () => pagination(PageArrow.Next));
prevButton?.addEventListener('click', () => pagination(PageArrow.Prev));

/**
 * Pagination.
 * @param pageArrow Page arrow.
 */
export async function pagination(pageArrow: PageArrow): Promise<void> {
  if (
    (pageArrow === PageArrow.Next && lastDocFilm === null) ||
    (pageArrow === PageArrow.Prev && numberPage === 1)
  ) {
    return;
  }
  await renderFilms(pageArrow).then(() => {
    editNumberPage(pageArrow);
    updateВuttonsPagination();
  });
}

/**
 * Edit number page.
 * @param pageArrow Page arrow.
 */
export function editNumberPage(pageArrow: PageArrow): void {
  if (pageArrow === PageArrow.Next) {
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
