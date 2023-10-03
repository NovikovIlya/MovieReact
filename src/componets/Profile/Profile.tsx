import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import {  useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import {  useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { auth, useAuthApiQuery, useRenameApiSetMutation } from '../../store/MovieApi';

const Profile = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('');
  const { data, isFetching ,error} = useAuthApiQuery('');
  const [renameApiSet] = useRenameApiSetMutation();
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleClick = async () => {
    const data = {
      newUsername: text,
      oldUsername: dataApi.username,
    };
    await renameApiSet(data);
    refetch();
  };

  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const data = error.data as any;
        if ('message' in data) {
          if (data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
  
}, [ data, navigate,isFetching,error]);

  return (
    <div className={darkModeTheme}>

      <div className={styles.container}>
        <div className={styles.parent}>
          <div className={styles.text}>Current name: </div>
          <div className={styles.text}> {dataApi?.username}</div>
        </div>

        <div className={styles.parent}>
          <div className={styles.text}>New username: </div>
          <div className={styles.newUsername}>
            <Input
              className={styles.inp}
              value={text}
              onChange={(e) => handleInput(e)}
              placeholder="input newUsername"></Input>
            <Button className={styles.btn} onClick={handleClick}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
