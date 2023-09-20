import React, { useEffect, useRef, useState } from 'react';
import { useFetchMoviesQuery } from '../store/MovieApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addMovie, addValue } from '../store/sliceMovie';

const Search = () => {
  const ref = useRef<HTMLButtonElement>()
  const emptyToggle = useAppSelector((state)=>state.sliceMovie.empty)
  const val = useAppSelector((state) => state.sliceMovie.value);
  const [arg, setArg] = useState<string>('');
  const [argApi, setArgApi] = useState<string>(arg);
  const [empty,setEmpty] = useState<boolean>(false)

  const { data, isError, isLoading, refetch } = useFetchMoviesQuery(val);
  const dispatch = useAppDispatch();

  const handleMovie = (e:React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setArg(text);
    dispatch(addValue(text))
    console.log(text);
  };
  console.log('33',data)
  const keka = [
    {
    "Title": "All of Those Voices",
    "Year": "2023",
    "imdbID": "tt26675252",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMGZjODdjNDItYjk1NS00NTMyLWI2NzAtZTEwNzM5NDIyMWFjXkEyXkFqcGdeQXVyMTM1MDExOTE2._V1_SX300.jpg"
    },
    {
    "Title": "Ed Sheeran: The Sum of It All",
    "Year": "2023",
    "imdbID": "tt27192366",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYmE3YTEzOTctYTNlNS00ZmI4LTkzNjgtZDBiOWM3ZWU3OGRkXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg"
    },
    {
    "Title": "To End All War: Oppenheimer & the Atomic Bomb",
    "Year": "2023",
    "imdbID": "tt28240284",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTI1ZjI3MDctMzFmOC00NTZkLWI3ZjUtODMzNmI4MzM1NmRkXkEyXkFqcGdeQXVyNjQzMDEyOTI@._V1_SX300.jpg"
    },
    {
    "Title": "In Love All Over Again",
    "Year": "2023",
    "imdbID": "tt21206964",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzRjYjI5OGQtNWQ1Ni00YzhjLTlmODEtYWY2MjgwZmM3YzIxXkEyXkFqcGdeQXVyMTMxNjUyMDkx._V1_SX300.jpg"
    },
    {
    "Title": "All Your Faces",
    "Year": "2023",
    "imdbID": "tt24070754",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTU0YmE0MmYtM2Y1OC00ZWYwLTg3OWQtMjc1NjUzZjg0ODYyXkEyXkFqcGdeQXVyMjI1ODQ1MDk@._V1_SX300.jpg"
    },
    {
    "Title": "Rock Hudson: All That Heaven Allowed",
    "Year": "2023",
    "imdbID": "tt13514636",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOWI0NTljMzYtMjNiMS00ZTMxLTg0OWItNzI5ZmUzNjBiZDM2XkEyXkFqcGdeQXVyMTMzOTQyOTk1._V1_SX300.jpg"
    },
    {
    "Title": "Working: What We Do All Day",
    "Year": "2023",
    "imdbID": "tt27619797",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMmI3ZDIwZWQtZDRkNC00ZWI2LThkNDktNjVjYTkxN2MwYTRlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg"
    },
    {
    "Title": "Squared Love All Over Again",
    "Year": "2023",
    "imdbID": "tt26369131",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2UxMjEyNzUtNTViMy00YTNhLTk0N2MtOTNmNDYwZWMyZmM5XkEyXkFqcGdeQXVyMTAxMTM4NzU@._V1_SX300.jpg"
    },
    {
    "Title": "All Inclusive",
    "Year": "2023",
    "imdbID": "tt13370378",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BM2Q0NzUyNTMtMjljYS00YmYxLThiMWQtZDhmMjJlODY3YzUyXkEyXkFqcGdeQXVyNDA4NTIwOQ@@._V1_SX300.jpg"
    },
    {
    "Title": "All the Places",
    "Year": "2023",
    "imdbID": "tt12616964",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTg1ZjIxNTQtMjM5Ny00OGEyLWI2OTgtOGEzYzVkMDk4ZGFhXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg"
    }
    ]
  const fetchMovie = () => {
    if (val.length < 1 ){
      alert('Введите текст')
      return;
    }
    dispatch(addMovie(data?.Search));
    refetch();
    console.log('22', data);
  };
  useEffect(()=>{
    if (val.length < 1){
      dispatch(addMovie(keka));
      refetch();
      console.log('eemama')
    }
    
    // if (emptyToggle===true){
    //   // ref.current.click()
    //   dispatch(addMovie(data?.Search));
    // }
  },[dispatch])
  

  

  return (
    <div>
      <input onChange={(e) => handleMovie(e)} value={val} placeholder="Input text" />
      {/* {data.Error === 'Incorrect IMDb ID.'&&<h1>Пожалуйста впишите текст</h1>} */}
      <button ref={ref} onClick={() => fetchMovie()}>Ok</button>
     
    </div>
  );
};

export default Search;
