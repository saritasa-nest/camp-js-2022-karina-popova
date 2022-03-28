import { VFC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Film } from 'src/models/film';
import { FilmItem } from '../film/Film';

interface Props {
  /** Films. */
  readonly films: Film[];
}

const FilmsComponent: VFC<Props> = ({ films }) => (
  <List>
    {films.map(film => <FilmItem key={film.id} film={film} />)}
    <ListItem button key={1}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary="test" />
    </ListItem>
    <ListItem button key={2}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary="test" />
    </ListItem>
    <ListItem button key={3}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary="test" />
    </ListItem>
  </List>
);

export const Films = FilmsComponent;
