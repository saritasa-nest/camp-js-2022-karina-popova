import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signUpUser, signOut } from './dispatchers';
import { initialUserState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = '';
    },
  },
  extraReducers: builder => builder
    .addCase(signInUser.fulfilled, (state, { payload }) => {
      state.error = '';
      state.user = payload;
      state.isAuthenticated = true;
    })
    .addCase(signInUser.rejected, (state, action) => {
      state.user = null;
      if (action.error.code) {
        state.error = action.error.code;
      }
      state.isAuthenticated = false;
    })
    .addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.error = '';
      state.user = payload;
      state.isAuthenticated = true;
    })
    .addCase(signUpUser.rejected, (state, action) => {
      state.user = null;
      if (action.error.code) {
        state.error = action.error.code;
      }
      state.isAuthenticated = false;
    })
    .addCase(signOut.fulfilled, state => {
      state.user = null;
      state.isAuthenticated = false;
    }),
});

export const { resetUser } = userSlice.actions;
