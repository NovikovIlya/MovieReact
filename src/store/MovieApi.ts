import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieApiOneType, MovieArray, Root2, RootYts, TrailerApi, argType, login,  ratingType,  tokenType } from '../types';

export const MovieApiPopular = createApi({
  reducerPath: 'apiMoviesPopular',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2' }),
  tagTypes: ['apiMoviesPopular'],
  endpoints: (builder) => ({
    fetchMoviesPopular: builder.query<RootYts, string>({
      query: (search) => ({
        url: `list_movies.json?${search}`,
      }),
    }),
  }),
});


export const MovieApi = createApi({
  reducerPath: 'apiMovies',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com' }),
  tagTypes: ['Fetch'],
  endpoints: (builder) => ({
    fetchMovies: builder.query<MovieArray, string>({
      query: (search) => ({
        url: `?apikey=55ce87c0&s=${search}`,
      }),
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
    fetcTrailer: builder.query<TrailerApi, string>({
      query: (id) => ({
        url: `movies?imdb_id=${id}`,
      }),
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
    }),
  }),
});

export const fetchRatingApi = createApi({
  reducerPath: 'fetchRating',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/items' }),
  tagTypes: ['fetchRating'],
  endpoints: (builder) => ({
    fetchRating: builder.query<ratingType[], string>({
      query: (id) => ({
        url: `?imdbid=${id}`,
      }),
    }),
  }),
});

export const similarApi = createApi({
  reducerPath: 'similar',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
  tagTypes: ['similar'],
  endpoints: (builder) => ({
    similarFetch: builder.query<any, any>({
      query: (genre) => ({
        url: `list_movies.json?genre=${genre}&limit=10`,
      }),
    }),
  }),
});

export const torrentApi = createApi({
  reducerPath: 'torrent',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
  tagTypes: ['torrent'],
  endpoints: (builder) => ({
    torrentFetch: builder.query<any, any>({
      query: (imdb) => ({
        url: `list_movies.json?query_term=${imdb}`,
      }),
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
    LoginApiSet: builder.mutation<tokenType, login>({
      query: (add) => ({
        method: 'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['LoginApi'],
    }),
  }),
});

export const renameApi = createApi({
  reducerPath: 'rename',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backmovie.onrender.com/auth/rename' }),
  tagTypes: ['rename'],
  endpoints: (builder) => ({
    renameApiSet: builder.mutation<any, any>({
      query: (add) => ({
        method: 'PUT',
        url: '',
        body: add,
      }),
      invalidatesTags: ['rename'],
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
export const {useRenameApiSetMutation} = renameApi
export const {useSimilarFetchQuery} = similarApi
export const {useTorrentFetchQuery} = torrentApi
export const {useFetchMoviesPopularQuery} = MovieApiPopular
