import React, { useEffect, useState } from 'react';
import styles from './Menubar.module.scss';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useLocation } from 'react-router-dom';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';
import { toggleDropdown } from '../../store/sliceMovie';
import { useAuthApiQuery } from '../../store/MovieApi';

const Menubar = () => {
  const { data, isFetching } = useAuthApiQuery('');
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [puk, setPuk] = useState(true);
  const numerKey = useAppSelector((state) => state.sliceMovie.dropdown);
  const items: MenuProps['items'] = [
    {
      label: (
        <Link className={styles.lin} to="/" rel="noopener noreferrer">
          Popular
        </Link>
      ),
      key: 'mail',
      icon: <TrophyOutlined />,
    },
    {
      label: (
        <Link className={styles.lin} to="/new">
          All
        </Link>
      ),
      icon: <StarOutlined />,
      key: 'alipay',
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(toggleDropdown(e.key));
    console.log(e.key);
  };

  useEffect(() => {
    let url = location;
    if (url.pathname === '/' || url.pathname === '/new') {
      console.log('ne pukl');
      setPuk(true);
    } else {
      console.log('pukl');
      setPuk(false);
      return;
    }

    if (url.pathname === '/') {
      dispatch(toggleDropdown('mail'));
    }
    if (url.pathname === '/new') {
      dispatch(toggleDropdown('alipay'));
    }
  }, [location, dispatch]);

  return (
    <>
      {!data ? (
        isFetching && <></>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemHoverColor: '#808080',
              },
            },
          }}>
          <div className={puk ? styles.container : styles.hidden}>
            <Menu
              className={styles.menu}
              onClick={onClick}
              selectedKeys={[numerKey]}
              mode="horizontal"
              items={items}
            />
          </div>
        </ConfigProvider>
      )}
    </>
  );
};

export default Menubar;
