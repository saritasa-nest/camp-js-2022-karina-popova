import { VFC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Film } from 'src/models/film';
import { Link } from 'react-router-dom';

interface Props {
  /** Film. */
  readonly film: Film;
}

const FilmComponent: VFC<Props> = ({ film }) => (
  <Link to={`${film.id}`}>
    <ListItem button>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={film.title} />
    </ListItem>
  </Link>
);

export const FilmItem = FilmComponent;
