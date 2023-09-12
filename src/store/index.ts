import  sliceMovie  from './sliceMovie';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { MovieApi } from './MovieApi'; 
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
    sliceMovie
  //   [cityApi.reducerPath]: cityApi.reducer,
  //   sliceId,
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
      }).concat(MovieApi.middleware);
    },
});

export const persiter = persistStore(store);
export type TypeRootState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
