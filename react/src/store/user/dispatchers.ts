import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserMapper } from 'src/api/mappers/user.mapper';
import { AuthService } from 'src/api/services/auth.service';

/** Value for login ang register. */
interface ValueForAuth {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
}

export const signInUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: ValueForAuth) => {
    const user = await AuthService.signIn(email, password);
    if (user) {
      return UserMapper.fromDto(user.user);
    }
    return null;
  },
);

export const signUpUser = createAsyncThunk(
  'user/register',
  async ({ email, password }: ValueForAuth) => {
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
