import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../store/MovieApi';
import styles from './UserInfo.module.scss';
import { Button } from 'antd';

import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const UserInfo = () => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const exitFnc = () => {
    localStorage.setItem('token', 'test');
    dispatch(auth.util.resetApiState());
    refetch();
    navigate('/login');
  };
  const items: MenuProps['items'] = [
    getItem('Menu', 'sub1', <MenuOutlined />, [
      getItem(      <Link className={styles.lin} to="/profile"  >
      Profile
    </Link>, '5'),
      getItem(<div onClick={exitFnc}>EXIT</div>, '6'),
     
    ]),
  
    

  ];
  const navigate = useNavigate();
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');
  const dispatch = useAppDispatch();
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__username}>{dataApi?.username}</div>
      {/* <Button onClick={exitFnc}>EXIT</Button> */}
      <Menu
      onClick={onClick}
      style={{ width: 112 }}
      defaultSelectedKeys={[null]}
      defaultOpenKeys={[null]}
      mode="inline"
      items={items}
      className={styles.menu}
    />
    </div>
  );
};

export default UserInfo;
