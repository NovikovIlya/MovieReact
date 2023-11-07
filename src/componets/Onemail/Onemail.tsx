import { useState } from 'react';
import styles from './Onemail.module.scss';
import { useGetMessageMutation, useUpdateMessageMutation } from '../../store/MovieApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Button } from 'antd';
import { useSendMessageMutation } from '../../store/MovieApi';
import { Modal, Input } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import TextArea from 'antd/es/input/TextArea';

const Onemail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [sendMessage] = useSendMessageMutation();
  const [theme, setTheme] = useState('');
  const [text, setText] = useState('');
  const { id, name } = useParams();
  const [getMessage, { data: dataMessage }] = useGetMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [message, setMessage] = useState<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlerTextTheme = ({ target: { value } }) => {
    setTheme(value);
  };

  const handlerTextArea = ({ target: { value } }) => {
    setText(value);
  };

  const onClicMail = () => {
    const dataZ = {
      id: nanoid(),
      username: name,
      myname: myName,
      theme: theme,
      text: text,
      date: new Date().toISOString().slice(0, 10).split('-').reverse().join('.'),
      time: new Date().toLocaleTimeString(),
      read: false,
    };
    sendMessage(dataZ);
    setTheme('');
    setText('');
  };

  //Нахождения почты в массиве
  useEffect(() => {
    if (dataMessage) {
      const mess = dataMessage.find((item) => {
        return item.id === id;
      });
      setMessage(mess);
    }
  }, [dataMessage]);


  //Получение почты и Обновление(read)почты
  useEffect(() => {
    getMessage({ username: myName });
    updateMessage({
      username: myName,
      id: id,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div>{message && message?.text}</div>
      <div className={styles.gr}>
        <Button onClick={showModal}>Reply to message</Button>
      </div>

      <Modal title="Send message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Input value={theme} name="theme" onChange={handlerTextTheme} placeholder="Theme" />
        </div>
        <div>
          <TextArea
            value={text}
            name="area"
            onChange={handlerTextArea}
            rows={4}
            placeholder="Message"
            maxLength={60}
          />
        </div>
        <Button onClick={onClicMail}>Send</Button>
      </Modal>
    </div>
  );
};

export default Onemail;
