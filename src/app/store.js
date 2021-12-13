import { configureStore } from '@reduxjs/toolkit';
import catBreedReducer from '../features/cats/catBreedSlice';

export const store = configureStore({
  reducer: {
    catBreeds: catBreedReducer,
  },
});
