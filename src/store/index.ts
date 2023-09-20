import  sliceMovie  from './sliceMovie';
import { configureStore, combineReducers, createReducer } from '@reduxjs/toolkit';
import { AddCommentApi, LoginApi, MovieApi, MovieApiOne,RegistrApi,auth,fetchCommentApi,trailerApi } from './MovieApi'; 
// import sliceId from './sliceId';

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
    sliceMovie

});


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(RegistrApi.middleware,auth.middleware,LoginApi.middleware,MovieApi.middleware,MovieApiOne.middleware,trailerApi.middleware,fetchCommentApi.middleware,AddCommentApi.middleware);
    },
});

export const persiter = persistStore(store);
export type TypeRootState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
