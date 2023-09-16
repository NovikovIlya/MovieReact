import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Route, Routes } from 'react-router-dom';
import MovieCharacteristics from './componets/MovieCharacteristics';
import MainPage from './componets/MainPage';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBfQpzQuNJHXJ2uMsCqPQakUrGfduYVCWY",
  authDomain: "appmovie-c96b8.firebaseapp.com",
  projectId: "appmovie-c96b8",
  storageBucket: "appmovie-c96b8.appspot.com",
  messagingSenderId: "1031891798066",
  appId: "1:1031891798066:web:aae879251f93e304e4942b",
  measurementId: "G-CNFHDFLY84"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
  useEffect(()=>{
    async function kek(){
      let response = await fetch('https://api.allorigins.win/raw?url=https://api.kinocheck.de/shows?tmdb_id=38472')
      let dada = await response.json()
      console.log(dada)
    }
    kek()
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MovieCharacteristics />} />
        <Route path="*" element={<>Нет такого</>} />
      </Routes>
    </>
  );
}

export default App;
