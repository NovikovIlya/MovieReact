import { CharacherRight } from '../characterRight/CharacherRight';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAuthApiQuery,
  useFetchMoviesOneQuery,
  useTorrentFetchQuery,
} from '../../store/MovieApi';
import styles from './MovieCharacteristics.module.scss';
import Trailer from '../Trailer/Trailer';
import Comment from '../Comment/Comment';
import { Divider, Popover, Spin } from 'antd';
import { StarFilled, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Rating from '../Rating/Rating';
import Similar from '../Similar/Similar';
import { addFavorite } from '../../store/sliceMovie';
import { movieType } from '../../types';

const MovieCharacteristics = () => {
  const dispatch = useAppDispatch();
  const content = (
    <div>
      <p>Add to favorites</p>
    </div>
  );
  const [tor, setTor] = useState('');
  const [iconToggle, setIconToggle] = useState(false);
  const [gengreText, setGenreText] = useState<string>('');
  const navigate = useNavigate();
  const { title, year, id } = useParams();
  const arg = {
    title: title,
    year: year,
    id: id,
  };
  const { data: dataTorrent } = useTorrentFetchQuery(id);
  const { data: dataApi, error, isFetching } = useAuthApiQuery('');
  const { data, isLoading } = useFetchMoviesOneQuery(arg);
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });
  const addFavoriteFnc = (item: movieType) => {
    dispatch(addFavorite(item));
    setIconToggle(true);
  };

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const data = error.data as any;
        if ('message' in data) {
          if (data.message === 'Пользователь не авторизован') {
            navigate('/login');
          }
        }
      }
    }
    if (data) {
      if (data.Genre) {
        var text = data.Genre.split(',')[0];
      } else {
        text = 'Action';
      }
    }
    setGenreText(text);
  }, [data, navigate, dataApi, error]);

  useEffect(() => {
    const torrent = dataTorrent?.data?.movies?.[0].torrents?.[1]?.url ?? '';

    setTor(torrent);
    console.log('v', torrent);
  }, [dataTorrent]);

  return (
    <>
      {!data ? (
        isFetching && (
          <div className={styles.zagr}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        )
      ) : (
        <>
          <div className={styles.mt}>
            <div className={darkModeTheme}>
              {isLoading ? (
                <div className={styles.zagr}>
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              ) : (
                <>
                  <div className={styles.container2}>Хлебные крошки</div>
                  <div className={styles.container}>
                    <div className={styles.containerTop}>
                      <div className={styles.container__left}>
                        <div>
                          <img
                            src={
                              data.Poster
                                ? data.Poster
                                : 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg'
                            }
                            alt="no"
                          />
                          <div>
                            <Link className={styles.lin2} to={tor}>
                              Download
                            </Link>
                          </div>
                        </div>

                        <div className={styles.plus}>
                          <Popover content={content} title="">
                            {!iconToggle ? (
                              <PlusOutlined
                                className={styles.plusE}
                                onClick={() => addFavoriteFnc(data)}
                              />
                            ) : (
                              <CheckOutlined
                                className={styles.plusE}
                                onClick={() => addFavoriteFnc(data)}
                              />
                            )}
                          </Popover>
                        </div>
                      </div>
                      <CharacherRight arg={arg} />
                    </div>

                    <Divider className={styles.divid} />

                    <div className={styles.containerBottom}>
                      <div className={styles.Bottom}>
                        <div className={styles.itemRight}>{data.Plot}</div>
                      </div>
                    </div>

                    <Divider className={styles.divid} />

                    <div className={styles.twoItemParent}>
                      <div className={styles.twoItem}>
                        <div className={styles.containerTrailer}>
                          <div>
                            <Trailer id={arg.id} title={data.Title} year={data.Year} />
                          </div>
                        </div>
                        <div className={styles.containerRating}>
                          <div className={styles.Bottom}>
                            <div className={styles.itemRight2}>
                              {data.Ratings
                                ? data.Ratings.map((item) => {
                                    return (
                                      <div key={item.Source} className={styles.ratingMass}>
                                        <div>
                                          <StarFilled className={styles.star} />
                                          {item.Source}:
                                        </div>
                                        <div>{item.Value}</div>
                                      </div>
                                    );
                                  })
                                : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Rating id={id} />

                    <Divider className={styles.divid} />

                    <div className="row wh">
                      <Similar gengreText={gengreText} />
                    </div>

                    <Divider className={styles.divid} />

                    <div className={styles.containerComment}>
                      <Comment id={id} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>{' '}
        </>
      )}
    </>
  );
};

export default MovieCharacteristics;
