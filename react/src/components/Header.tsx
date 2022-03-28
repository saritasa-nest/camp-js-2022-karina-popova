import React, { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { signOut } from 'src/store/user/dispatchers';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';
import { searching } from 'src/store/films/slice';
import { DebounceInput } from 'react-debounce-input';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export const Header: VFC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const handleLogout = (): void => {
    dispatch(signOut());
  };
  const handleChange = (e: React.FormEvent): void => {
    dispatch(searching((e.target as HTMLInputElement).value));
  };
  const userMenu = user ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>{user.email}</Typography>
      <Button color="inherit" onClick={handleLogout} variant="outlined">
        SIGN OUT
      </Button>
    </Box>
  ) : (
    <Link
      color="inherit"
      to="login"
    >
      Login
    </Link>
  );
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          SW-FILMS
        </Typography>
        <DebounceInput
          type="text"
          element={TextField}
          debounceTimeout={500}
          onChange={handleChange}
          placeholder="Search…"
        />
        {userMenu}
      </Toolbar>
    </AppBar>
  );
};
