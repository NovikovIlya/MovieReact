import React from 'react';
import styles from './MovieTitle.module.scss';
import { Switch } from 'antd';
import {darkMode as darkModeAdd } from '../../store/sliceMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';


const MovieTitle = () => {
  const darkMode = useAppSelector((state)=>state.sliceMovie.darkMode)
  const dispatch = useAppDispatch()

  const onChange = (checked: boolean) => {
    dispatch(darkModeAdd())
  };

  return (
    <>
      <div className={styles.themeSwitch}>
        <Link className={styles.lin} to='/'>PrivetMovie</Link>
        <Switch defaultChecked={darkMode} className={styles.switch}   onChange={onChange} />
      </div>
    </>
  );
};

export default MovieTitle;
