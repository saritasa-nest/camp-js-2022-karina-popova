import { useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { selectPlanets, selectIsLoading } from 'src/store/planet/selectors';
import { fetchPlanetsById } from 'src/store/planet/dispatchers';
import { fetchCharactersById } from 'src/store/character/dispatchers';
import { selectFilm } from 'src/store/films/selectors';
import { selectCharacters, selectCharactersIsLoading } from 'src/store/character/selectors';

export const FilmDetails: VFC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(state => selectFilm(state, id ?? ''));
  const planets = useAppSelector(selectPlanets);
  const planetIsLoading = useAppSelector(selectIsLoading);
  const charaters = useAppSelector(selectCharacters);
  const charaterIsLoading = useAppSelector(selectCharactersIsLoading);
  useEffect(() => {
    if (film != null) {
      dispatch(fetchPlanetsById(film.planets));
      dispatch(fetchCharactersById(film.characters));
    }
  }, [dispatch, id, film]);
  if (!film || !planetIsLoading || !charaterIsLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Typography paragraph>
        Title:
        {film?.title}
      </Typography>
      <Typography paragraph>
        Director:
        {film?.director}
      </Typography>
      <Typography paragraph>
        Planets:
        {planets?.map((planet, index) => `${planet.name}${index === planets.length - 1 ? '' : ', '} `)}
      </Typography>
      <Typography paragraph>
        Charaters:
        {charaters?.map((charater, index) => `${charater.name}${index === charaters.length - 1 ? '' : ', '} `)}
      </Typography>
    </>
  );
};
