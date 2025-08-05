import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from "axios"
import { useCookies } from 'react-cookie';
import { LoginUsernameIcon, LoginPasswordIcon } from '../assets/icons'; // <-- Ikkala iconni import qildik
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
import { API } from '../hooks/getEnv';
const CustomForm: React.FC = () => {
  const [form] = Form.useForm();
  const [cookies, setCookie, removeCookie] = useCookies(['token', "refreshToken"]);
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false)

  const onFinish = async (values: any) => {
    setIsloading(true)

    console.log('Finish:', values);
    await axios.post(`${API}/auth/login`, { login: values.username, password: values.password })
      .then(data => {
        if (data.data.token) {
          setCookie('token', data.data.token, { path: '/' });
          setCookie('refreshToken', data.data.refreshToken, { path: '/' });
          navigate("/")
        }
        setTimeout(() => {
          setIsloading(false)
        }, 500);
      });
  };
  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Finish failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Login kiritish majburiy!' }]}
      >
        <Input
          placeholder="Login"
          prefix={<LoginUsernameIcon />} // <-- Icon prefix
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Parol kiritish majburiy!' }]}
      >
        <Input.Password
  placeholder="Parol"
  prefix={<LoginPasswordIcon />}
  iconRender={visible => (visible ? <EyeOutlined   /> : <EyeInvisibleOutlined />)}
/>

      </Form.Item>

      <a href='' className='text-[#3478F7] mb-[40px] flex justify-end'>Parolni unutdingizmi?</a>

      <Form.Item>
        <Button loading={isLoading} htmlType="submit" type="primary" block>
          Kirish
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
