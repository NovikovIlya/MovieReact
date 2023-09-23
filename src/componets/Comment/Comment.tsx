import React from 'react';
import { useAddCommentMutation, useFetchCommentQuery } from '../../store/MovieApi';
import styles from './Comment.module.scss';
import { Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Comment = ({ id }) => {
  const { data, isLoading } = useFetchCommentQuery(id);
  const [AddCommentApi] = useAddCommentMutation();
  const mass = data ? data : [];

  const handleCreate = async () => {
    const title = prompt('Enter text');
    const name = prompt('Enter username');
    if (name === '' || title === '') {
      return alert('You must enter a name or text!');
    }
    await AddCommentApi({
      imdbid: id,
      body: [
        {
          postId: 10,
          name: name,
          text: title,
        },
      ],
    });
    alert(
      'Your message has been sent! After passing moderation, the message will appear! (Approximately 30 seconds)',
    );
  };

  const reversedArray = [];
  for (let i = mass.length - 1; i >= 0; i--) {
    const valueAtIndex = mass[i];

    reversedArray.push(valueAtIndex);
  }

  return (
    <div className={styles.MainParent}>
      <div className={styles.parentBtn}>
        <Button className={styles.btn} onClick={() => handleCreate()}>
          Add comment
        </Button>
      </div>

      <div className={styles.Main}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          reversedArray?.map((item) => {
            return (
              <div className={styles.container}>
                {item.body.map((child) => {
                  return (
                    <div className={styles.containerChilcd}>
                      <div>
                        <UserOutlined className={styles.out} />
                        {child.name}
                      </div>
                      <Divider />
                      <div className={styles.containerChilcd__text}>{child.text}</div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comment;
