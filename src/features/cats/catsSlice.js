import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import catAPI from './catAPI';

const initialState = {
  breeds: {
    data: [],
    status: 'idle',
  },
  cats: {
    data: [],
    status: 'idle',
  },
  cat: {
    data: null,
    status: 'idle',
  },
};

export const getCatBreeds = createAsyncThunk(
  'cats/getCatBreeds',
  async () => {
    // Fetch cat breed list from API
    return catAPI.get('breeds')
      .then((res) => res.data);
  }
);

export const getCatsByBreed = createAsyncThunk(
  'cats/getCatsByBreed',
  async (breed) => {
    // Fetch cat list by breed from API
    return catAPI.get('images/search', {
      params: {
        breed_id: breed,
        page: 1,
        limit: 6,
      },
      cache: {
        exclude: { query: false }
      }
    }).then((res) => res.data);
  }
);

export const getCatById = createAsyncThunk(
  'cats/getCatById',
  async (catId) => {
    // Fetch cat details by catId from API
    return catAPI.get(`images/${catId}`).then((res) => res.data);
  }
);

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCatBreeds.pending, (state) => {
        state.breeds.data = [];
        state.breeds.status = 'loading';
      })
      .addCase(getCatBreeds.fulfilled, (state, { payload }) => {
        state.breeds.data = payload;
        state.breeds.status = 'idle';
      })
      .addCase(getCatBreeds.rejected, (state) => {
        state.breeds.data = [];
        state.breeds.status = 'failed';
      })
      .addCase(getCatsByBreed.pending, (state) => {
        state.cats.data = [];
        state.cats.status = 'loading';
      })
      .addCase(getCatsByBreed.fulfilled, (state, { payload }) => {
        // We want to set failed status when the user
        // search for an invalid cat breed.
        // The API does not handle this automatically.
        if (payload.length) {
          state.cats.data = payload;
          state.cats.status = 'idle';
        } else {
          state.cats.data = [];
          state.cats.status = 'failed';
        }
      })
      .addCase(getCatsByBreed.rejected, (state) => {
        state.cats.data = [];
        state.cats.status = 'failed';
      })
      .addCase(getCatById.pending, (state) => {
        state.cat.data = null;
        state.cat.status = 'loading';
      })
      .addCase(getCatById.fulfilled, (state, { payload }) => {
        state.cat.data = payload;
        state.cat.status = 'idle';
      })
      .addCase(getCatById.rejected, (state) => {
        state.cat.data = null;
        state.cat.status = 'failed';
      });
  }
});

export default catsSlice.reducer;
