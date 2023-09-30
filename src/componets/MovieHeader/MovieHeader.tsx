import React from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';

const MovieHeader = () => {
  const placeholder = 'input text'
  return (
    <div className={styles.container}>
      <div>
        <MovieTitle />
      </div>
      <div>
        <Search placeholder={placeholder}/>
      </div>
      <div className={styles.userInfo}>
        <UserInfo />
      </div>
    </div>
  );
};

export default MovieHeader;
