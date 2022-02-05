import { Film } from './film';
/**
 * Get films catalog pattern.
 * @param catalogFilms Array catalog films.
 * @returns {string} Films list.
 */
export function getPatternFilms(catalogFilms: Film[]): string {
  return catalogFilms
    .map(
      (film) => `
        <tr>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td>${film.created}</td>
        </tr>`
    )
    .join('');
}
