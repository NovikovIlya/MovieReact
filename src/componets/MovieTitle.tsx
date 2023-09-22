import React, { useState } from 'react';
import { auth, useAuthApiQuery } from '../store/MovieApi';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';

const MovieTitle = () => {
  const navigate = useNavigate()
  
  const {data,refetch,isError} = auth.useAuthApiQuery('')
  const dispatch = useAppDispatch()


  const exitFnc = () => {
    localStorage.setItem('token', 'test');

    dispatch((auth.util.resetApiState()))
    refetch()

    navigate('/login')
  };
  console.log('999',data)
  return (
    <>
      <div >PrivetMovie</div>
      
    </>
  );
};

export default MovieTitle;
