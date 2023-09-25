import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LoginApi, useAuthApiQuery } from '../../store/MovieApi';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';
import styles from './LoginPage.module.scss';
import { Input as AntdInput, Button as AndtdButton, message } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LoginOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface FormInputs {
  username: string;
  password: string;
}

const items: MenuProps['items'] = [
  {
    label: 'Login',
    key: 'mail',
    icon: <LoginOutlined />,
  },
  {
    label: (
      <Link to="/auth" rel="noopener noreferrer">
        Sign up
      </Link>
    ),
    icon: <DatabaseOutlined />,
    key: 'alipay',
  },
];

function LoginPage() {
  const [go,setGo] = useState('')
  const [current, setCurrent] = useState('mail');
  const [messageApi, contextHolder] = message.useMessage();
  const [LoginApiSet, result] = LoginApi.useLoginApiSetMutation();
  const { data: dataApi, refetch } = useAuthApiQuery(go,{skip: true});
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: 'all',
  });

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onSubmit = async (data) => {
    try {
      const tok = await LoginApiSet(data);
      //@ts-ignore
      localStorage.setItem('token', tok.data.token);
      // refetch();
      setGo('')
    } catch (e) {
      console.log(e);
      console.log(errors);
    }
  };
  const onSubmit1 = async () => {
    try {
      const tok = await LoginApiSet({ username: 'papa123', password: 'papa321' });
      //@ts-ignore
      localStorage.setItem('token', tok.data.token);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (dataApi) {
      console.log('dadaApi',dataApi)
      navigate('/');
    }
  }, [dataApi, navigate]);
 
  useEffect(() => {
    if (result.error) {
      const info = () => {
        messageApi.info('This user was not found!');
      };
      info();
    }
  }, [result.error,messageApi]);

  return (
    <>
      {contextHolder}
      <Menu
        className={styles.menu}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <Controller
            render={({ field }) => <AntdInput placeholder="Username" {...field} />}
            rules={{
              required: 'Field cannot be empty',
              minLength: { value: 4, message: 'Minimum 4 characters' },
            }}
            name="username"
            control={control}
            defaultValue=""
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ messages }) => {
              console.log('messages', messages);
              return messages
                ? _.entries(messages).map(([type, message]: [string, string]) => (
                    <p className={styles.error} key={type}>
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>

        <Controller
          render={({ field }) => <AntdInput placeholder="Password" type="password" {...field} />}
          rules={{
            required: 'Field cannot be empty',
            minLength: { value: 4, message: 'Minimum 4 characters' },
          }}
          name="password"
          control={control}
          defaultValue=""
        />

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            console.log('messages', messages);
            return messages
              ? _.entries(messages).map(([type, message]: [string, string]) => (
                  <p className={styles.error} key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        <div className={styles.container__btn}>
          <AndtdButton type="primary" htmlType="submit">
            Send
          </AndtdButton>
        </div>
        <div className={styles.container__btn}>
          <AndtdButton type="primary" htmlType="button" onClick={onSubmit1}>
            Enter test user
          </AndtdButton>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
