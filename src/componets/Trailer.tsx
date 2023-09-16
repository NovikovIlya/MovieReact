import React from 'react';
import { useFetcTrailerQuery } from '../store/MovieApi';

const Trailer = ({ arg }) => {
  const { data, isLoading, isError } = useFetcTrailerQuery(arg);
  console.log(data);

  if (data){
    if (!data.error){
      console.log('все ок')
    }
    if(data.error){
      console.log('не ок')
      return <></>
    }
  }

  const urlTrailer = `https://www.youtube.com/embed/${data?.videos[0]?.youtube_video_id}`;
  return (
    <>
      {isLoading ? (
        <h1>Идет загрузка</h1>
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
