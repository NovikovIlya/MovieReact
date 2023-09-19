import React, { useState } from 'react';
import { auth, useAuthApiQuery } from '../store/MovieApi';
import { useAppDispatch } from '../hooks/redux';

const MovieTitle = () => {
  const [cat,setCat]  = useState('')
  const {data,refetch,isError} = auth.useAuthApiQuery(cat)
  const dispatch = useAppDispatch()


  const exitFnc = () => {
    localStorage.setItem('token', 'test');
    // window.location.reload();
    setCat('test')
    dispatch((auth.util.resetApiState()))
    refetch()

    // data.username=''
    window.location.replace('/login')
  };
  console.log('999',data)
  return (
    <>
      <div onClick={()=>dispatch((auth.util.resetApiState()))}>Movie</div>
      <button onClick={exitFnc}>EXIT</button>
    </>
  );
};

export default MovieTitle;
