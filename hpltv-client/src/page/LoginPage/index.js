import React, { useState } from 'react';
import {
  DivAuth,
  DivContent,
  DivContainer,
  DivBanner,
  DivForm,
  TextBanner,
  Text,
  DivLink,
  TextContent,
  DivError,
  DivLoginOther,
  DivText,
  DivLoginButton,
} from './styles';
import ItemForm from '../../components/Common/ItemForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import LogoImage from '../../components/Common/ImageBanner';
import { API_GET_LOGIN_GOOGLE, API_LOGIN } from '../../configs/apis';
import { Helmet } from 'react-helmet-async';
import imageGoogle from '../../assets/images/logo-google.jpg';

function LoginPage() {
  const [textError, setTextError] = useState();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng nhập thành công.',
      duration: 1,
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content:
        'Tài khoản của bạn đã bị khóa, vui lòng liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ!!',
      duration: 2.5,
    });
  };

  //xác nhận form ktra dữ liệu đăng nhập
  const onFinish = async (values) => {
    setTextError();
    const response = await fetch(API_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      if (responseJson.isBanned) {
        error();
      } else {
        await localStorage.setItem('tokenUser', responseJson.token);
        if (localStorage.getItem('tokenUser')) {
          success();
          setTimeout(() => {
            navigate('/two-factor-authentication');
          }, 1000);
        }
      }
    } else {
      setTextError(responseJson.message);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const handleFocus = () => {
    setTextError();
  };

  // login bằng google
  const handleLoginGoogle = async () => {
    window.location.href =
      process.env.REACT_APP_PUBLIC_HOST_BACKEND + '/api/auth/google';
  };

  return (
    <DivAuth>
      <Helmet>
        <title>Login Showhub</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {contextHolder}
      <DivContainer>
        <DivBanner>
          <TextBanner>
            <LogoImage height="60" width="400" />
          </TextBanner>
        </DivBanner>
        <DivContent>
          <TextContent>Đăng nhập vào ShowHub</TextContent>
          <DivForm>
            <Form
              name="loginForm"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <ItemForm
                label="Email"
                name="email"
                message="Vui lòng nhập email của bạn!"
                input={<Input onFocus={handleFocus} />}
              />

              <ItemForm
                label="Mật khẩu"
                name="password"
                message="Vui lòng nhập mật khẩu của bạn!"
                input={<Input.Password onFocus={handleFocus} />}
              />

              <Form.Item
                className="btn-login"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Đăng nhập</Button>
              </Form.Item>
              <DivError>{textError}</DivError>
            </Form>
            <DivLoginOther>
              <DivText>
                <div></div>
                <div>HOẶC</div>
                <div></div>
              </DivText>
              <DivLoginButton>
                <button onClick={handleLoginGoogle}>
                  <img src={imageGoogle} alt="logo-google" />{' '}
                  <span>Google</span>
                </button>
              </DivLoginButton>
            </DivLoginOther>
            <DivLink>
              <Text>
                Bạn là người mới? <Link to="/auth/signup">Đăng ký</Link>
              </Text>
              <Text>
                <Link to="/auth/forgot-password">Quên mật khẩu?</Link>
              </Text>
            </DivLink>
          </DivForm>
        </DivContent>
      </DivContainer>
    </DivAuth>
  );
}

export default LoginPage;
