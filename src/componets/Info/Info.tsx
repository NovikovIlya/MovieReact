import React, { useEffect, useState } from 'react';
import styles from './Info.module.scss';
import {  useGetUserApiSetMutation, useSendMessageMutation } from '../../store/MovieApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin ,Modal, Input} from 'antd';
import { useAppSelector } from '../../hooks/redux';
import { nanoid } from '@reduxjs/toolkit';

const { TextArea } = Input;

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const myName = useAppSelector((state)=>state.sliceMovie.myName)
  const { name } = useParams();
  const [getUserApiSet, { data,isLoading }] = useGetUserApiSetMutation();
  const [sendMessage] = useSendMessageMutation()
  const [theme,setTheme] = useState('')
  const [text,setText] = useState('')
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const placeholderImage = 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
  const onErr = (error) => {
    error.target.src = placeholderImage;
  };

  // const onClickMessage = ()=>{
  //   if(data.username === myName){
  //     console.log('это мое имя')
  //     alert('its your profile')
  //     return;
  //   }
  //   if(data.username[0] < (myName[0])){
  //     console.log(data.username + myName)
  //     navigate(`/chat?name=${myName}&room=${data.username + myName}`);
  //   }else{
  //     console.log(myName + data.username)
  //     navigate(`/chat?name=${myName}&room=${myName + data.username}`);
  //   }
  // }
  const handlerTextTheme = ({target:{value}})=>{
    setTheme(value)
  }
  const handlerTextArea = ({target:{value}})=>{
    setText(value)
  }
  const onClicMail = ()=>{
    const dataZ = {
      id:nanoid(),
      username: data.username,
      myname: myName,
      theme: theme,
      text:text,
      date: new Date().toISOString().slice(0,10).split('-').reverse().join('.'),
      time: new Date().toLocaleTimeString(),
      read: false,
    }
    sendMessage(dataZ)
    setTheme('')
    setText('')
  }


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
          {/* <div className={styles.gr}>
            <Button onClick={onClickMessage} >Send message</Button>
          </div> */}
          <div className={styles.gr}>
            <Button onClick={showModal} >Send message v2</Button>
          </div>
          
          <Modal title="Send message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
           
            <div><Input value={theme} name='theme' onChange={handlerTextTheme} placeholder="Theme" /></div>
            <div><TextArea value={text} name='area' onChange={handlerTextArea} rows={4} placeholder="Message" maxLength={60} /></div>
            <Button onClick={onClicMail} >Send message</Button>
          </Modal>
        </>
      )}
    </div>}
    </>
  );
};

export default Info;
