import type { PaginationProps } from 'antd';
import { ConfigProvider, Empty, Pagination, Select, Spin, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthApiQuery, useFetchMoviesPopularQuery } from '../../store/MovieApi';
import styles from './New.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { setMyName } from '../../store/sliceMovie';

const New = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imgSrc, setImageSrc] = useState(true);
  const [num, setNum] = useState('1');
  const [genre, setGenre] = useState('');
  const [sortHow, setSortHow] = useState('desc');
  const [sort, setSort] = useState('date_added');
  const { data, refetch, isFetching, error } = useAuthApiQuery('');
  const { data: dataPopular, isLoading,isFetching:isFetch } = useFetchMoviesPopularQuery(
    `sort_by=${sort}&order_by=${sortHow}&limit=8&page=${num}&genre=${genre}`,
  );
  const placeholderImage =
    'https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png';

  //hooks
  useEffect(() => {
    if (data) {
      dispatch(setMyName(data.username));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    if (error) {
      if ('data' in error && typeof error.data === 'object') {
        if ('message' in error.data) {
          if (error.data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
  }, [data, navigate, isFetching, error]);

  //functions
  const onErr = (error) => {
    error.target.src = placeholderImage;
  };
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setNum(pageNumber.toString());
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const onClickDrop = (value) => {
    setGenre(value);
  };
  const onClickDropTwo = (value) => {
    setSort(value);
  };
  const onClickDropThree = (value) => {
    setSortHow(value);
  };
  const onSearch = (value: string) => {};
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const content = (
    <div>
      <p>Select a genre</p>
    </div>
  );
  const contentSort = (
    <div>
      <p>Select a sort</p>
    </div>
  );
  const contentHowSort = (
    <div>
      <p>How to sort</p>
    </div>
  );

  return (
    <>
      {isLoading || isFetch? (
        <div className={styles.zagr}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <>
          <div className={styles.parentDrop}>
            <Popover content={content} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="All"
                className={styles.drop}
                style={{ width: 120 }}
                onChange={onClickDrop}
                options={[
                  { value: '', label: 'All' },
                  { value: 'Action', label: 'Action' },
                  { value: 'Adventure', label: 'Adventure' },
                  { value: 'Animation', label: 'Animation' },
                  { value: 'Biography', label: 'Biography' },
                  { value: 'Comedy', label: 'Comedy' },
                  { value: 'Crime', label: 'Crime' },
                  { value: 'Documentary', label: 'Documentary' },
                  { value: 'Drama', label: 'Drama' },
                  { value: 'Family', label: 'Family' },
                  { value: 'Fantasy', label: 'Fantasy' },
                  { value: 'Film-Noir', label: 'Film-Noir' },
                  { value: 'History', label: 'History' },
                  { value: 'Horror', label: 'Horror' },
                  { value: 'Music', label: 'Music' },
                  { value: 'Musical', label: 'Musical' },
                  { value: 'Mystery', label: 'Mystery' },
                  { value: 'Sci-Fi', label: 'Sci-Fi' },
                  { value: 'Romance', label: 'Romance' },
                  { value: 'Sport', label: 'Sport' },
                  { value: 'Thriller', label: 'Thriller' },
                  { value: 'War', label: 'War' },
                  { value: 'Western', label: 'Western' },
                ]}
              />
            </Popover>
            <Popover content={contentSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="Date added"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropTwo}
                options={[
                  { value: 'title', label: 'Title' },
                  { value: 'date_added', label: 'Date added' },
                ]}
              />
            </Popover>
            <Popover content={contentHowSort} title="">
              <Select
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                defaultValue="desc"
                className={styles.drop2}
                style={{ width: 120 }}
                onChange={onClickDropThree}
                options={[
                  { value: 'desc', label: 'desc' },
                  { value: 'asc', label: 'asc' },
                ]}
              />
            </Popover>
          </div>
          <div className={styles.parent}>
            {dataPopular?.data?.movies?.map((item) => {
              return (
                <div key={item.imdb_code} className="mda1 rowChild f-flex justify-content-start">
                  <div className={styles.text}>{item.title}</div>
                  {item.large_cover_image ? (
                    <Link to={`/${item.imdb_code}`}>
                      <img
                        className={styles.img}
                        onError={onErr}
                        key={item.imdb_code}
                        src={imgSrc ? item.large_cover_image : placeholderImage}
                        alt="no"
                      />
                    </Link>
                  ) : (
                    <Empty />
                  )}
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
              <Pagination onChange={onChange} defaultCurrent={1} total={500} />
            </div>
          </ConfigProvider>{' '}
        </>
      )}
    </>
  );
};

export default New;
