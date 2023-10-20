import React, { useEffect } from 'react';
import styles from './Info.module.scss';
import {  useGetUserApiSetMutation, useGetUserApiSetTwoMutation, useInfoApiSetTwoQuery } from '../../store/MovieApi';
import { useParams } from 'react-router-dom';

const Info = () => {
  const { name } = useParams();
  const [getUserApiSet, { data }] = useGetUserApiSetMutation();
  const {data:danaSet} = useInfoApiSetTwoQuery('')
  const [getKek] = useGetUserApiSetTwoMutation()
  

  useEffect(() => {
    const getUser = () => {
      getUserApiSet({ username: name });
    };
    getUser();
  }, [getUserApiSet, name]);

  return (
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
    </div>
  );
};

export default Info;
