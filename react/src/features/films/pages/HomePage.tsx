import { VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';
import { signOut } from 'src/store/user/dispatchers';
import { useNavigate } from 'react-router-dom';

export const HomePage: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const handleLogout = (): void => {
    dispatch(signOut())
      .then(() => navigate('/login'));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SW-FILMS
          </Typography>
          <Typography>{user.user ? user.user.email : ''}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            SIGN OUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
