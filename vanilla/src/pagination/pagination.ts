import { lastDocFilm, renderFilms } from '../films/renderFilms';
import { PageArrow } from '../enum/enum';

const nextBtn = document.querySelector<Element>('.nextBtn');
const prevBtn = document.querySelector<Element>('.prevBtn');
const page = document.querySelector<HTMLElement>('.numberPage > a');

let numberPage = 1;

nextBtn?.addEventListener('click', () => pagination(PageArrow.Next));
prevBtn?.addEventListener('click', () => pagination(PageArrow.Prev));

/**
 * Pagination.
 * @param {PageArrow} pageArrow Page arrow.
 */
export async function pagination(pageArrow: PageArrow): Promise<void> {
  if (
    (pageArrow === PageArrow.Next && lastDocFilm === null) ||
    (pageArrow === PageArrow.Prev && lastDocFilm !== null)
  ) {
    return;
  }
  await renderFilms(pageArrow).then(() => {
    editNumberPage(pageArrow);
  });
}

/**
 * Edit number page.
 * @param {PageArrow} pageArrow Page arrow.
 */
export function editNumberPage(pageArrow: PageArrow): void {
  if (pageArrow === PageArrow.Next) {
    if (page?.textContent) {
      numberPage++;
      page.textContent = numberPage.toString();
    }
  } else if (page?.textContent) {
    numberPage--;
    page.textContent = numberPage.toString();
  }
}
