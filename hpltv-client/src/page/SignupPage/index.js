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
} from './styles';
import ItemForm from '../../components/Common/ItemForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import LogoImage from '../../components/Common/ImageBanner';
import { API_SIGNUP } from '../../configs/apis';
import { Helmet } from 'react-helmet-async';

function SignupPage() {
  const [textError, setTextError] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [options, setOptions] = useState([
    {
      value: 'Nam',
      label: 'Nam',
    },
    {
      value: 'Nữ',
      label: 'Nữ',
    },
  ]);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng ký thành công, mật khẩu sẽ được gửi tới email của bạn.',
      duration: 1.5,
    });
  };

  // bấm đăng ký
  const onFinish = async (values) => {
    const response = await fetch(API_SIGNUP, {
      method: 'POST',
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        sex: values.sex,
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
      }, 1000);
    } else {
      setTextError(responseJson.message);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const handleFocus = () => {
    setTextError();
  };

  return (
    <DivAuth>
      <Helmet>
        <title>Signup Showhub</title>
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
          <TextContent>Đăng ký ShowHub</TextContent>
          <DivForm>
            <Form
              form={form}
              name="signupForm"
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
                label="Họ"
                name="lastName"
                message="Vui lòng nhập họ của bạn!"
                input={<Input onFocus={handleFocus} />}
              />
              <ItemForm
                label="Tên"
                name="firstName"
                message="Vui lòng nhập tên của bạn!"
                input={<Input onFocus={handleFocus} />}
              />
              <ItemForm
                label="Email"
                name="email"
                message="Vui lòng nhập email của bạn!"
                input={<Input onFocus={handleFocus} />}
              />
              <ItemForm
                label="Số điện thoại"
                name="phoneNumber"
                message="Vui lòng nhập số điện thoại của bạn!"
                input={<Input onFocus={handleFocus} />}
              />
              <ItemForm
                label="Giới tính"
                name="sex"
                message="Vui lòng nhập giới tính của bạn!"
                input={
                  <Select
                    className="select-sex-signup"
                    style={{
                      width: '100%',
                      textAlign: 'left',
                    }}
                    allowClear
                    options={options}
                  />
                }
              />

              <Form.Item
                className="btn-login"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Đăng ký</Button>
              </Form.Item>
              <DivError>{textError}</DivError>
              <DivLink>
                <Text>
                  Đã có tài khoản? <Link to="/auth/login">Đăng nhập</Link>
                </Text>
              </DivLink>
            </Form>
          </DivForm>
        </DivContent>
      </DivContainer>
    </DivAuth>
  );
}

export default SignupPage;
