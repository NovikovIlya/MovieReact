import type { PaginationProps } from 'antd';
import { ConfigProvider, Empty, Pagination, Select, Spin } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthApiQuery, useFetchMoviesPopularQuery } from '../../store/MovieApi';
import styles from './New.module.scss';

const New = () => {
  const { data, refetch, isFetching, error } = useAuthApiQuery('');
  const [imgSrc, setImageSrc] = useState(true);
  const [num, setNum] = useState('1');
  const [genre, setGenre] = useState('');
  const [sortHow, setSortHow] = useState('desc');
  const [sort, setSort] = useState('date_added');
  const { data: dataPopular } = useFetchMoviesPopularQuery(
    `sort_by=${sort}&order_by=${sortHow}&limit=9&page=${num}&genre=${genre}`,
  );

  const placeholderImage =
    'https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png';

  const onErr = (error) => {
    console.log('e', error);
    error.target.src = placeholderImage;
  };

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setNum(pageNumber.toString());
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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

  const onSearch = (value: string) => {
  };
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <> {!data ? (
      isFetching && (
        <div className={styles.zagr}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )
    ) : (<>
      <div className={styles.parentDrop}>
        <Select
          showSearch
          onSearch={onSearch}
          filterOption={filterOption}
          placeholder="Select a genre"
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
        <Select
          showSearch
          onSearch={onSearch}
          filterOption={filterOption}
          placeholder="Select a sort"
          className={styles.drop2}
          style={{ width: 120 }}
          onChange={onClickDropTwo}
          options={[
            { value: 'title', label: 'Title' },
            { value: 'date_added', label: 'Date added' },
          ]}
        />
        <Select
          showSearch
          onSearch={onSearch}
          filterOption={filterOption}
          placeholder="How to sort"
          className={styles.drop2}
          style={{ width: 120 }}
          onChange={onClickDropThree}
          options={[
            { value: 'desc', label: 'desc' },
            { value: 'asc', label: 'asc' },
          ]}
        />
      </div>
      <div className={styles.parent}>
        {dataPopular?.data?.movies?.map((item) => {
          return (
            <div key={item.imdb_code} className="mda rowChild f-flex justify-content-start m-3">
              <div className={styles.text}>{item.title}</div>
              {item.large_cover_image ? (
                <Link className={styles.td} to={`/${item.imdb_code}`}>
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
      </ConfigProvider> </>)}
    </>
  );
};

export default New;
