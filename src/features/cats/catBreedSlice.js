import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// The cat API base URL
const baseUrl = 'https://api.thecatapi.com/v1';

// Include API key on header
const requestParams = {
  headers: {
    'x-api-key': '89c72587-01b5-49c0-93ca-263055fb166e',
  },
};

const initialState = {
  data: [],
  status: 'idle',
};

export const getCatBreeds = createAsyncThunk(
  'cats/getCatBreeds',
  async () => {
    // Fetch cat breed list from API
    return fetch(`${baseUrl}/breeds`, requestParams)
      .then((res) => res.json());
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
