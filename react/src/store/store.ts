import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { userSlice } from './user/slice';
import { filmsSlice } from './films/slice';
import { planetsSlice } from './planet/slice';
import { charactersSlice } from './character/slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    films: filmsSlice.reducer,
    planets: planetsSlice.reducer,
    character: charactersSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // We need to disable this check to allow ES6 classes in Redux.
    // You can find more info about this middleware in docs:
    // https://redux-toolkit.js.org/api/serializabilityMiddleware
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
