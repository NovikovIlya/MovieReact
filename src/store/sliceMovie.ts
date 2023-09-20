import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';





const initialState  = {
  films: [],
  value : '',
  empty: false,

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
    toogleEmpty:(state,action)=>{
      state.empty = action.payload;
    }
   
  },
});

export const { addMovie,addValue,toogleEmpty } = sliceMovie.actions;
export default sliceMovie.reducer;