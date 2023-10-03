import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Main.css';
import { Route, Routes } from 'react-router-dom';
import MovieCharacteristics from '../MovieCharacterisics/MovieCharacteristics';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../Login/LoginPage';
import Auth from '../Auth/Auth';
import { ConfigProvider,  theme } from 'antd';
import { useAppSelector } from '../../hooks/redux';
import Profile from '../Profile/Profile';
import Layout from '../Layout/Layout';
import { Favorites } from '../Favorites/Favorites';

function App() {
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm,
        }}>
        <Routes>
        <Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/:id" element={<MovieCharacteristics />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<>Нет такого</>} />
            </Route>
            </Route>
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
