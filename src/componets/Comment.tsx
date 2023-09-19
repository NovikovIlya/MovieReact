import React from 'react';
import { useAddCommentMutation, useFetchCommentQuery, AddCommentApi } from '../store/MovieApi';
import styles from './Comment.module.scss'
import { Button,Divider } from 'antd'


const Comment = ({ id }) => {
  const { data ,isLoading} = useFetchCommentQuery(id);
  const [AddCommentApi] = useAddCommentMutation();
  console.log(data);
  const mass  = data ? data : []
  

  const handleCreate = async () => {
    const title = prompt();
    await AddCommentApi({
      imdbid: id,
      body: [
        {
          postId: 10,
          name: 'test',
          text: title,
        },
      ],
    });
  };

  return (
    <div>
      <Button className={styles.btn} onClick={() => handleCreate()}>Добавить</Button>

      <div className={styles.Main}>{isLoading ?  <h1>Грузится</h1> :
     
      mass?.map(item=>{
          return(
            
            <div className={styles.container}>{item.body.map(child=>{
             
              return(
                <div className={styles.containerChilcd}>
                <div>{child.name}</div>
                <Divider/>
                <div>{child.text}</div>
                </div>
              )
            })}</div>
            
          )})
     
       }</div>
    </div>
  );
};

export default Comment;
