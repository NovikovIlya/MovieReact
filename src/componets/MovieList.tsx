import React, { useEffect } from 'react';
import { movieType } from '../App';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCharacteristics from './MovieCharacteristics';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.scss';
import { Button, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import sliceMovie from '../store/sliceMovie';
import { toogleEmpty } from '../store/sliceMovie';
import { addFavorite } from '../store/sliceMovie';

interface MovieListProps {
  movie: movieType[];
}

const content = (
  <div>
    <p>Add to favorites</p>
  </div>
);

const MovieList = ({ movie }: MovieListProps) => {
  const dispatch = useAppDispatch();
  const empty = useAppSelector((state) => state.sliceMovie.empty);
  const favorite = useAppSelector((state) => state.sliceMovie.favorite);
  const settings = {
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
  };
  const settings2 = {
    centerMode: true,
    slidesToShow: 1,
    speed: 500,
  };
  const addFavoriteFnc = (item) => {
    console.log('item', item);
    dispatch(addFavorite(item));
  };

  useEffect(() => {
    if (movie) {
      if (movie.length === 0) {
        dispatch(toogleEmpty(true));
      }
    }
  }, []);
  //@ts-ignore
  if (!movie || movie == 'all') {
    return <p>Movie not found!</p>;
  }

  return (
    <>
      <Slider {...settings}>
        {movie.length > 0 &&
          movie.map((item) => {
            return (
              <div className="rowChild f-flex justify-content-start m-3">
                <div className={styles.text}>{item.Title}</div>
                <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
                <Link to={`${item.imdbID}`}>
                  <Button>Перейти</Button>
                </Link>
                <Popover content={content} title="Title">
                  <Button onClick={() => addFavoriteFnc(item)} type="primary">
                    +
                  </Button>
                </Popover>
              </div>
            );
          })}
      </Slider>
      <h1>Favorites</h1>
      <Slider {...settings2}>
        {favorite.length > 0 &&
          favorite.map((item) => {
            return (
              <div className="rowChild f-flex justify-content-start m-3">
                <div className={styles.text}>{item.Title}</div>
                <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
                <Link to={`${item.imdbID}`}>
                  <Button>Перейти</Button>
                </Link>
                <Popover content={content} title="Title">
                  <Button onClick={() => addFavoriteFnc(item)} type="primary">
                    -
                  </Button>
                </Popover>
              </div>
            );
          })}
      </Slider>
     
    </>
  );
};

export default MovieList;
