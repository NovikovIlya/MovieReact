import React from 'react';
import styles from './MovieTitle.module.scss';
import { Switch } from 'antd';
import {darkMode as darkModeAdd } from '../../store/sliceMovie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';




const MovieTitle = () => {
  const darkMode = useAppSelector((state)=>state.sliceMovie.darkMode)
  const dispatch = useAppDispatch()

  const onChange = (checked: boolean) => {
    dispatch(darkModeAdd())
  };

  return (
    <>
      <div className={styles.themeSwitch}>
        <div>PrivetMovie</div>
        <Switch defaultChecked={darkMode} className={styles.switch}   onChange={onChange} />
      </div>
    </>
  );
};

export default MovieTitle;
