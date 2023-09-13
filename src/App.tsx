import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Route, Routes } from 'react-router-dom';
import MovieCharacteristics from './componets/MovieCharacteristics';
import MainPage from './componets/MainPage';

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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MovieCharacteristics />} />
        <Route path="*" element={<>Нет такого</>} />
      </Routes>
    </>
  );
}

export default App;
