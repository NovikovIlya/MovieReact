import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApiOneType, MovieArray, Root2, TrailerApi, argType, login } from '../types';

export const MovieApi = createApi({
  reducerPath: 'apiMovies',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com' }),
  tagTypes: ['Fetch'],
  endpoints: (builder) => ({
    fetchMovies: builder.query<MovieArray, string>({
      query: (search) => ({
        url: `?apikey=55ce87c0&s=${search}`,
      }),
      // providesTags: result => ['Fetch']
    }),
  }),
});

export const MovieApiOne = createApi({
  reducerPath: 'MovieApiOne',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  tagTypes: ['FetchMovie'],
  endpoints: (builder) => ({
    fetchMoviesOne: builder.query<MovieApiOneType, argType>({
      query: (arg) => ({
        url: `?apikey=55ce87c0&i=${arg.id}`,
      }),
      // providesTags: result => ['FetchMovie']
    }),
  }),
});

export const trailerApi = createApi({
  reducerPath: 'trailerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.allorigins.win/raw?url=https://api.kinocheck.de/',
  }),
  tagTypes: ['trailerApi'],
  endpoints: (builder) => ({
    fetcTrailer: builder.query<TrailerApi, argType>({
      query: (arg) => ({
        url: `movies?imdb_id=${arg.id}`,
      }),
      // providesTags: result => ['trailerApi']
    }),
  }),
});

export const fetchCommentApi = createApi({
  reducerPath: 'fetchComment',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/comment' }),
  tagTypes: ['fetchComment'],
  endpoints: (builder) => ({
    fetchComment: builder.query<Root2[], string>({
      query: (id) => ({
        url: `?imdbid=${id}`,
      }),
      // providesTags: result => ['fetchComment']
    }),
  }),
});

export const fetchRatingApi = createApi({
  reducerPath: 'fetchRating',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/items' }),
  tagTypes: ['fetchRating'],
  endpoints: (builder) => ({
    fetchRating: builder.query<any, any>({
      query: (id) => ({
        url: `?imdbid=${id}`,
      }),
      // providesTags: result => ['fetchComment']
    }),
  }),
});

export const AddCommentApi = createApi({
  reducerPath: 'AddComment',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/comment/' }),
  tagTypes: ['AddComment'],
  endpoints: (builder) => ({
    AddComment: builder.mutation<Root2, Root2>({
      query: (add) => ({
        method: 'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['AddComment'],
    }),
  }),
});

export const AddRatingApi = createApi({
  reducerPath: 'AddRating',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/items/' }),
  tagTypes: ['AddRating'],
  endpoints: (builder) => ({
    AddRating: builder.mutation<any, any>({
      query: (add) => ({
        method: 'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['AddRating'],
    }),
  }),
});

export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backmovie.onrender.com/auth/login' }),
  tagTypes: ['LoginApi'],
  endpoints: (builder) => ({
    LoginApiSet: builder.mutation<login, login>({
      query: (add) => ({
        method: 'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['LoginApi'],
    }),
  }),
});

export const RegistrApi = createApi({
  reducerPath: 'RegistrApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backmovie.onrender.com/auth/registrationNew' }),
  tagTypes: ['RegistrApi'],
  endpoints: (builder) => ({
    RegistrApiSet: builder.mutation<login, login>({
      query: (add) => ({
        method: 'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['RegistrApi'],
    }),
  }),
});

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backmovie.onrender.com/auth/me',
    prepareHeaders: (headers, { getState }) => {
      headers.set('authorization', `Bearer ${window.localStorage.getItem('token')}`);
      return headers;
    },
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    authApi: builder.query<login, string>({
      query: () => ({
        url: '',
      }),
      // providesTags: (result) => ['auth'],
    }),
  }),
});

export const { useFetchMoviesQuery } = MovieApi;
export const { useFetchMoviesOneQuery } = MovieApiOne;
export const { useFetcTrailerQuery } = trailerApi;
export const { useFetchCommentQuery } = fetchCommentApi;
export const { useAddCommentMutation } = AddCommentApi;
export const { useLoginApiSetMutation } = LoginApi;
export const { useRegistrApiSetMutation } = RegistrApi;
export const { useAuthApiQuery, useLazyAuthApiQuery } = auth;
export const { useFetchRatingQuery} = fetchRatingApi
export const {useAddRatingMutation} = AddRatingApi
