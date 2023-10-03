import React, { useEffect } from 'react';
import styles from './Favorite.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { deleteFavorite } from '../../store/sliceMovie';
import { movieType } from '../../types';
import { useAuthApiQuery } from '../../store/MovieApi';

export const Favorites = () => {
  const navigate = useNavigate();
  const favorite = useAppSelector((state) => state.sliceMovie.favorite);
  const {  error } = useAuthApiQuery('');
  const dispatch = useAppDispatch();
  const content2 = (
    <div>
      <p>Remove favorites</p>
    </div>
  );
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const settings2 = {
    centerMode: true,
    slidesToShow: mobile ? 1 : favorite.length > 2 ? 3 : favorite.length > 1 ? 2 : 1,
    speed: 500,
  };
  const delFavoriteFnc = (item: movieType) => {
    dispatch(deleteFavorite(item));
  };

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const data = error.data as any;
        if ('message' in data) {
          if (data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
  }, [error,navigate]);

  return (
    <>
    <h1 className={styles.head}>Favorites:</h1>
    <Slider {...settings2}>
      {favorite.length > 0 &&
        favorite.map((item) => {
          return (
            <div key={item.imdbID} className="rowChild f-flex justify-content-start m-3">
              <div className={styles.text}>{item.Title}</div>
              <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
              <div className={styles.bottom}>
                <Link to={`/${item.imdbID}`}>
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
