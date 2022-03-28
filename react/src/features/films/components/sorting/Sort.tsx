import { VFC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { selectSort } from 'src/store/films/selectors';
import { sorting } from 'src/store/films/slice';
import MenuItem from '@mui/material/MenuItem';
import { SortDirection } from 'src/utils/enums';

const SortFilmsComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const sortDirection = useAppSelector(selectSort);
  const handleChange = (event: SelectChangeEvent): void => {
    dispatch(sorting(event.target.value as SortDirection));
  };
  return (
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
  );
};
export const SortFilms = SortFilmsComponent;
