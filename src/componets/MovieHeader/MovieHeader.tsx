import React, { useState } from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider } from 'antd';
import { useAuthApiQuery } from '../../store/MovieApi';
import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';

const MovieHeader = () => {
  const { data, isFetching } = useAuthApiQuery('');
  const [hidd,setHidd] = useState(false)
  const location = useLocation()
  console.log('',location)

  useEffect(()=>{
    if(location.pathname === '/login' || location.pathname=== '/auth'){
      setHidd(true)
    }else{
      setHidd(false)
    }
    
  },[location.pathname])

  console.log('sz',hidd)

  const placeholder = 'input text';

  return (
    <div className={hidd ?  styles.hiddenZ : ''}>
      {
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
        
      }
    </div>
  );
};

export default MovieHeader;
