import React, { useState } from 'react';
import styles from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { auth, useRenameApiSetMutation } from '../../store/MovieApi';

const Profile = () => { 
  const dispatch = useAppDispatch()
  const [text,setText] = useState('')
  const [renameApiSet] = useRenameApiSetMutation()
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');

  const handleInput = (e)=>{
    setText(e.target.value)
  }

  const handleClick = async ()=>{
    const data = {
        newUsername: text,
        oldUsername: dataApi.username
    }
    await renameApiSet(data)
    refetch()
  }

  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });

  return (
    <div className={darkModeTheme}>
        <Link className={styles.link} to="/">
           <Button>Back</Button>
        </Link>
        <div className={styles.container}>
          <div>
            Name: {dataApi.username}
            password: {dataApi.password}
          </div>
          <div>
            <p>New username</p>
            <Input value={text} onChange={(e)=>handleInput(e)} placeholder='input newUsername'></Input>
            <Button onClick={handleClick}>Send</Button>
          </div>
        </div>
    </div>
  );
};

export default Profile;
