import React, { useEffect, useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { LoginApi, RegistrApi, useAuthApiQuery } from '../store/MovieApi';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from './LoginPage.module.scss';
import {Input as AntdInput,Button as AndtdButton,message  } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined,LoginOutlined,DatabaseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


interface FormInputs {
  username: string;
  password: string;
}


function Auth() {
 
const items: MenuProps['items'] = [
  {
    label: (
        <Link to="/login" rel="noopener noreferrer">
          Login
        </Link>
      ),
    key: 'mail',
    icon: <LoginOutlined />,
  },
  {
    label: (

        <Link to="/auth"  rel="noopener noreferrer">
        Sign up
      </Link>
    ),
    key: 'alipay',
    icon: <DatabaseOutlined />
  },
]
const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState('alipay');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const [RegistrApiSet,result] = RegistrApi.useRegistrApiSetMutation();
  // const { data: dataApi, refetch, isError } = useAuthApiQuery('');
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: 'all',
  });
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const tok = await RegistrApiSet(data);
      console.log('bbb',tok)
      //@ts-ignore

    } catch (e) {
      console.log(e);
      console.log(errors);
    }
  };
  const info = () => {
    messageApi.info('This user was not found!');
  };
  const infoSeccus = () => {
    messageApi.info('Succesful!');
  };


  useEffect(()=>{
    if(result.error){
      info()
    }
    if(result.data ){
      infoSeccus()
    }
  },[result])

  return (
    <>
    {contextHolder}
    <Menu className={styles.menu} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.name} >
      <Controller
        render={({ field }) => <AntdInput  placeholder="Username" {...field} />}
        rules={{ required: 'Field cannot be empty', minLength: { value: 4, message: 'Minimum 4 characters' } }}
        name="username"
        control={control}
        defaultValue=""
      />
        <ErrorMessage
        errors={errors}
        name="username"
        render={({ messages }) => {
          console.log('messages', messages);
          return messages
            ? _.entries(messages).map(([type, message]: [string, string]) => (
                <p className={styles.error} key={type}>
                  {message}
                </p>
              ))
            : null;
        }}
      />
      </div>
     
     
      <Controller
        render={({ field }) => <AntdInput placeholder="Password" type='password' {...field} />}
        rules={{ required: 'Field cannot be empty', minLength: { value: 4, message: 'Minimum 4 characters' }}}
        name="password"
        control={control}
        defaultValue=""
      />

      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) => {
          console.log('messages', messages);
          return messages
            ? _.entries(messages).map(([type, message]: [string, string]) => (
                <p className={styles.error}  key={type}>
                  {message}
                </p>
              ))
            : null;
        }}
      />
      <div className={styles.container__btn}>
        <AndtdButton type="primary" htmlType="submit">
          Send
        </AndtdButton>
      </div>
      
    </form>
    
   
  </>
  );
}

export default Auth;
