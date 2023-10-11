import React, { useRef } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../store/MovieApi';
import styles from './UserInfo.module.scss';
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  HomeOutlined,
  StarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const UserInfo = () => {
  const refUser = useRef();
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
    localStorage.setItem('token', '');
    dispatch(auth.util.resetApiState());
    refetch();
    navigate('/login');
  };
  const items: MenuProps['items'] = [
    getItem(
      <Link className={styles.lin} to="/">
        Home
      </Link>,
      '1',
      <HomeOutlined />,
    ),
    getItem(
      <Link className={styles.lin} to="/profile">
        Profile
      </Link>,
      '5',
      <UserOutlined />,
    ),
    getItem(
      <Link className={styles.lin} to="/favorites">
        Favorites
      </Link>,
      '3',
      <StarOutlined />,
    ),
    getItem(<div onClick={exitFnc}>Exit</div>, '6', <LogoutOutlined />),
    ,
  ];
  const navigate = useNavigate();
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');
  const dispatch = useAppDispatch();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className={styles.container}>
      <Dropdown className={styles.menu} menu={menuProps}>
        <Button>
          <Space>
            <MenuOutlined />
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserInfo;
