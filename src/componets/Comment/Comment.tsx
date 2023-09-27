import React, { useState } from 'react';
import { auth, useAddCommentMutation, useFetchCommentQuery } from '../../store/MovieApi';
import styles from './Comment.module.scss';
import { Input as AntdInput, Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import { CommentProps } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

const Comment: React.FC<CommentProps> = ({ id }) => {
  const [text, setText] = useState('');
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data, isLoading } = useFetchCommentQuery(id);
  const [AddCommentApi] = useAddCommentMutation();
  const { data: dataApi } = auth.useAuthApiQuery('');
  const mass = data ? data : [];

  const darkModeTheme = cn({
    [styles.container]: !darkMode,
    [styles.container2]: darkMode,
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    criteriaMode: 'all',
  });

  const handleComment = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleCreate = async () => {
    const title = text;
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
    setText('');
  };

  const reversedArray = [];
  for (let i = mass.length - 1; i >= 0; i--) {
    const valueAtIndex = mass[i];
    reversedArray.push(valueAtIndex);
  }

  return (
    <div className={styles.MainParent}>
      <div className={styles.parentBtn}>
        <Controller
          render={({ field }) => (
            <AntdInput
              className={styles.inp}
              placeholder="Input comment"
              {...field}
              onChange={(e) => handleComment(e)}
              value={text}
            />
          )}
          rules={{
            required: 'Field cannot be empty',
            minLength: { value: 4, message: 'Minimum 4 characters' },
          }}
          name="comment"
          control={control}
          defaultValue=""
        />
        <ErrorMessage
          errors={errors}
          name="comment"
          render={({ messages }) => {
            console.log('messages', messages);
            return messages
              ? _.entries(messages).map(([type, message]: [string, string]) => (
                  <p className={styles.error} key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
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
