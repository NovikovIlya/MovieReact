import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import styles from './Rating.module.scss';
import { useAddRatingMutation, useFetchRatingQuery, AddRatingApi, auth } from '../../store/MovieApi';

const Rating = ({ id }) => {
  const [resRating, setResRating] = useState(0);
  const { data } = useFetchRatingQuery(id);
  const [AddRatingApi] = useAddRatingMutation()

  const rating = async(e) => {
    console.log(e);
    await AddRatingApi({
      imdbid: id,
      rating: e
    })
    alert('Your rating has been successfully submitted! It will be summarized with all scores within 30 seconds')
  };
  console.log(data);

  useEffect(() => {
    if (data) {
      const summer = () => {
        let suma = 0;
        let res = 0;
        data.forEach((item) => {
          suma = suma + item.rating;
          let len = data.length;
          res = suma / len;
          return res;
        });
        console.log('res', res);
        setResRating(res);
      };
      summer();
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Rate value={resRating} className={styles.star} onChange={(e) => rating(e)} />
    </div>
  );
};

export default Rating;
