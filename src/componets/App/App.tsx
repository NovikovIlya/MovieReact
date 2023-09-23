import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Main.css';
import { Route, Routes } from 'react-router-dom';
import MovieCharacteristics from '../MovieCharacterisics/MovieCharacteristics';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../Login/LoginPage';
import Auth from '../Auth/Auth';

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
