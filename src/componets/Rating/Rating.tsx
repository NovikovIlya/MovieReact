import React from 'react';
import { Rate } from 'antd';
import styles from './Rating.module.scss'

const Rating: React.FC = () =>{
  const rating = (e)=>{
    console.log(e)
  }

  return(
    <div className={styles.container}>
     <Rate className={styles.star} onChange={(e)=>rating(e)} />
    </div>

  )
} 

export default Rating;