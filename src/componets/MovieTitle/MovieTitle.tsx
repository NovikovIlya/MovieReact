import React from 'react';
import styles from './MovieTitle.module.scss';
import { Switch } from 'antd';
import {darkMode as darkModeAdd, setNumReduce } from '../../store/sliceMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
;



const MovieTitle = () => {
  const num = useAppSelector((state)=>state.sliceMovie.num)
  const darkMode = useAppSelector((state)=>state.sliceMovie.darkMode)
  const dispatch = useAppDispatch()

  const onChange = (checked: boolean) => {
    dispatch(darkModeAdd())
  };

  const clickTitle = ()=>{
    dispatch(setNumReduce(1))
    window.location.reload()
  }

  return (
    <>
      <div className={styles.themeSwitch}>
        <Link onClick={clickTitle} className={styles.lin} to='/'>PrivetMovie</Link>
        <Switch defaultChecked={darkMode} className={styles.switch}   onChange={onChange} />
      </div>
    </>
  );
};

export default MovieTitle;
