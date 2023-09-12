import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';





const initialState  = {
  films: [],
  value :'',

};

export const sliceMovie = createSlice({
  name: 'sliceMovie',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.films = action.payload;
    },
    addValue:(state, action) => {
      state.value = action.payload;
    },
   
  },
});

export const { addMovie,addValue } = sliceMovie.actions;
export default sliceMovie.reducer;