import React, { useEffect, useState } from 'react';
import {
  DivAuth,
  DivContent,
  DivContainer,
  DivBanner,
  DivForm,
  TextBanner,
  TextContent,
  DivError,
} from './styles';
import ItemForm from '../../components/Common/ItemForm';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import LogoImage from '../../components/Common/ImageBanner';
import {
  API_NEW_PASSWORD,
  API_VERIFY_TOKEN_RESET_PASSWORD,
} from '../../configs/apis';
import LoadingPage from '../LoadingPage';
import { Helmet } from 'react-helmet-async';

function ResetPasswordPage() {
  const [textError, setTextError] = useState();
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { token } = useParams();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Mật khẩu đã được thay đổi thành công.',
    });
  };

  useEffect(() => {
    // kiểm tra token lấy lại mật khẩu đã hết hạn chưa
    const verifyToken = async () => {
      const response = await fetch(API_VERIFY_TOKEN_RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();

      if (responseJson.success) {
        setValidToken(true);
      } else {
        setValidToken(false);
      }
    };
    verifyToken();
  }, [token]);

  const onFinish = async (values) => {
    const response = await fetch(API_NEW_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
        token: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      success();
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } else {
      setTextError(responseJson.message);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const handleFocus = () => {
    setTextError();
  };

  if (!validToken) {
    return <LoadingPage />;
  }

  return (
    <DivAuth>
      <Helmet>
        <title>Reset Password</title>
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
          <TextContent>Đặt lại mật khẩu</TextContent>
          <DivForm>
            <Form
              form={form}
              name="forgotPasswordForm"
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
                label="Mật khẩu mới"
                name="newPassword"
                message="Vui lòng nhập mật khẩu mới của bạn!"
                input={<Input.Password onFocus={handleFocus} />}
              />
              <ItemForm
                label="Xác nhận mật khẩu mới"
                name="confirmNewPassword"
                message="Vui lòng nhập xác nhận mật khẩu mới của bạn!"
                input={<Input.Password onFocus={handleFocus} />}
              />

              <Form.Item
                className="btn-login"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Xác nhận</Button>
              </Form.Item>
              <DivError>{textError}</DivError>
            </Form>
          </DivForm>
        </DivContent>
      </DivContainer>
    </DivAuth>
  );
}

export default ResetPasswordPage;
