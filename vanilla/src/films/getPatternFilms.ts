import { Film } from './film';

/**
 * Get films catalog pattern.
 * @param catalogFilms Array catalog films.
 * @returns Films list.
 */
export function getPatternFilms(catalogFilms: Film[]): string {
  return catalogFilms
    .map(
      film => `
        <tr>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td>${film.created.toLocaleDateString('en-GB')}</td>
        </tr>`,
    )
    .join('');
}
