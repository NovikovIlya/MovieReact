import React from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider } from 'antd';
import { useAuthApiQuery } from '../../store/MovieApi';

const MovieHeader = () => {
  const { data, isFetching,error } = useAuthApiQuery('');

  const placeholder = 'input text'
  return (
    <>{error ? '' : 
      <div>
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
    <div className={styles.container2}>
      <Divider className={styles.divi}/>
    </div>
      </div>
    }
    
     </>
    
  );
};

export default MovieHeader;
