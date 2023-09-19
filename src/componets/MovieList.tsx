import React, { useEffect } from 'react';
import { movieType } from '../App';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCharacteristics from './MovieCharacteristics';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.scss'
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import sliceMovie from '../store/sliceMovie';
import { toogleEmpty } from '../store/sliceMovie';


interface MovieListProps {
  movie: movieType[];
}

const MovieList = ({ movie }: MovieListProps) => {
  const dispatch = useAppDispatch()
  const empty = useAppSelector((state)=>state.sliceMovie.empty)
  const settings = {
    centerMode: true,
    slidesToShow: 3,
    speed: 500,
  };
  console.log(movie);
  useEffect(()=>{
    if (movie){
      if (movie.length === 0){
        dispatch(toogleEmpty(true))
      }
    }
   
  },[])

  return (
    <>
      <Slider {...settings}>
        {movie?.map((item) => {
          return (
            <div className="rowChild f-flex justify-content-start m-3">
              <div className={styles.text}>{item.Title}</div>
              <img className={styles.img} key={item.imdbID} src={item.Poster} alt="no" />
              <Link to={`${item.imdbID}`}>
                <Button>Перейти</Button></Link>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default MovieList;
