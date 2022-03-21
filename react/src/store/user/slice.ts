import { createSlice } from '@reduxjs/toolkit';
import { initialUserState } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
