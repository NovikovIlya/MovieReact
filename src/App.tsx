import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import MovieCharacteristics from './componets/MovieCharacteristics';
import MainPage from './componets/MainPage';

import { initializeApp } from 'firebase/app';

import LoginPage from './componets/LoginPage';
import { useAuthApiQuery } from './store/MovieApi';
import Auth from './componets/Auth';




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<MovieCharacteristics />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<>Нет такого</>} />
      </Routes>
    </>
  );
}

export default App;
