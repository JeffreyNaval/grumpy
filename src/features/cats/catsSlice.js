import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import catAPI from './catAPI';
import { uniqBy, differenceBy } from 'lodash';

const initialState = {
  breeds: {
    data: [],
    status: 'idle',
  },
  cats: {
    breed: null,
    data: [],
    status: 'idle',
    page: 0,
    totalCount: 0,
    newCatCount: 0,
    pagerStatus: 'idle',
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
    }).then((res) => {
      return {
        data: res.data,
        page: parseInt(res.headers['pagination-page']),
        totalCount: parseInt(res.headers['pagination-count']),
      }
    });
  }
);

export const getNextCatsByBreed = createAsyncThunk(
  'cats/getNextCatsByBreed',
  async (payload, { getState }) => {
    const state = getState();

    // Fetch next cat list page by breed from API
    return catAPI.get('images/search', {
      params: {
        breed_id: state.cats.cats.breed,
        page: parseInt(state.cats.cats.page) + 1,
        limit: 6,
      },
      cache: {
        exclude: { query: false }
      }
    }).then((res) => {
      return {
        data: res.data,
        page: parseInt(res.headers['pagination-page']),
        totalCount: parseInt(res.headers['pagination-count']),
      }
    });
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
      .addCase(getCatsByBreed.pending, (state, {meta}) => {
        state.cats.data = [];
        state.cats.status = 'loading';
      })
      .addCase(getCatsByBreed.fulfilled, (state, {payload, meta}) => {
        // We want to set failed status when the user
        // search for an invalid cat breed.
        // The API does not handle this automatically.
        if (payload.totalCount === 0) {
          state.cats.data = [];
          state.cats.status = 'failed';
          return;
        }

        state.cats.data = payload.data;
        state.cats.breed = meta.arg;
        state.cats.page = 1;
        state.cats.totalCount = payload.totalCount;
        state.cats.status = 'success';
      })
      .addCase(getCatsByBreed.rejected, (state) => {
        state.cats.data = [];
        state.cats.status = 'failed';
      })
      .addCase(getNextCatsByBreed.pending, (state) => {
        state.cats.newCatCount = 0;
        state.cats.pagerStatus = 'loading';
      })
      .addCase(getNextCatsByBreed.fulfilled, (state, { payload }) => {
        // The cat API is inconsistent. Sometimes the next
        // page returns the same cat ID. We have to clean up
        // manually and display only cats with unique ID.
        const uniqueCats = uniqBy([...state.cats.data, ...payload.data], 'id');

        // Get the difference of new cat record and old cat record.
        // This way we can determine how many cats are new.
        state.cats.newCatCount = differenceBy(uniqueCats, state.cats.data, 'id').length;

        state.cats.data = uniqueCats;
        state.cats.page = payload.page;
        state.cats.pagerStatus = 'idle';
      })
      .addCase(getNextCatsByBreed.rejected, (state) => {
        state.cats.pagerStatus = 'failed';
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
