import { useEffect, VFC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import { SortDirection } from 'src/utils/enums';
import { DEFAULT_LIMIT_FILMS, DEFAULT_PATH_FILMS, DEFAULT_SORTING_FIELD } from 'src/utils/constants';
import { sorting } from 'src/store/films/slice';
import { Films } from '../components/films/Films';

const drawerWidth = 250;
export const HomePage: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectFilms);
  const lastFilmOnPage = useAppSelector(selectlastFilmsOnPage);
  const sortDirection = useAppSelector(selectSort);
  const searchValue = useAppSelector(selectSearchValue);
  const handleChange = (event: SelectChangeEvent): void => {
    dispatch(sorting(event.target.value as SortDirection));
  };
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
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          <Outlet />
        </Typography>
      </Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Sort films</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sortDirection}
            onChange={handleChange}
          >
            <MenuItem value={SortDirection.Asc}>A-Z</MenuItem>
            <MenuItem value={SortDirection.Desc}>Z-A</MenuItem>
          </Select>
        </FormControl>
        <Box onScroll={handleScroll} sx={{ overflow: 'auto' }}>
          <Films films={films} />
        </Box>
      </Drawer>
    </Box>
  );
};
