import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import catAPI from './catAPI';

const initialState = {
  data: [],
  status: 'idle',
};

export const getCatBreeds = createAsyncThunk(
  'cats/getCatBreeds',
  async () => {
    // Fetch cat breed list from API
    return catAPI.get('breeds')
      .then((res) => res.data);
  }
);

export const catBreedSlice = createSlice({
  name: 'cats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCatBreeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCatBreeds.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.data = payload;
      })
      .addCase(getCatBreeds.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default catBreedSlice.reducer;
