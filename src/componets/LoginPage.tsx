import React, { useEffect, useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { LoginApi, useAuthApiQuery } from '../store/MovieApi';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from './LoginPage.module.scss';
import {Input as AntdInput  } from 'antd';

interface FormInputs {
  username: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const [LoginApiSet] = LoginApi.useLoginApiSetMutation();
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
      const tok = await LoginApiSet(data);
      //@ts-ignore
      console.log('222', tok?.data.token);
      //@ts-ignore
      localStorage.setItem('token', tok.data.token);
      navigate('/');
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
        render={({ field }) => <AntdInput {...field} />}
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

export default LoginPage;
