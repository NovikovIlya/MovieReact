import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../App.module.scss';
import MovieList from './MovieList';
import '../Main.css';
import MovieHeader from './MovieHeader';
import { useAppSelector } from '../hooks/redux';


export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function App() {
  const MovieData = useAppSelector((state) => state.sliceMovie.films);

  console.log('111', MovieData);

  return (
    <>
      <div className={styles.container}>
        <div className="container-fluid movie-app">
          <div className="">
            <MovieHeader />
          </div>
          <div className="row">
            <MovieList movie={MovieData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
