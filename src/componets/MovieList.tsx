import React from 'react';
import { movieType } from '../App';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCharacteristics from './MovieCharacteristics';
import { Link } from 'react-router-dom';

interface MovieListProps {
  movie: movieType[];
}

const MovieList = ({ movie }: MovieListProps) => {
  const settings = {
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
  };
  console.log(movie);

  return (
    <>
      <Slider {...settings}>
        {movie?.map((item) => {
          return (
            <div className="rowChild f-flex justify-content-start m-3">
              <div>{item.Title}</div>
              <img key={item.imdbID} src={item.Poster} alt="no" />
              <Link to={`${item.imdbID}`}>Перейти</Link>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default MovieList;
