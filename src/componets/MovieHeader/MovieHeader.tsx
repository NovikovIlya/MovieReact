import React from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider } from 'antd';
import { useAuthApiQuery } from '../../store/MovieApi';

const MovieHeader = () => {
  const { data, isFetching } = useAuthApiQuery('');

  const placeholder = 'input text';
  return (
    <>
      {!data ? (
        isFetching && <></>
      ) : (
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.title}>
              <MovieTitle  />
            </div>
            <div className={styles.search}>
              <Search placeholder={placeholder} />
            </div>
            <div className={styles.userInfo}>
              <UserInfo />
            </div>
          </div>
          <div className={styles.container3}>
            <Divider className={styles.divi} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieHeader;
