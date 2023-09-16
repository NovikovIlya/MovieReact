import React from 'react';
import { useAddCommentMutation, useFetchCommentQuery, AddCommentApi } from '../store/MovieApi';
import styles from './Comment.module.scss'
import { Button } from 'antd'

const Comment = ({ id }) => {
  const { data ,isLoading} = useFetchCommentQuery(id);
  const [AddCommentApi] = useAddCommentMutation();

  const mass  = data ? data.body : []
  console.log(data);

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

      <div>{isLoading ?  <h1>Грузится</h1> :
     
      mass?.map(item=>{
          return(
            <div>{item.name}</div>
          )})
     
       }</div>
    </div>
  );
};

export default Comment;
