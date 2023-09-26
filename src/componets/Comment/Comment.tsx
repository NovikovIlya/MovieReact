import React from 'react';
import { auth, useAddCommentMutation, useFetchCommentQuery } from '../../store/MovieApi';
import styles from './Comment.module.scss';
import { Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';

const Comment = ({ id }) => {
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data, isLoading } = useFetchCommentQuery(id);
  const [AddCommentApi] = useAddCommentMutation();
  const { data: dataApi } = auth.useAuthApiQuery('');
  const mass = data ? data : [];

  const darkModeTheme = cn({
    [styles.container]: !darkMode,
    [styles.container2]: darkMode,
  });

  const handleCreate = async () => {
    const title = prompt('Enter text');
    const name = dataApi.username;
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
              <div key={item.id} className={darkModeTheme}>
                {item.body.map((child) => {
                  return (
                    <div key={child.name} className={styles.containerChilcd}>
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
