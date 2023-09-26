import React from 'react';
import { useFetcTrailerQuery } from '../../store/MovieApi';
import styles from './Trailer.module.scss'
import Skeleton from './Skeleton'
import { argType } from '../../types';


const Trailer = ({id} : argType) => {
  const { data, isLoading } = useFetcTrailerQuery(id);


  const urlTrailer = data
    ? data.error
      ? `https://www.youtube.com/embed/dQw4w9WgXcQ`
      : `https://www.youtube.com/embed/${data?.videos[0]?.youtube_video_id}`
    : `https://www.youtube.com/embed/dQw4w9WgXcQ`;
  
  return (
    <>
      {isLoading ? (
        <div><Skeleton/></div>
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
