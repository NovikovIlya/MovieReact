import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form } from 'antd';
import { auth, useAuthApiQuery, useRenameApiSetMutation } from '../../store/MovieApi';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Profile = () => {
  const navigate = useNavigate();
  // const [kek1,setKek1] = useState('')
  const [error1,setError1] = useState('')
  const [text, setText] = useState('');
  const { data, isFetching, error : errorApi } = useAuthApiQuery('');
  const [renameApiSet,{ error }] = useRenameApiSetMutation();
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleClick = async () => {
    if(text.length < 4){
      return
    }
    const data = {
      newUsername: text,
      oldUsername: dataApi.username,
    };
    const dataRename = await renameApiSet(data);
    console.log('dataRename',dataRename)
    refetch();
  };

  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (errorApi) {
      if ('data' in errorApi) {
        const data = errorApi.data as any;
        if ('message' in data) {
          if (data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
  }, [data, navigate, isFetching, errorApi]);

  useEffect(()=>{
    console.log('er',error)
    if(error){
      if ('data' in error){
        //@ts-ignore
        setError1(error.data.message)
        console.log('44',error1)
        // you can access all properties of `FetchBaseQueryError` here
  
      } else {
        // you can access all properties of `SerializedError` here
      }
    }
  },[error,error1])

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
          <Form 
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{  display:"flex"}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <Form.Item<FieldType>
              label=""
              name="username"
              rules={[{ required: true, message: 'Please input your username!'},{ min: 4, message: 'Minimum 4 characters.'}]}>
              <Input
                className={styles.inp}
                value={text}
                onChange={(e) => handleInput(e)}
                placeholder=""></Input>
            </Form.Item>
            <Button className={styles.btn} onClick={handleClick}  htmlType="submit">
              Send
            </Button>
            </Form>
          </div>
        </div>
      </div>
      {error  ? <div className={styles.err}>{error1}</div> : ''}
    </div>
  );
};

export default Profile;
