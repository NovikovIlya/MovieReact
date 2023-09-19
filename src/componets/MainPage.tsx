import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../App.module.scss';
import MovieList from './MovieList';
import '../Main.css';
import MovieHeader from './MovieHeader';
import { useAppSelector } from '../hooks/redux';
import { useAuthApiQuery } from '../store/MovieApi';
import { Navigate } from 'react-router-dom';



export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function App() {
  const [cat,setCat] = useState('')
  const MovieData = useAppSelector((state) => state.sliceMovie.films);
  const {data,refetch,isError} = useAuthApiQuery(cat)
  console.log('111', MovieData);
  console.log('55',data)
  console.log('666',isError)
  
  useEffect(()=>{
    setCat('')
    refetch()

  },[refetch])

  if(isError){
    return <Navigate to='/login'/>
    // window.location.replace('/login')
  }

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
