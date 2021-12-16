import catsReducer, {
  getCatBreeds,
  getCatsByBreed,
  getCatById,
  getNextCatsByBreed,
} from './catsSlice';

const initialState = {
  breeds: {
    data: [],
    status: 'idle',
  },
  breed: {
    id: null,
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

describe('cat reducer', () => {
  it('should handle initial state', () => {
    expect(catsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('getCatBreeds', () => {
  it('should handle getCatBreeds pending', () => {
    const action = {
      type: getCatBreeds.pending.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.breeds).toEqual({
      data: [],
      status: 'loading',
    });
  });

  it('should handle getCatBreeds fulfilled', () => {
    const action = {
      type: getCatBreeds.fulfilled.type,
      payload: [
        { id: 1 },
        { id: 2 },
      ]
    };

    const state = catsReducer(initialState, action);

    expect(state.breeds).toEqual({
      data: [
        { id: 1 },
        { id: 2 },
      ],
      status: 'success',
    });
  });

  it('should handle getCatBreeds rejected', () => {
    const action = {
      type: getCatBreeds.rejected.type,
      payload: [
        { id: 1 },
        { id: 2 },
      ]
    };

    const state = catsReducer(initialState, action);

    expect(state.breeds).toEqual({
      data: [],
      status: 'failed',
    });
  });
});

describe('getCatsByBreed', () => {
  it('should handle getCatsByBreed pending', () => {
    const action = {
      type: getCatsByBreed.pending.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      id: null,
      data: [],
      status: 'loading',
    }));
  });

  it('should handle getCatsByBreed fulfilled', () => {
    const action = {
      type: getCatsByBreed.fulfilled.type,
      payload: {
        data: 'something',
        totalCount: 10
      },
      meta: {
        arg: 'breed',
      },
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: 'something',
      id: 'breed',
      page: 1,
      totalCount: 10,
      status: 'success',
    }));
  });

  it('should fail getCatsByBreed if the fulfilled payload count is 0', () => {
    const action = {
      type: getCatsByBreed.fulfilled.type,
      payload: {
        data: [],
        totalCount: 0
      },
      meta: {
        arg: 'breed',
      },
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: [],
      id: 'breed',
      page: 1,
      totalCount: 0,
      status: 'failed',
    }));
  });

  it('should handle getCatsByBreed rejected', () => {
    const action = {
      type: getCatsByBreed.rejected.type,
      meta: {
        arg: 'breed',
      },
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: [],
      id: null,
      totalCount: 0,
      status: 'failed',
    }));
  });
});

describe('getNextCatsByBreed', () => {
  it('should handle getNextCatsByBreed pending', () => {
    const action = {
      type: getNextCatsByBreed.pending.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: [],
      newCatCount: 0,
      pagerStatus: 'loading',
    }));
  });

  it('should handle getNextCatsByBreed fulfilled', () => {
    const action = {
      type: getNextCatsByBreed.fulfilled.type,
      payload: {
        data: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
        page: 2,
        totalCount: 10
      },
      meta: {
        arg: 'breed',
      },
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      page: 2,
      newCatCount: 3,
      pagerStatus: 'success',
    }));
  });

  it('should handle getNextCatsByBreed fulfilled merged data', () => {
    const action = {
      type: getNextCatsByBreed.fulfilled.type,
      payload: {
        data: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
        page: 2,
        totalCount: 10
      },
      meta: {
        arg: 'breed',
      },
    };

    const state = catsReducer({
      ...initialState, ...{
        breed: {
          id: 'my-breed',
          data: [
            { id: 1 },
            { id: 2 },
          ],
          status: 'idle',
          page: 1,
          totalCount: 10,
          newCatCount: 0,
          pagerStatus: 'idle',
        }
      }
    }, action);

    expect(state.breed).toEqual(expect.objectContaining({
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      page: 2,
      newCatCount: 1,
      pagerStatus: 'success',
    }));
  });

  it('should handle getNextCatsByBreed rejected', () => {
    const action = {
      type: getNextCatsByBreed.rejected.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.breed).toEqual(expect.objectContaining({
      pagerStatus: 'failed',
    }));
  });
});

describe('getCatById', () => {
  it('should handle getCatById pending', () => {
    const action = {
      type: getCatById.pending.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.cat).toEqual({
      data: null,
      status: 'loading',
    });
  });

  it('should handle getCatById fulfilled', () => {
    const action = {
      type: getCatById.fulfilled.type,
      payload: {
        id: 'my-cat'
      }
    };

    const state = catsReducer(initialState, action);

    expect(state.cat).toEqual({
      data: {
        id: 'my-cat'
      },
      status: 'success',
    });
  });

  it('should handle getCatById rejected', () => {
    const action = {
      type: getCatById.rejected.type,
    };

    const state = catsReducer(initialState, action);

    expect(state.cat).toEqual({
      data: null,
      status: 'failed',
    });
  });
});
