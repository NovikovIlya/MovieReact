import { CharacherRight } from '../characterRight/CharacherRight';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useAuthApiQuery,
  useFetchMoviesOneQuery,
  useTorrentFetchQuery,
} from '../../store/MovieApi';
import styles from './MovieCharacteristics.module.scss';
import Trailer from '../Trailer/Trailer';
import Comment from '../Comment/Comment';
import { Divider, Popover, Spin, Breadcrumb, ConfigProvider, Button, Modal, Result } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { StarFilled, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Rating from '../Rating/Rating';
import Similar from '../Similar/Similar';
import { addFavorite, addFavorites } from '../../store/sliceMovie';
import { movieType } from '../../types';

const MovieCharacteristics = () => {
  const [haveFav, setHaveFav] = useState(false);
  const favoriteMovie = useAppSelector((state) => state.sliceMovie.favoritesNew);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const content = (
    <div>
      <p>Add to favorites</p>
    </div>
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tor, setTor] = useState([]);
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
  //@ts-ignore
  const {data:dataPoster} = useTorrentFetchQuery(id)
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  const darkModeTheme = cn({
    [styles.Main]: !darkMode,
  });

  useEffect(() => {
    if(favoriteMovie){
    const proverka = () => {
      const favoriteMovieImdb = favoriteMovie.map((item) => {
        return item.imdbID;
      });
      console.log('favoriteMovieImdb', favoriteMovieImdb);
      console.log('ahaha', haveFav);
      console.log('hehehe', id);
      setHaveFav(favoriteMovieImdb.includes(id));
    };
    proverka();}
  }, [id, favoriteMovie]);

  const addFavoritesNew = (data) => {
    const mainData = {
      favorites: data,
      oldUsername: dataApi.username,
    };
    dispatch(addFavorites(mainData));
  };

  const addFavoriteFnc = (item: movieType) => {
    dispatch(addFavorite(item));
    setIconToggle(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
    const kek = () => {
      window.scrollTo(0, 0);
    };
    setTimeout(kek, 1000);
  }, [pathname]);

  useEffect(() => {
    const dt = dataTorrent?.data?.movies?.[0].torrents.map((item) => {
      return {
        size: item.size,
        url: item.url,
        quality: item.quality,
        type: item.type,
      };
    });
    const torrentMassiv = dataTorrent?.data?.movies?.[0].torrents?.[1] ? (
      dt
    ) : (
      <Result status="404" title="404" subTitle="Sorry, torrent links no longer exist." />
    );
    setTor(torrentMassiv);

    console.log('torrentMassiv', torrentMassiv);
  }, [dataTorrent]);
  //@ts-ignore
  if(dataPoster){
    var placeholderImage ='https://www.zidart.rs/build/images/background/no-results-bg.2d2c6ee3.png';
  }
  console.log('placeholderImage',placeholderImage)
  const onErr = (error) => {
    error.target.src = placeholderImage;
  };

  return (
    <>
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
                <div>
                  <div className={styles.container2}>
                    <div className={styles.container2ss}>
                      <ConfigProvider
                        theme={{
                          components: {
                            Breadcrumb: {
                              itemColor: 'rgba(39, 97, 245, 0.8)',
                              linkColor: 'rgba(39, 97, 245, 0.8)',
                              separatorColor: 'rgba(39, 97, 245, 0.8)',
                              lastItemColor: 'rgba(39, 97, 245, 0.8)',
                              linkHoverColor: 'rgba(39, 97, 245, 0.8)',
                            },
                          },
                        }}>
                        <Breadcrumb
                          items={[
                            {
                              href: '/',
                              title: <HomeOutlined />,
                            },
                            {
                              href: '/new',
                              title: (
                                <>
                                  <UserOutlined />
                                  <span>Movies</span>
                                </>
                              ),
                            },
                            {
                              title: data.Title,
                            },
                          ]}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div className={styles.containerTop}>
                      <div className={styles.container__left}>
                        <div>
                          <img
                          className={styles.imag}
                          onError={onErr}
                            src={
                              data.Poster
                                ? data.Poster
                                : 'https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg'
                            }
                            alt="no"
                          />
                          <div className={styles.lin2Parent}>
                            <Button className={styles.lin2Btn} type="primary" onClick={showModal}>
                              Download
                            </Button>
                            <Modal
                              title=""
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}>
                              {tor.length > 0 &&
                                tor.map((item) => {
                                  return (
                                    <>
                                      <Link to={item.url}>
                                        <div>
                                          {item.quality}, {item.size}, {item.type}
                                        </div>
                                      </Link>
                                    </>
                                  );
                                })}
                            </Modal>
                          </div>
                        </div>

                        <div className={styles.plus}>
                          <Popover content={content} title="">
                            {!haveFav ? (
                              <PlusOutlined
                                className={styles.plusE}
                                onClick={() => {
                                  setHaveFav(true);
                                  addFavoritesNew(data);
                                  console.log('favoriteMoviefavoriteMovie', favoriteMovie);
                                  console.log('haveFavhaveFav', haveFav);
                                }}
                              />
                            ) : (
                              <CheckOutlined
                                className={styles.plusE}
                                onClick={() => addFavoritesNew(data)}
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
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default MovieCharacteristics;
