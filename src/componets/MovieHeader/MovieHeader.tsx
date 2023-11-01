import { useState } from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import Search from '../Search/Search';
import styles from './Movie.module.scss';
import UserInfo from '../UserInfo/UserInfo';
import { Divider, FloatButton, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { useAuthApiQuery, useChatAllMutation, useGetEmailMutation } from '../../store/MovieApi';
import { useAppDispatch } from '../../hooks/redux';
import { setEmailAll } from '../../store/sliceMovie';

const MovieHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [hidd, setHidd] = useState(false);
  const location = useLocation();
  const { data: dataApi, refetch } = useAuthApiQuery('');
  const [ChatAll, { data: dataChat }] = useChatAllMutation();
  const [cccvalue, setCccValue] = useState('');
  const [getUserApiSetTwo, { data: dataGetEmail }] = useGetEmailMutation({});
  const [mess, setMess] = useState(false);

  useEffect(() => {
    if (dataApi) {
      if (dataApi.username) {
        const data = {
          username: dataApi.username,
          time: new Date().toLocaleTimeString(),
        };
        ChatAll(data);
      }
    }
  }, [dataApi]);

  useEffect(() => {
    if (dataApi) {
      if (dataApi.username && dataApi.username !== undefined) {
        const interval = setInterval(() => {
          getUserApiSetTwo({ username: dataApi.username });
          const data = {
            username: dataApi.username,
            time: new Date().toLocaleTimeString(),
          };
          ChatAll(data);
        }, 10000);
        return () => clearInterval(interval);
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
    if (dataGetEmail !== undefined) {
      if (dataGetEmail < cccvalue.length) {
        setMess(true);
      } else {
        setMess(false);
      }
    }
  }, [dataGetEmail, cccvalue]);
  // console.log('dataGetEmail', dataGetEmail, '-----', 'cccvalue', cccvalue.length);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/auth') {
      setHidd(true);
    } else {
      setHidd(false);
    }
  }, [location.pathname]);

  const placeholder = 'input text';

  const onClickMess = () => {
    navigate(`/chat?name=${dataApi.username}&room=main`);
  };

  return (
    <div className={hidd ? styles.hiddenZ : ''}>
      {
        <div className={styles.main}>
          <div>
            {mess && (
              <div>
                {' '}
                <FloatButton
                  icon={<CommentOutlined />}
                  description="New message in chat"
                  shape="square"
                  style={{ right: 24 }}
                  onClick={onClickMess}
                />
              </div>
            )}
          </div>
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
