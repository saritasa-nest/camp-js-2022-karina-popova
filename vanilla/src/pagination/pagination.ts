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
    disabledВutton();
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
export function disabledВutton(): void {
  if (numberPage === 1) {
    prevBtn?.classList.add('disabled');
    prevBtn?.classList.remove('waves-effect');
  } else {
    prevBtn?.classList.remove('disabled');
    prevBtn?.classList.add('waves-effect');
  }
  if (lastDocFilm !== null) {
    nextBtn?.classList.add('waves-effect');
    nextBtn?.classList.remove('disabled');
  } else {
    nextBtn?.classList.remove('waves-effect');
    nextBtn?.classList.add('disabled');
  }
}
