import React, { useEffect, useRef, useState } from 'react';
import { useFetchMoviesQuery } from '../../store/MovieApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addMovie, addValue } from '../../store/sliceMovie';
import { Input, Button } from 'antd';
import styles from './Search.module.scss';

const Search = (props) => {
  const {children = 'Search',placeholder} = props
  const ref = useRef<HTMLButtonElement>();
  const val = useAppSelector((state) => state.sliceMovie.value);
  const [arg, setArg] = useState<string>('');
  const { data, refetch } = useFetchMoviesQuery(val);
  const dispatch = useAppDispatch();

  const handleMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setArg(text);
    dispatch(addValue(text));
    console.log(text);
  };
  
 
  const fetchMovie = () => {
    if (val.length < 1) {
      alert('Введите текст');
      return;
    }
    dispatch(addMovie(data?.Search));

    refetch();
  };

  useEffect(() => {
    if (val.length < 1) {
      const keka = [
        {
          Title: 'Avengers: Endgame',
          Year: '2019',
          imdbID: 'tt4154796',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers: Infinity War',
          Year: '2018',
          imdbID: 'tt4154756',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers: Age of Ultron',
          Year: '2015',
          imdbID: 'tt2395427',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
        },
        {
          Title: 'The Avengers',
          Year: '1998',
          imdbID: 'tt0118661',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        },
        {
          Title: "The Avengers: Earth's Mightiest Heroes",
          Year: '2010–2012',
          imdbID: 'tt1626038',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg',
        },
        {
          Title: 'Ultimate Avengers: The Movie',
          Year: '2006',
          imdbID: 'tt0491703',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg',
        },
        {
          Title: 'Ultimate Avengers II',
          Year: '2006',
          imdbID: 'tt0803093',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
        },
        {
          Title: 'The Avengers',
          Year: '1961–1969',
          imdbID: 'tt0054518',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
        },
        {
          Title: 'Avengers Assemble',
          Year: '2012–2019',
          imdbID: 'tt2455546',
          Type: 'series',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg',
        },
      ];
      dispatch(addMovie(keka));
      refetch();
    }
  }, [dispatch,refetch,val.length]);

  return (
    <div className={styles.container}>
      <Input
        className={styles.container__inp}
        onChange={(e) => handleMovie(e)}
        value={val}
        placeholder={placeholder}
      />

      <Button className={styles.container__btn} ref={ref} onClick={() => fetchMovie()}>
        Search
      </Button>
    </div>
  );
};

export default Search;
