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
      if(state.favorite.find((item)=>item.imdbID === action.payload.imdbID)){
        alert('The movie has already been added to your favorites')
        return
      }
      state.favorite = [...state.favorite,action.payload]
    },
    deleteFavorite: (state, action) => {
      console.log('zzvc',action.payload)
      state.favorite = state.favorite.filter((item)=>item.imdbID!== action.payload.imdbID)
    },
   
  },
});

export const { addMovie,addValue,toogleEmpty ,addFavorite,deleteFavorite} = sliceMovie.actions;
export default sliceMovie.reducer;