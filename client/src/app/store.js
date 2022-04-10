import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipesSlice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
