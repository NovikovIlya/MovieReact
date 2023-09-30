import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../App/App.module.scss';
import stylesDark from '../App/AppDark.module.scss'
import MovieList from '../MovieList/MovieList';
import '../../Main.css';
import MovieHeader from '../MovieHeader/MovieHeader';
import { useAppSelector } from '../../hooks/redux';
import { useAuthApiQuery } from '../../store/MovieApi';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Divider, Spin } from 'antd';

export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function MainPage() {
  const darkMode = useAppSelector((state)=>state.sliceMovie.darkMode)
  const navigate = useNavigate();
  const MovieData = useAppSelector((state) => state.sliceMovie.films);
  const { data, refetch, isFetching } = useAuthApiQuery('');

  const darkModeTheme = cn({
    [styles.container] : !darkMode,
    [stylesDark.container] : darkMode,
  })
  const darkModeThemeMain = cn({
    [styles.Main] : !darkMode,
    [stylesDark.Main] : darkMode,
  })

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
      // if(isFetching){
      //   navigate('/loading');
      // }
  
      if (!data) {
        if (!isFetching){
          navigate('/login');
        }
         
        
      }
    
  }, [ data, navigate,isFetching]);

  return (
    <>
    {!data ? isFetching &&         <div className={styles.zagr}>
          
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div> :
    <div className={darkModeThemeMain}>
      <div className={darkModeTheme}>
        <div className="container-fluid movie-app">
          <div>
            <MovieHeader />
          </div>
          <Divider className={styles.divi}/>
          <div className="row">
            <MovieList movie={MovieData} />
          </div>
        </div>
      </div>
      </div>}
    </>
  );
}

export default MainPage;
