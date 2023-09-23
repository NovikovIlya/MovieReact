import React from 'react';
import { useFetcTrailerQuery } from '../../store/MovieApi';
import styles from './Trailer.module.scss'

const Trailer = ({ arg }) => {
  const { data, isLoading } = useFetcTrailerQuery(arg);


  if (data) {
    if (!data.error) {
      console.log('все ок');
    }
    if (data.error) {
      console.log('не ок');
  
    }
  }

  const urlTrailer = data
    ? data.error
      ? `https://www.youtube.com/embed/dQw4w9WgXcQ`
      : `https://www.youtube.com/embed/${data?.videos[0]?.youtube_video_id}`
    : `https://www.youtube.com/embed/dQw4w9WgXcQ`;
  console.log('xc', urlTrailer);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <div className="video-responsive">
              <iframe
                width="600"
                height="480"
                src={urlTrailer}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Trailer;
