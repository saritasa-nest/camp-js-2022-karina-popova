import { VFC } from 'react';
import List from '@mui/material/List';
import { Film } from 'src/models/film';
import { FilmItem } from '../film/Film';

interface Props {
  /** Films. */
  readonly films: Film[];
}

const FilmsComponent: VFC<Props> = ({ films }) => (
  <List>
    {films.map(film => <FilmItem key={film.id} film={film} />)}
  </List>
);

export const Films = FilmsComponent;
