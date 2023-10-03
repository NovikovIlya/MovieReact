import React, { useRef } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../store/MovieApi';
import styles from './UserInfo.module.scss';
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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
    getItem('Menu', 'sub1', <MenuOutlined />, [
      getItem(
        <Link className={styles.lin} to="/profile">
          Profile
        </Link>,
        '5',
      ),
      getItem(
        <Link className={styles.lin} to="/favorites">
          Favorites
        </Link>,
        '3',
      ),
      getItem(<div onClick={exitFnc}>Exit</div>, '6'),
    ]),
  ];
  const navigate = useNavigate();
  const { data: dataApi, refetch } = auth.useAuthApiQuery('');
  const dispatch = useAppDispatch();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  const onOpenChange =(e:any)=>{
    console.log('vv',e)
  }

  return (
    <div className={styles.container}>
      <div ref={refUser} className={styles.container__username}>{dataApi?.username}</div>
      <Menu 
      subMenuCloseDelay={0.1}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={{ width: 112 }}
        defaultSelectedKeys={[null]}
        defaultOpenKeys={[null]}  
        mode="vertical"
        items={items}
        className={styles.menu}
      />
    </div>
  );
};

export default UserInfo;
