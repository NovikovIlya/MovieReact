import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type MovieApiOneType = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export type Rating = {
  Source: string
  Value: string
}

type argType = {
  id: string,
}



export interface Root2 {
  body: Body[]
  id: string
  imdbid?: string
}

export interface Body {
  postId: number
  name: string
  text: string
}

export const MovieApi = createApi({
    reducerPath: 'apiMovies',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    tagTypes: ['Fetch'],
    endpoints: (builder) => ({
      fetchMovies: builder.query<any, any>({
        query: (search) => ({
         url: `?apikey=55ce87c0&s=${search}`,
          // url: `${search ? `${`?apikey=55ce87c0&s=${search}`}` : `${`?apikey=55ce87c0&y=2023&s=all`}`}`,
        }),
        providesTags: result => ['Fetch']
      }),
    }),
})

export const MovieApiOne = createApi({
  reducerPath: 'MovieApiOne',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  tagTypes: ['FetchMovie'],
  endpoints: (builder) => ({
    fetchMoviesOne: builder.query<MovieApiOneType, argType>({
      query: (arg) => ({
        url: `?apikey=55ce87c0&i=${arg.id}`,
      }),
      providesTags: result => ['FetchMovie']
    }),
  }),
})

export const trailerApi = createApi({
  reducerPath: 'trailerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.allorigins.win/raw?url=https://api.kinocheck.de/' }),
  tagTypes: ['trailerApi'],
 
  endpoints: (builder) => ({
    fetcTrailer: builder.query<any, any>({
      query: (arg) => ({
        url: `movies?imdb_id=${arg.id}`,
      }),
      providesTags: result => ['trailerApi']
    }),
  }),
})

export const fetchCommentApi = createApi({
  reducerPath: 'fetchComment',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/comment' }),
  tagTypes: ['fetchComment'],
  endpoints: (builder) => ({
    fetchComment: builder.query<Root2[], string>({
      query: (id) => ({
        url: `?imdbid=${id}`,
      }),
      providesTags: result => ['fetchComment']
    }),
  }),
})

export const AddCommentApi = createApi({
  reducerPath: 'AddComment',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/comment/' }),
  tagTypes: ['AddComment'],
  endpoints: (builder) => ({
    AddComment: builder.mutation<any, any>({
      query: (add) => ({
        method:'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['AddComment'],
      
    }),
  }),
})

export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/login' }),
  tagTypes: ['LoginApi'],
  endpoints: (builder) => ({
    LoginApiSet: builder.mutation<any, any>({
      query: (add) => ({
        method:'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['LoginApi'],
      
    }),
  }),
})

export const RegistrApi = createApi({
  reducerPath: 'RegistrApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/registrationNew' }),
  tagTypes: ['RegistrApi'],
  endpoints: (builder) => ({
    RegistrApiSet: builder.mutation<any, any>({
      query: (add) => ({
        method:'POST',
        url: '',
        body: add,
      }),
      invalidatesTags: ['RegistrApi'],
      
    }),
  }),
})

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/me' ,
  prepareHeaders: (headers, { getState }) => { 
      headers.set('authorization', `Bearer ${window.localStorage.getItem('token')}`)
    return headers
  },
}),

  tagTypes: ['auth'],
  endpoints: (builder) => ({
    authApi: builder.query<any, any>({
      query: () => ({
        url: '',
      }),
      providesTags: result => ['auth']
    }),
  }),
})

export const {useFetchMoviesQuery} = MovieApi
export const {useFetchMoviesOneQuery} = MovieApiOne
export const {useFetcTrailerQuery} = trailerApi
export const {useFetchCommentQuery} = fetchCommentApi
export const {useAddCommentMutation} = AddCommentApi
export const {useLoginApiSetMutation} = LoginApi
export const {useRegistrApiSetMutation} = RegistrApi
export const {useAuthApiQuery,useLazyAuthApiQuery} = auth
