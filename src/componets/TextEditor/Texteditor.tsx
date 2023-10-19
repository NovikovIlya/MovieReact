import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Texteditor.module.scss';
import SimpleMDE, { SimpleMdeReact } from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTextComment } from '../../store/sliceMovie';
import sliceMovie from '../../store/sliceMovie';
import { useAddCommentMutation, useAuthApiQuery } from '../../store/MovieApi';
import { Button, Select } from 'antd';




const Texteditor = ({id}) => {
  const [valueSelect, setValueSelect] = useState(true);
  const [valueZ,setValueZ] = useState('')
  const { data: dataApi } = useAuthApiQuery('');
  const [AddCommentApi] = useAddCommentMutation();
  const dispatch = useAppDispatch()
  const textComment = useAppSelector((state)=>state.sliceMovie.textComment)


  const onChange = (value: string) => {
    setValueZ(value)
    // dispatch(addTextComment(value))
    
  }

  const handleCreate = async () => {
    const title = valueZ;
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
    setValueZ('')
  };

  const onClickl = (e)=>{
    console.log('ss',e)
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    const zero = value === 'like' ? true : false;
    setValueSelect(zero);
  };

  useEffect(()=>{
    console.log('vvb',textComment)
  },[textComment])

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      maxHeight: "100px",
      autofocus: true,
      spellChecker: false,
    } 
  }, []);

  return (
    <>
     <Select
          className={styles.selec}
          defaultValue="like"

          onChange={handleChange}
          options={[
            { value: 'like', label: 'like' },
            { value: 'hate', label: 'hate' },
          ]}
        />
    <div className={styles.bc}>
     
      <SimpleMdeReact options={autofocusNoSpellcheckerOptions} value={valueZ} onChange={onChange} />
      
    </div>
    <Button className={styles.btn} onClick={() => handleCreate()}>
          Add comment
        </Button>
    </>
  );
};

export default Texteditor;
