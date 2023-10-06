import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';





const initialState  = {
  films: [],
  value : '',
  empty: false,
  favorite:[],
  darkMode: false,
  render: false,
  avatar: 'https://innostudio.de/fileuploader/images/default-avatar.png'

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
    darkMode:(state)=>{
      state.darkMode = !state.darkMode;
    },
    toggleRender:(state)=>{
      state.render = true
    },
    switchAvatar:(state,action)=>{
      state.avatar = action.payload;
    }
   
  },
});

export const { addMovie,addValue,toogleEmpty ,addFavorite,deleteFavorite,darkMode,toggleRender,switchAvatar} = sliceMovie.actions;
export default sliceMovie.reducer;