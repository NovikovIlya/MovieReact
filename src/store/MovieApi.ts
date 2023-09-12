import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'


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

export const {useFetchMoviesQuery} = MovieApi