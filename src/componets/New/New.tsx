import type { PaginationProps } from 'antd';
import { Button, ConfigProvider, Empty, Pagination, Popover } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { useFetchMoviesPopularQuery } from '../../store/MovieApi';
import { addFavorite } from '../../store/sliceMovie';
import { movieType } from '../../types';
import styles from './New.module.scss';

const New = () => {
  const dispatch = useAppDispatch();
  const [imgSrc, setImageSrc] = useState(true);
  const [num, setNum] = useState('1');
  const { data: dataPopular } = useFetchMoviesPopularQuery(
    `sort_by=year&order_by=desc&limit=9&page=${num}`,
  );
  const content = (
    <div>
      <p>Add to favorites</p>
    </div>
  );


  const addFavoriteFnc = (item: movieType) => {
    dispatch(addFavorite(item));
  };
  const placeholderImage = 
    'https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png';

  const onErr = (error) => {
    console.log('e', error);
    error.target.src = placeholderImage;
  };

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setNum(pageNumber.toString())
  };

  return (
    <>
       
      <div></div>
      <div className={styles.parent}>
        {dataPopular?.data?.movies?.map((item) => {
          return (
          
            <div key={item.imdb_code} className="mda rowChild f-flex justify-content-start m-3">
                <Link className={styles.td} to={`/${item.imdb_code}`}>
              <div className={styles.text}>{item.title}</div>
              {item.large_cover_image ? (
                <img
                  className={styles.img}
                  onError={onErr}
                  key={item.imdb_code}
                  src={imgSrc ? item.large_cover_image : placeholderImage}
                  alt="no"
                />
              ) : (
                <Empty />
              )}
              
              </Link>
            </div>
           
          );
        })}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveColorDisabled: 'rgb(128,128,128)',
            },
          },
        }}>
        <div className={styles.pag}>
          <Pagination onChange={onChange}  defaultCurrent={1} total={500} />
        </div>
      </ConfigProvider>
    </>
  );
};

export default New;
