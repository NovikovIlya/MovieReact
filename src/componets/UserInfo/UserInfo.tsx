import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../store/MovieApi';
import styles from './UserInfo.module.scss';
import { Button } from 'antd';

const UserInfo = () => {
  const navigate = useNavigate();
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');
  const dispatch = useAppDispatch();
  const exitFnc = () => {
    localStorage.setItem('token', 'test');

    dispatch(auth.util.resetApiState());
    refetch();

    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__username}>{dataApi?.username}</div>
      <Button onClick={exitFnc}>EXIT</Button>
    </div>
  );
};

export default UserInfo;
