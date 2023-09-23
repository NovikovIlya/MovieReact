import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchMoviesOneQuery } from '../../store/MovieApi';
import styles from './MovieCharacteristics.module.scss';
import Trailer from '../Trailer/Trailer';
import Comment from '../Comment/Comment';
import { Button, Divider } from 'antd';
import { StarFilled } from '@ant-design/icons';

const MovieCharacteristics = () => {
  const { title, year, id } = useParams();
  const arg = {
    title: title,
    year: year,
    id: id,
  };
  const { data, isLoading } = useFetchMoviesOneQuery(arg);
  return (
    <div className={styles.Main}>
      <Link className={styles.link} to="/">
        <Button>Back</Button>
      </Link>

      {isLoading ? (
        <div className={styles.zagr}>
          <h1 className={styles.zagr__hed1}>Loading...</h1>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.containerTop}>
              <div className={styles.container__left}>
                <img src={data.Poster} alt="no" />
                <div></div>
              </div>
              <div className={styles.container__right}>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Title:</div>
                  <div className={styles.itemRight}>{data.Title}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Year:</div>
                  <div className={styles.itemRight}>{data.Year}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Director:</div>
                  <div className={styles.itemRight}>{data.Director}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Country:</div>
                  <div className={styles.itemRight}>{data.Country}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Genre:</div>
                  <div className={styles.itemRight}>{data.Genre}</div>
                </div>

                <div className={styles.ParentItem}>
                  <div className={styles.item}>Production:</div>
                  <div className={styles.itemRight}>{data.Production}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Language:</div>
                  <div className={styles.itemRight}>{data.Language}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>BoxOffice:</div>
                  <div className={styles.itemRight}>{data.BoxOffice}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>DVD:</div>
                  <div className={styles.itemRight}>{data.DVD}</div>
                </div>
                <div className={styles.ParentItem}>
                  <div className={styles.item}>Awards:</div>
                  <div className={styles.itemRight}>{data.Awards}</div>
                </div>
              </div>
            </div>

            <Divider className={styles.divid} />

            <div className={styles.containerBottom}>
              <div className={styles.Bottom}>
                <div className={styles.itemRight}>{data.Plot}</div>
              </div>
            </div>

            <Divider className={styles.divid} />

            <div className={styles.twoItem}>
              <div className={styles.containerTrailer}>
                <div>
                  <Trailer arg={arg} />
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

            <Divider className={styles.divid} />

            <div className={styles.containerComment}>
              <Comment id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCharacteristics;
