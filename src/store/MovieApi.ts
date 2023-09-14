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

export const MovieApi = createApi({
    reducerPath: 'apiMovies',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
    tagTypes: ['Fetch'],
    endpoints: (builder) => ({
      fetchMovies: builder.query<any, any>({
        query: (search) => ({
          url: `?apikey=55ce87c0&s=${search}`,
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

        // headers:{
        //   'Content-Type': 'application/json;charset=utf-8'
        // },
      }),
      providesTags: result => ['trailerApi']
    }),
  }),
})

export const {useFetchMoviesQuery} = MovieApi
export const {useFetchMoviesOneQuery} = MovieApiOne
export const {useFetcTrailerQuery} = trailerApi
