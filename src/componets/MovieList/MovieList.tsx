import React, { useEffect } from 'react';
import { MovieListProps, movieType } from '../../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.scss';
import { Button, Divider, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toogleEmpty } from '../../store/sliceMovie';
import { addFavorite, deleteFavorite } from '../../store/sliceMovie';
import TableZ from '../Table/Table';
import { useFetchMoviesPopularQuery } from '../../store/MovieApi';



const MovieList = ({ movie }: MovieListProps) => {
  const {data:dataPopular} = useFetchMoviesPopularQuery('sort_by=download_count&order_by=desc&limit=10')
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
    console.log('dataPopular',dataPopular)
    if (movie) {
      if (movie.length === 0) {
        dispatch(toogleEmpty(true));
      }
    }
  }, [movie, dispatch,dataPopular]);

  if (!movie) {
    return (<div >
      <div className={styles.notFound}>
      <p>Movie not found!</p>
      </div>
      
    </div>);
  }

  return (
    <>
      {/* <h1 className={styles.head}>Popular movies:</h1> */}
      <Slider {...settings}>
        
        {
          dataPopular?.data?.movies?.map((item) => {
            return (
              <div key={item.imdb_code} className="mda1 rowChild f-flex justify-content-start m-3">
                <Link className={styles.td} to={`${item.imdb_code}`}>
                <div className={styles.text}>{item.title}</div>
                <img className={styles.img} key={item.imdb_code} src={item.large_cover_image} alt="no" />
                
                </Link>
              </div>
            );
          })}
         
      </Slider>
      {/* <Slider {...settings}>
        
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
         
      </Slider> */}

     
     <div>
     <Divider className={styles.divi}/>
     </div>
     <h1 className={styles.head}>Top Lifetime Grosses:</h1>

     <div className={styles.tabl}>
     <TableZ />
     </div>
   
     
    </>
  );
};

export default MovieList;
