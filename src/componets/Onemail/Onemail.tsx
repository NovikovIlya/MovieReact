import React, { useState } from 'react';
import styles from './Onemail.module.scss';
import { useGetMessageMutation, useUpdateMessageMutation } from '../../store/MovieApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';

const Onemail = () => {
  const { id } = useParams();
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [getMessage, { data: dataMessage }] = useGetMessageMutation();
  const [updateMessage,{data:dataUpdate}] = useUpdateMessageMutation()
  const [message, setMessage] = useState<any>();

  useEffect(() => {
    if (dataMessage) {
      const mess = dataMessage.find((item) => {
        return item.id === id;
      });
      setMessage(mess);
    }
  }, [dataMessage]);

  useEffect(()=>{
    updateMessage({
        username: myName,
        id:id
    })

  },[])

  console.log('message', message);

  useEffect(() => {
    getMessage({ username: myName });
  }, []);
  return (
    <div className={styles.container}>
      <div>{message && message?.text}</div>
      Onemail
    </div>
  );
};

export default Onemail;
