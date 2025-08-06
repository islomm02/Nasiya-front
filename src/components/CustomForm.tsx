import React, { useState } from 'react';
import { Button, Input, Form as AntForm } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { LoginPasswordIcon, LoginUsernameIcon } from '../assets/icons';
import { API } from '../hooks/getEnv';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Login kiritish majburiy!")
    .min(3, "Login kamida 3 belgidan iborat bo‘lishi kerak!"),
  password: Yup.string()
    .required("Parol kiritish majburiy!")
    .min(5, "Parol kamida 5 belgidan iborat bo‘lishi kerak!"),
});

const CustomForm: React.FC = () => {
  const [cookies, setCookie] = useCookies(['token', 'refreshToken']);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    setGlobalError(null);
    try {
      const res = await axios.post(`${API}/auth/login`, values);
      if (res.data.token) {
        setCookie('token', res.data.token, { path: '/' });
        setCookie('refreshToken', res.data.refreshToken, { path: '/' });
        navigate('/');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || 'Login yoki parol noto‘g‘ri';
        setGlobalError(msg);
      } else {
        setGlobalError("Noma'lum xatolik yuz berdi.");
      }
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, values, touched, errors }) => (
        <Form className="flex flex-col gap-4">
          <AntForm.Item
            validateStatus={errors.username && touched.username ? 'error' : ''}
            help={touched.username && errors.username ? errors.username : ''}
          >
            <Input
            className='h-[48px]'

              name="username"
              placeholder="Login"
              prefix={<LoginUsernameIcon />}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
   
   />
          </AntForm.Item>

          <AntForm.Item
            validateStatus={errors.password && touched.password ? 'error' : ''}
            help={touched.password && errors.password ? errors.password : ''}
          >
            <Input.Password
            className='h-[48px]'
              name="password"
              placeholder="Parol"
              prefix={<LoginPasswordIcon />}
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </AntForm.Item>

          {globalError && (
            <div className="text-red-500 text-sm text-center">{globalError}</div>
          )}

          <a
            href="#"
            className="text-[#3478F7] mb-[40px] flex justify-end text-sm"
          >
            Parolni unutdingizmi?
          </a>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Kirish
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
