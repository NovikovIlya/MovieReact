import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginApi, useAuthApiQuery } from '../store/MovieApi';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const [cat,setCat] = useState('')
  const [LoginApiSet] = LoginApi.useLoginApiSetMutation();
  const { data, refetch, isError } = useAuthApiQuery(cat);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
    const tok = await LoginApiSet(data);
    //@ts-ignore
    console.log('222', tok?.data.token);
    //@ts-ignore
    localStorage.setItem('token', tok.data.token);
    
    refetch()

    // window.location.replace('/login')
    } catch (error) {
      
    }

  };
  console.log('44',errors);
  console.log('55',isError);
  useEffect(()=>{
    refetch()
  },[])
  if (data){
    if (data.username){
      window.location.replace('/')
    }
  }
  


  //@ts-ignore


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        {...register('username', { required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Password"
        {...register('password', { required: true, maxLength: 100 })}
      />

      <input type="submit" />
    </form>
  );
}


export default LoginPage;