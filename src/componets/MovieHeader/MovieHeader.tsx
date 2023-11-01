import { useState } from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useAuthApiQuery,
  useChatAllMutation, useGetEmailMutation
} from '../../store/MovieApi';
import { useAppDispatch } from '../../hooks/redux';
import { setEmailAll } from '../../store/sliceMovie';

const MovieHeader = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [hidd, setHidd] = useState(false);
  const location = useLocation();
  const { data: dataApi, refetch } = useAuthApiQuery('');
  const [ChatAll, { data: dataChat }] = useChatAllMutation();
  const [cccvalue, setCccValue] = useState('');
  const [getUserApiSetTwo, { data: dataGetEmail }] = useGetEmailMutation({});
  const [mess,setMess] = useState(false)

  useEffect(() => {
    if (dataApi) {
      if (dataApi.username) {
        getUserApiSetTwo({ username: dataApi.username });
        const data = {
          username: dataApi.username,
          time: new Date().toLocaleTimeString(),
        };
        ChatAll(data);
      }
    }
  }, [dataApi]);

  useEffect(() => {
    if (dataChat) {
      const ccc = dataChat.filter((element) => element !== null);
      dispatch(setEmailAll(ccc));
      setCccValue(ccc);
    }
  }, [dataChat]);

  useEffect(() => {
    if (dataGetEmail < cccvalue.length) {
      success();
      setMess(true)
    }else{
      setMess(false)
    }
  }, [dataGetEmail, cccvalue]);
  console.log('dataGetEmail', dataGetEmail, '-----', 'cccvalue', cccvalue.length);

  useEffect(()=>{
    // const interval = setInterval(() => {
    //   console.log('This will run every second!');
    // }, 1000);
    // return () => clearInterval(interval);
  },[])

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
      {contextHolder}
      {
        <div className={styles.main}>
          {/* <div>{mess && <>Есть сообщение</>}</div> */}
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
