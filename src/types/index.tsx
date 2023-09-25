export type movieType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};


export type MovieArray={
  Search: MovieApiOneType[],
  totalResult: string,
  Response: boolean,
  Error?: string,
}

export type MovieApiOneType = {
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
export type argType = {
  id: string,
  title?: string,
  year?: string,
}


export type Root2 =  {
  body: Body[]
  id?: string
  imdbid?: string
}

export type Body = {
  postId: number
  name: string
  text: string
}


export type TrailerApi = {
  id: string
  tmdb_id: number
  imdb_id: string
  language: string
  title: string
  url: string
  trailer: Trailer
  videos: Video[],
  error?: string,
  status?: string,
}

export type Trailer = {
  id: string
  youtube_video_id: string
  youtube_channel_id: string
  youtube_thumbnail: string
  title: string
  thumbnail: string
  language: string
  categories: string[]
  published: string
  views: number
}

export type Video =  {
  id: string
  youtube_video_id: string
  youtube_channel_id: string
  youtube_thumbnail: string
  title: string
  thumbnail: string
  language: string
  categories: string[]
  published: string
  views: number
}

export type login ={
  username : string,
  password: string,
}