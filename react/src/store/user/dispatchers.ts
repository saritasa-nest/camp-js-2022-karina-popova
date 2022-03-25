import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserMapper } from 'src/api/mappers/user.mapper';
import { AuthService } from 'src/api/services/auth.service';
import { AuthForm } from 'src/models/authorization-form';

export const signInUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: AuthForm) => {
    const user = await AuthService.signIn(email, password);
    if (user) {
      return UserMapper.fromDto(user.user);
    }
    return null;
  },
);

export const signUpUser = createAsyncThunk(
  'user/register',
  async ({ email, password }: AuthForm) => {
    const user = await AuthService.signUp(email, password);
    if (user) {
      return UserMapper.fromDto(user.user);
    }
    return null;
  },
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  await AuthService.logOut();
});

export const fetchCurrentUser = createAsyncThunk('user/fetchUser', async () => {
  const user = await AuthService.fetchCurrentUser();
  if (user) {
    return UserMapper.fromDto(user);
  }
  return null;
});
