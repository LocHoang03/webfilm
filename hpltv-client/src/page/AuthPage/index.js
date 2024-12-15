import {
  AuthContainer,
  AuthContent,
  Title,
  Text,
  DivInformation,
  DivDetail,
  ButtonVerify,
  DivHeader,
  DivResend,
} from './styles.js';
import { Form, Input, message } from 'antd';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent/index.js';
import { API_RESEND_CODE, API_VERIFY_LOGIN } from '../../configs/apis.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CheckLoginContext } from '../../contexts/LoginContext/index.js';
import { Helmet } from 'react-helmet-async';

function AuthPage() {
  const [count, setCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { userInfo } = useContext(CheckLoginContext);

  useEffect(() => {
    let timer;
    if (count - 1 >= 0) {
      timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [count]);

  // thong bao thanh cong
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Xác nhận thành công.',
      duration: 1,
    });
  };
  // thong bao that bai

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg ? msg : 'Mã xác nhận không chính xác!!',
      duration: 2.5,
    });
  };

  // xác nhận form
  const onFinish = async (values) => {
    const response = await fetch(API_VERIFY_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        code: values.code,
      }),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      success();
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      error();
    }
  };
  const onFinishFailed = (errorInfo) => {};

  //  kiểm tra xem thời gian yêu cầu lại mã xác nhận đủ  60s chưa

  const handleSetSendRequest = async () => {
    const data = {
      email: userInfo.email,
    };
    const response = await fetch(API_RESEND_CODE, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
      },
    });
    const json = await response.json();
    if (json.success) {
      setCount(60);
    } else {
      error('Không đủ thời gian để yêu cầu lại!!');
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContainer>
        <Helmet>
          <title>Auth Code</title>
          <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
        </Helmet>
        <DivHeader>
          <div>
            <HeaderPaymentComponent />
          </div>
        </DivHeader>
        <AuthContent>
          <DivInformation>
            <Title>Xác thực hai yếu tố</Title>
            <Text>
              Mở gmail và xem gmail xác thực của bạn và nhập mã cho ShowHub.
            </Text>
            <DivDetail>
              <Form
                name="verifyForm"
                labelCol={{
                  flex: '110px',
                }}
                labelAlign="left"
                labelWrap
                wrapperCol={{
                  flex: 1,
                }}
                colon={false}
                style={{
                  maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mã xác nhận!!',
                    },
                  ]}>
                  <Input placeholder="Nhập mã gồm 6 chữ số!!" />
                </Form.Item>

                <Form.Item label="">
                  <ButtonVerify type="primary" htmlType="submit">
                    Xác minh
                  </ButtonVerify>
                </Form.Item>
              </Form>
              <DivResend>
                {count > 0 ? (
                  <p>Gửi yêu cầu của bạn sau {count}</p>
                ) : (
                  <p>
                    Chưa nhận được mã?&nbsp;
                    <button onClick={handleSetSendRequest}>
                      Yêu cầu gửi lại
                    </button>
                  </p>
                )}
              </DivResend>
            </DivDetail>
          </DivInformation>
        </AuthContent>
      </AuthContainer>
    </>
  );
}

export default AuthPage;
