import React from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';

const MovieHeader = () => {
  return (
    <div className={styles.container}>
      <div>
        <MovieTitle />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  );
};

export default MovieHeader;
