import React, { useEffect, useState } from 'react';
import { auth, useAddCommentMutation, useFetchCommentQuery } from '../../store/MovieApi';
import styles from './Comment.module.scss';
import { Input as AntdInput, Button, Divider, Select, Space } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import { CommentProps } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import Texteditor from '../TextEditor/Texteditor';
import Markdown from 'react-markdown'
import { addTextComment } from '../../store/sliceMovie';
import { Link } from 'react-router-dom';

const Comment: React.FC<CommentProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const textComment = useAppSelector((state)=>state.sliceMovie.textComment)
  const [objArray, setObjArray] = useState({
    all: null,
    positive: null,
    negative: null,
  });
  const [valueSelect, setValueSelect] = useState(true);
  const [text, setText] = useState('');
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const { data, isLoading } = useFetchCommentQuery(id,{refetchOnFocus:true});
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    const zero = value === 'like' ? true : false;
    setValueSelect(zero);
  };

  const handleComment = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleCreate = async () => {
    const title = textComment;
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
          like: valueSelect,
        },
      ],
    });
    alert(
      'Your message has been sent! After passing moderation, the message will appear! (Approximately 30 seconds)',
    );
    dispatch(addTextComment(''))
  };
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
  console.log('data', data);

  return (
    <div className={styles.MainParent}>
      <div className={styles.parentBtn}>  
        {/* <Select
          className={styles.selec}
          defaultValue="like"

          onChange={handleChange}
          options={[
            { value: 'like', label: 'like' },
            { value: 'hate', label: 'hate' },
          ]}
        /> */}
         <Texteditor id={id}/>
        {/* <Button className={styles.btn} onClick={() => handleCreate()}>
          Add comment
        </Button> */}
      </div>

      {reversedArray.length > 0 && <Divider style={{background:'white'}}/>}

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
                          <Markdown>
                            {child.text}
                          </Markdown>
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
