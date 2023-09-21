import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';





const initialState  = {
  films: [],
  value : '',
  empty: false,
  favorite:[],

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
    },
    addFavorite: (state, action) => {
      state.favorite = [...state.favorite,action.payload]
    },
   
  },
});

export const { addMovie,addValue,toogleEmpty ,addFavorite} = sliceMovie.actions;
export default sliceMovie.reducer;