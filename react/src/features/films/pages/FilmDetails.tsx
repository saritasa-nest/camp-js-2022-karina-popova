import { VFC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectFilm } from 'src/store/films/selectors';
import { useAppSelector } from 'src/store/store';

export const FilmDetails: VFC = () => {
  const { id } = useParams();
  const film = useAppSelector((state) =>
    selectFilm.selectById(state, params.id)
  );
  return (
    <div>{film.title}</div>
  );
};
