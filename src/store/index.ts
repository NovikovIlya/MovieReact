import  sliceMovie  from './sliceMovie';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AddCommentApi, AddRatingApi, LoginApi, MovieApi, MovieApiOne,RegistrApi,auth,fetchCommentApi,fetchRatingApi,trailerApi } from './MovieApi'; 


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
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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
    sliceMovie

});


const persistConfig = {
  key: 'root',
  storage,
  blacklist:[AddRatingApi.reducerPath,fetchRatingApi.reducerPath,MovieApiOne.reducerPath,trailerApi.reducerPath,fetchCommentApi.reducerPath,AddCommentApi.reducerPath,LoginApi.reducerPath,RegistrApi.reducerPath,auth.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(AddRatingApi.middleware,fetchRatingApi.middleware,RegistrApi.middleware,auth.middleware,LoginApi.middleware,MovieApi.middleware,MovieApiOne.middleware,trailerApi.middleware,fetchCommentApi.middleware,AddCommentApi.middleware);
    },
});

export const persiter = persistStore(store);
export type TypeRootState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
