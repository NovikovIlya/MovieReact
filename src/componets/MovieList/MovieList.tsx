import React, { useEffect } from 'react';
import { movieType } from '../../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.scss';
import { Button, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toogleEmpty } from '../../store/sliceMovie';
import { addFavorite, deleteFavorite } from '../../store/sliceMovie';

interface MovieListProps {
  movie: movieType[];
}

const content = (
  <div>
    <p>Add to favorites</p>
  </div>
);
const content2 = (
  <div>
    <p>Remove favorites</p>
  </div>
);

const MovieList = ({ movie }: MovieListProps) => {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.sliceMovie.favorite);
  const mobile =  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
  .test(navigator.userAgent))
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : 3,
    speed: 500,
  };
  const settings2 = {
    centerMode: true,
    slidesToShow: mobile ? 1 :  favorite.length > 2 ? 3 : favorite.length > 1 ? 2 : 1,
    speed: 500,
  };
  const addFavoriteFnc = (item: movieType) => {
    dispatch(addFavorite(item));
  };

  const delFavoriteFnc = (item: movieType) => {
    dispatch(deleteFavorite(item));
  };

  useEffect(() => {
    if (movie) {
      if (movie.length === 0) {
        dispatch(toogleEmpty(true));
      }
    }
  }, [movie, dispatch]);

  if (!movie) {
    return (<div >
      <div className={styles.notFound}>
      <p>Movie not found!</p>
      </div>
      
      {favorite.length > 0 && (
        <div>
          <h1 className={styles.head1}>Favorites</h1>
        </div>
      )}
      <Slider {...settings2}>
        {favorite.length > 0 &&
          favorite.map((item) => {
            return (
              <div key={item.imdbID} className="rowChild f-flex justify-content-start m-3">
                <div className={styles.text}>{item.Title}</div>
                <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
                <div className={styles.bottom}>
                  <Link to={`${item.imdbID}`}>
                    <Button className={styles.btnDesc}>Go to moive</Button>
                  </Link>
                  <Popover content={content2} title="">
                    <Button
                      className={styles.btnPlus}
                      onClick={() => delFavoriteFnc(item)}
                      type="primary">
                      -
                    </Button>
                  </Popover>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>);
  }
  // if (!movie.length){
  //   return null;
  // }

  return (
    <>
      <Slider {...settings}>
        
        {movie.length > 0 &&
          movie.map((item) => {
            return (
              <div key={item.imdbID} className="mda rowChild f-flex justify-content-start m-3">
                <div className={styles.text}>{item.Title}</div>
                <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
                <div className={styles.bottom}>
                  <Link to={`${item.imdbID}`}>
                    <Button className={styles.btnDesc}>Go to movie</Button>
                  </Link>
                  <Popover content={content} title="">
                    <Button
                      className={styles.btnPlus}
                      onClick={() => addFavoriteFnc(item)}
                      type="primary">
                      +
                    </Button>
                  </Popover>
                </div>
              </div>
            );
          })}
         
      </Slider>
      
      {favorite.length > 0 && (
        <div>
          <h1 className={styles.head1}>Favorites</h1>
        </div>
      )}
      <Slider {...settings2}>
        {favorite.length > 0 &&
          favorite.map((item) => {
            return (
              <div key={item.imdbID} className="rowChild f-flex justify-content-start m-3">
                <div className={styles.text}>{item.Title}</div>
                <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
                <div className={styles.bottom}>
                  <Link to={`${item.imdbID}`}>
                    <Button className={styles.btnDesc}>Go to moive</Button>
                  </Link>
                  <Popover content={content2} title="">
                    <Button
                      className={styles.btnPlus}
                      onClick={() => delFavoriteFnc(item)}
                      type="primary">
                      -
                    </Button>
                  </Popover>
                </div>
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default MovieList;
