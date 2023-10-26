import React, { useEffect } from 'react';
import styles from './Info.module.scss';
import {  useGetUserApiSetMutation } from '../../store/MovieApi';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

const Info = () => {
  const { name } = useParams();
  const [getUserApiSet, { data,isLoading }] = useGetUserApiSetMutation();
  const placeholderImage = 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
  const onErr = (error) => {
    console.log('e', error);
    error.target.src = placeholderImage;
  };
  

  useEffect(() => {
    const getUser = () => {
      getUserApiSet({ username: name });
    };
    getUser();
  }, [getUserApiSet, name]);

  return (
    <>{isLoading ? <><div className={styles.zagr}>
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  </div></> :
    <div className={styles.container}>
      {data && (
        <>
          <div className={styles.el}>Username:</div>
          <div className={styles.el}>{data.username}</div>
          <div className={styles.el}>Avatar:</div>
          <div className={styles.el}>
            <img
              className={styles.ava}
              src={`https://backmovie.onrender.com${data?.avatar}`}
              alt="no"
              onError={onErr}
            />
          </div>
          <div className={styles.el}>Information:</div>
          <div className={styles.el}>{data.info}</div>
          <div className={styles.el}> Roles:</div>
          <div className={styles.el}>
            {data.roles.map((item) => {
              return item;
            })}
          </div>
        </>
      )}
    </div>}
    </>
  );
};

export default Info;
