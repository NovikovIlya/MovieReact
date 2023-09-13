import React, { useState } from 'react';
import { useFetchMoviesQuery } from '../store/MovieApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addMovie, addValue } from '../store/sliceMovie';

const Search = () => {
  const val = useAppSelector((state) => state.sliceMovie.value);
  const [arg, setArg] = useState<string>('');
  const [argApi, setArgApi] = useState<string>(arg);

  const { data, isError, isLoading, refetch } = useFetchMoviesQuery(val);
  const dispatch = useAppDispatch();

  const handleMovie = (e) => {
    const text = e.target.value;
    setArg(text);
    dispatch(addValue(text))
    console.log(text);
  };

  const fetchMovie = () => {
    dispatch(addMovie(data?.Search));
    refetch();
    console.log('22', data);
  };

  return (
    <div>
      <input onChange={(e) => handleMovie(e)} value={val} placeholder="Input text" />
      <button onClick={() => fetchMovie()}>Ok</button>
     
    </div>
  );
};

export default Search;
