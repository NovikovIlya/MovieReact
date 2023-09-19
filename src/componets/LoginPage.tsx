import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginApi, useLoginApiSetMutation } from '../store/MovieApi';

function LoginPage() {
    const [LoginApiSet] = LoginApi.useLoginApiSetMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const tok = await LoginApiSet(data)
    //@ts-ignore
    console.log('222',tok?.data.token)
    //@ts-ignore
    localStorage.setItem('token', tok.data.token);
    

  };
  console.log(errors);

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
