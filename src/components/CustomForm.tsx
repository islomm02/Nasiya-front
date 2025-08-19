import React, { useState } from 'react';
import { Button, Input, Form as AntForm } from 'antd';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { LoginPasswordIcon, LoginUsernameIcon } from '../assets/icons';
import { API } from '../hooks/getEnv';
import toast from 'react-hot-toast';

const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .required("Login kiritish majburiy!")
    .min(3, "Login kamida 3 belgidan iborat bo‘lishi kerak!"),
  password: Yup.string()
    .required("Parol kiritish majburiy!")
    .min(5, "Parol kamida 5 belgidan iborat bo‘lishi kerak!"),
});

const CustomForm: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'refreshToken']);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    setGlobalError(null);
    console.log(values);
    
    try {
      const res = await axios.post(`${API}/auth/login`, values);
      if(res.data.message == "Invalid password"){
        toast.error("Notog'ri parol")
      }
      if(res.data.message == "User not found"){
        toast.error("Foydalanuvchi topilmadi")
      }
      
      
      if (res.data.token) {
        setCookie('token', res.data.token, { path: '/' });
        setCookie('refreshToken', res.data.refreshToken, { path: '/' });
        toast.success("Xush kelibsiz!")
        navigate('/');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const res = await axios.post(`${API}/auth/refresh`, {
            refreshToken: cookies.refreshToken,
          });

          const newAccessToken = res.data.token;
          setCookie("token", newAccessToken)


        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }

        removeCookie("token");
        navigate("/login");
      }
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, values, touched, errors }) => (
        <Form className="flex flex-col ">
          <AntForm.Item
            validateStatus={errors.login && touched.login ? 'error' : ''}
            help={touched.login && errors.login ? errors.login : ''}
          >
            <Input
            className='h-[48px]'

              name="login"
              placeholder="Login"
              prefix={<LoginUsernameIcon />}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
   
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
