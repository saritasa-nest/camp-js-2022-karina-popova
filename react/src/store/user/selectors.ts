import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user from store. */
export const selectUser = createSelector((state: RootState) => state.user, user => user);

/** Selects the user is authorized from store. */
export const selectIsAuth = createSelector((state: RootState) => state.user, user => user.isAuthenticated);

/** Selects authorization error. */
export const selectUserError = createSelector((state: RootState) => state.user, user => user.error);
