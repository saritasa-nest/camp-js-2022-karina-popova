import { useEffect, VFC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectFilms,
  selectlastFilmsOnPage,
  selectSearchValue,
  selectSort,
} from 'src/store/films/selectors';
import { Outlet } from 'react-router-dom';
import { fetchFilms } from 'src/store/films/dispatchers';
import { Header } from 'src/components/Header';
import { DEFAULT_LIMIT_FILMS, DEFAULT_PATH_FILMS, DEFAULT_SORTING_FIELD } from 'src/utils/constants';
import { Films } from '../components/films/Films';
import { SortFilms } from '../components/sorting/Sort';

const drawerWidth = 250;
export const HomePage: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectFilms);
  const lastFilmOnPage = useAppSelector(selectlastFilmsOnPage);
  const sortDirection = useAppSelector(selectSort);
  const searchValue = useAppSelector(selectSearchValue);
  useEffect(() => {
    dispatch(fetchFilms({
      path: DEFAULT_PATH_FILMS,
      limitDocs: DEFAULT_LIMIT_FILMS,
      orderByField: DEFAULT_SORTING_FIELD,
      direction: sortDirection,
      lastDoc: lastFilmOnPage,
      searchValue,
    }));
  }, [dispatch, sortDirection, searchValue]);

  const handleScroll = (e: React.UIEvent): void => {
    const element = e.target as HTMLElement;
    if (element.scrollTop + element.offsetHeight + 1 >= element.scrollHeight
      && lastFilmOnPage) {
      dispatch(fetchFilms({
        path: DEFAULT_PATH_FILMS,
        limitDocs: DEFAULT_LIMIT_FILMS,
        orderByField: DEFAULT_SORTING_FIELD,
        direction: sortDirection,
        lastDoc: lastFilmOnPage,
        searchValue,
      }));
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <SortFilms />
        <Box onScroll={handleScroll} sx={{ overflow: 'auto' }}>
          <Films films={films} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
