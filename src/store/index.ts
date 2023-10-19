import  sliceMovie  from './sliceMovie';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AddCommentApi, AddRatingApi, LoginApi, MovieApi, MovieApiOne,MovieApiPopular,RegistrApi,auth,fetchCommentApi,fetchRatingApi,getUser,info,renameApi,repassApi,similarApi,torrentApi,trailerApi } from './MovieApi'; 


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
    [MovieApi.reducerPath]: MovieApi.reducer,
    [MovieApiOne.reducerPath]: MovieApiOne.reducer,
    [trailerApi.reducerPath]: trailerApi.reducer,
    [fetchCommentApi.reducerPath]: fetchCommentApi.reducer,
    [AddCommentApi.reducerPath]: AddCommentApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [RegistrApi.reducerPath]: RegistrApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [fetchRatingApi.reducerPath]: fetchRatingApi.reducer,
    [AddRatingApi.reducerPath]: AddRatingApi.reducer,
    [renameApi.reducerPath]: renameApi.reducer,
    [similarApi.reducerPath]: similarApi.reducer,
    [torrentApi.reducerPath]: torrentApi.reducer,
    [MovieApiPopular.reducerPath]: MovieApiPopular.reducer,
    [repassApi.reducerPath]: repassApi.reducer,
    [info.reducerPath]: info.reducer,
    [getUser.reducerPath]: getUser.reducer,
    sliceMovie,
});


const persistConfig = {
  key: 'root',
  storage,
  blacklist:['toggleDropdown',getUser.reducerPath,info.reducerPath,repassApi.reducerPath,MovieApi.reducerPath,MovieApiPopular.reducerPath,torrentApi.reducerPath,similarApi.reducerPath,renameApi.reducerPath,AddRatingApi.reducerPath,fetchRatingApi.reducerPath,MovieApiOne.reducerPath,trailerApi.reducerPath,fetchCommentApi.reducerPath,AddCommentApi.reducerPath,LoginApi.reducerPath,RegistrApi.reducerPath,auth.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(getUser.middleware,info.middleware,repassApi.middleware,MovieApiPopular.middleware,torrentApi.middleware,similarApi.middleware,renameApi.middleware,AddRatingApi.middleware,fetchRatingApi.middleware,RegistrApi.middleware,auth.middleware,LoginApi.middleware,MovieApi.middleware,MovieApiOne.middleware,trailerApi.middleware,fetchCommentApi.middleware,AddCommentApi.middleware);
    },
});

setupListeners(store.dispatch)

export const persiter = persistStore(store);
export type TypeRootState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
