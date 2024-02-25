import React, { useEffect, useState } from 'react';
import styles from '../Similar/Similar.module.scss';
import { useSimilarFetchQuery } from '../../store/MovieApi';
import { MovieYts } from '../../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../Main.css';
import { Button, Divider, Modal } from 'antd';

const ImageComp = ({ id }: any) => {
  const [modalData, setModaldata] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idKP, setIDKP] = useState('');
  const [data, setData] = useState([]);
  const [text, setText] = useState(null);
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const settings = {
    centerMode: true,
    slidesToShow: mobile ? 1 : data?.length > 2 ? 3 : 1,
    speed: 500,
  };

  const fetchImage = async (id) => {
    try {
      setIsLoading(true);
      const data = await fetch(`https://api.kinopoisk.dev/v1.4/movie?externalId.imdb=${id}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
        },
      });
      const res = await data.json();
      setIDKP(res.docs[0].id); // Устанавливает idKP из первого элемента массива
    } catch (error) {
      console.log(error);
    } finally {
      fetchImageFull(idKP); // Использует правильно установленное значение idKP
    }
  };
  const fetchImageFull = async (idKP) => {
    if (idKP)
      try {
        const data = await fetch(`https://api.kinopoisk.dev/v1.4/image?movieId=${idKP}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
          },
        });
        const res = await data.json();
        const images = res.docs.map((item) => item.url);
        setData(images);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
  };
  const showModal = (item) => {
    setModaldata(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 

  useEffect(() => {
    fetchImage(id);
  }, [, idKP]);

  return (
    <>
      {!isLoading && data.length > 0 && (
        <>
          <Divider  style={{backgroundColor:'rgb(255, 255, 255'}}/>
          <div className={styles.container}>
            <h2 className={styles.head}>Screenshots:</h2>
            <Slider {...settings}>
              {isLoading ? (
                <div></div>
              ) : (
                data?.map((item) => {
                  return (
                    <div key={item.url} className={styles.lin}>
                      <div>
                        <img
                          style={{ cursor: 'pointer' }}
                          onClick={() => showModal(item)}
                          className={styles.img3}
                          src={item}
                          alt="no"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </Slider>
          </div>
          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
            <img className={styles.img2} src={modalData} alt="no" />
          </Modal>
        </>
      )}
    </>
  );
};

export default ImageComp;
