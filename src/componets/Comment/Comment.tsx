import { DislikeOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { auth, useFetchCommentQuery } from '../../store/MovieApi';
import { CommentProps } from '../../types';
import Texteditor from '../TextEditor/Texteditor';
import styles from './Comment.module.scss';

const Comment: React.FC<CommentProps> = ({ id }) => {
  const [objArray, setObjArray] = useState({
    all: null,
    positive: null,
    negative: null,
  });

  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data, isLoading } = useFetchCommentQuery(id, { refetchOnFocus: true });

  // const { data: dataApi } = auth.useAuthApiQuery('');
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

  // const success = () => {
  //   messageApi.open({
  //     type: 'success',
  //     content:
  //       'Your message has been sent! After passing moderation, the message will appear! (Approximately 30 seconds)',
  //   });
  // };

  // const error = () => {
  //   messageApi.open({
  //     type: 'error',
  //     content: 'You must enter text!',
  //   });
  // };

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  //   const zero = value === 'like' ? true : false;
  //   setValueSelect(zero);
  // };

  // const handleComment = (e) => {
  //   console.log(e.target.value);
  //   setText(e.target.value);
  // };

  // const handleCreate = async () => {
  //   const title = textComment;
  //   const name = dataApi.username;
  //   if (name === '' || title === '') {
  //     error();
  //     return;
  //   }
  //   await AddCommentApi({
  //     imdbid: id,
  //     body: [
  //       {
  //         postId: 10,
  //         name: name,
  //         text: title,
  //         like: valueSelect,
  //       },
  //     ],
  //   });
  //   success();

  //   dispatch(addTextComment(''));
  // };
  const likeD = () => {
    let allAray = data?.length;
    let likeArray = 0;
    let hateArray = 0;
    data?.map((item) => {
      item.body.map((child) => {
        if (child.like === true) {
          likeArray = likeArray + 1;
        } else {
          hateArray = hateArray + 1;
        }
      });
    });
    console.log('allAray', allAray);
    const upldateAll = { all: allAray, positive: likeArray, negative: hateArray };
    setObjArray((objArray) => ({
      ...objArray,
      ...upldateAll,
    }));
    console.log('likeArray', likeArray);
    console.log('hateArray', hateArray);
  };
  useEffect(() => {
    likeD();
    console.log(objArray);
  }, [data]);

  const reversedArray = [];
  for (let i = mass.length - 1; i >= 0; i--) {
    const valueAtIndex = mass[i];
    reversedArray.push(valueAtIndex);
  }

  return (
    <div className={styles.MainParent}>

      <div className={styles.parentBtn}>
        <Texteditor id={id} />
      </div>

      {reversedArray.length > 0 && <Divider style={{ background: 'white' }} />}

      <div className={styles.MainAll}>
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
                          <Link to={`/info/${child.name}`}>{child.name}</Link>
                        </div>
                        <Divider />
                        <div className={styles.containerChilcd__text}>
                          {child.like ? (
                            <LikeOutlined className={styles.out} />
                          ) : (
                            <DislikeOutlined className={styles.out} />
                          )}
                          <div className={styles.childText}>
                            <Markdown>{child.text}</Markdown>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {data?.length > 0 && (
          <div className={styles.MainTwo}>
            <div className={styles.MainTwo__all}>
              <div>{objArray.all}</div>
              <div className={styles.MainTwo__positive__desc}>All</div>
            </div>
            <div className={styles.MainTwo__positive}>
              <div className={styles.MainTwo__positive__text}>{objArray.positive}</div>
              <div className={styles.MainTwo__positive__desc}>Positive</div>
            </div>
            <div className={styles.MainTwo__negative}>
              <div className={styles.MainTwo__negative__text}>{objArray.negative}</div>
              <div className={styles.MainTwo__positive__desc}>Negative</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
