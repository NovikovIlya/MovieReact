import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchMoviesOneQuery } from '../store/MovieApi';
import styles from './MovieCharacteristics.module.scss';
import Trailer from './Trailer';

const MovieCharacteristics = () => {
  const { title , year,id } = useParams();
  const arg = {
    title:title,
    year:year,
    id:id
  }
  const { data, isLoading } = useFetchMoviesOneQuery(arg);
  return (
    <div>
      <Link className={styles.link} to="/">
        Назад
      </Link>

      {isLoading ? (
        <h1>Идет загрузка</h1>
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
            <div className={styles.containerBottom}>
              <div className={styles.Bottom}>
                <div className={styles.itemRight}>{data.Plot}</div>
              </div>
            </div>
            <div className={styles.containerRating}>
              <div className={styles.Bottom}>
                <div className={styles.itemRight}>{data.Ratings.map(item=>{
                  return(
                    <>
                    <div>{item.Source}</div>
                    <div>{item.Value}</div>
                    </>
                  )
                })}</div>
              </div>
            </div>
            <div className={styles.containerTrailer}>
                <div><Trailer arg={arg}/></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCharacteristics;
