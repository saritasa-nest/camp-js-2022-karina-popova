import { useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { fetchFilmById } from 'src/store/films/dispatchers';
import { selectFilm } from 'src/store/films/selectors';

export const FilmDetails: VFC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(state => selectFilm(state, id ?? ''));
  useEffect(() => {
    if (!film) {
      dispatch(fetchFilmById(id ?? ''));
    }
  }, [dispatch, film]);
  return (
    <>
      <Typography paragraph>
        Title:
        {film?.title}
      </Typography>
      <Typography paragraph>
        Planets:
        {film?.planets}
      </Typography>
    </>
  );
};
