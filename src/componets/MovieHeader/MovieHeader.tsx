import React, { useState } from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider,message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthApiQuery, useChatAllMutation } from '../../store/MovieApi';



const MovieHeader = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [hidd, setHidd] = useState(false);
  const location = useLocation();
  const { data: dataApi, refetch } = useAuthApiQuery('');
  const [ChatAll,{data}] = useChatAllMutation()

  useEffect(()=>{
    ChatAll({
      username: dataApi?.username
    })
  },[])

  useEffect(()=>{
    if(data){
      if(data.length > 0){
        success()
      }

    }
  
  },[data])

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/auth') {
      setHidd(true);
    } else {
      setHidd(false);
    }
  }, [location.pathname]);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'New message!',
    });
  };


  const placeholder = 'input text';

  return (
    <div className={hidd ? styles.hiddenZ : ''}>
      {
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.title}>
              <MovieTitle />
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
