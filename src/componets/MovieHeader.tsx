import React from 'react'
import MovieTitle from './MovieTitle'
import Search from './Search'
import styles from './Movie.module.scss'

const MovieHeader = () => {
  return (
    <div className={styles.container}>
        <div ><MovieTitle/></div>
        <div><Search/></div>
    </div>
  )
}

export default MovieHeader