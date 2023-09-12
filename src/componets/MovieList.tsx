import React from 'react';
import { movieType } from '../App';

interface MovieListProps {
    movie: movieType[];
  }

const MovieList = ({ movie } : MovieListProps) => {
  console.log(movie);
  // if (!movie){
  //   return <h1>Идет загрузка...</h1>
  // }
  return (
    <>
      {movie?.map((item) => {
        return (
          <div className='rowChild f-flex justify-content-start m-3'>
            <div>{item.Title}</div>
            <img key={item.imdbID} src={item.Poster} alt='no'/>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
