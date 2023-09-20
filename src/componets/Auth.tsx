import React, { useEffect, useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { LoginApi, RegistrApi, useAuthApiQuery } from '../store/MovieApi';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from './LoginPage.module.scss';
import {Input as AntdInput  } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
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
          Navigation Four - Link
        </Link>
      ),
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: (

        <Link to="/auth"  rel="noopener noreferrer">
        Navigation Four - Link
      </Link>
    ),
    key: 'alipay',
  },
]
  const [current, setCurrent] = useState('alipay');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const navigate = useNavigate();
  const [RegistrApiSet] = RegistrApi.useRegistrApiSetMutation();
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
    //   console.log('222', tok?.data.token);
    //   //@ts-ignore
    //   localStorage.setItem('token', tok.data.token);
    //   navigate('/');
    } catch (e) {
      console.log(e);
      console.log(errors);
    }
  };

  useEffect(() => {
    // refetch();
  }, []);

  return (
    <>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      {/* {isError&&<p style={{color:'white'}}>Пользователь не найден</p>} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text"
          placeholder="Name"
          {...register('username', {
            required: 'this req',
            minLength: { value: 6, message: 'min passs' },
            maxLength: 80,
            
          })}
        />
        {/* <input 
          type="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: { value: 6, message: 'min passs' },
            maxLength: 100,
          })}
        /> */}
        <Controller
        render={({ field }) => <AntdInput placeholder='pass' {...field} />}
        rules={{ required: true }}
        
        name="password"
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
                  <p style={{ color: 'white' }} key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            console.log('messages', messages);
            return messages
              ? _.entries(messages).map(([type, message]: [string, string]) => (
                  <p style={{ color: 'white' }} key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
         <input  type="submit" />
       
     
       
      </form>
    </>
  );
}

export default Auth;
