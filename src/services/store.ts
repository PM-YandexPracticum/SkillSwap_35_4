import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  type TypedUseSelectorHook,
} from 'react-redux';
import { authReducer } from './authSlice/authSlice';
import { filterReducer } from './filterSlice/flterSlice';
import { skillsReducer } from './skillsSlice/skillsSlice';
import { usersReducer } from './usersSlice/usersSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  skills: skillsReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppDispatch = () => useDispatch();

export default store;
