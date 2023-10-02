import React from 'react'
import { Outlet } from 'react-router-dom'
import MovieHeader from '../MovieHeader'
import { useAppSelector } from '../../hooks/redux'
import cn from 'classnames';
import styles from '../App/App.module.scss';
import stylesDark from '../App/AppDark.module.scss'


const Layout = () => {
    const darkMode = useAppSelector((state)=>state.sliceMovie.darkMode)
    const darkModeTheme = cn({
        [styles.container] : !darkMode,
        [stylesDark.container] : darkMode,
      })
      const darkModeThemeMain = cn({
        [styles.Main] : !darkMode,
        [stylesDark.Main] : darkMode,
      })
    
  return (
    <>
    <div className={darkModeThemeMain}>
        <div className={darkModeTheme}>
        <MovieHeader/>
        <Outlet />
        </div>
    </div>
      
    
   
    </>
  )
}

export default Layout