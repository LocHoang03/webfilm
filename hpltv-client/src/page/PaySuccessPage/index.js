import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import {
  PaySuccessContainer,
  PaySuccessContent,
  Title,
  DivIcon,
  DivInformation,
  DivDetail,
  ListInfoDetail,
  ItemDetail,
  DivThanks,
  TitleThanks,
  DivRedirect,
  ButtonRedirect,
} from './styles.js';
import { useEffect, useState, useContext } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../contexts/LoginContext/index.js';
import dayjs from 'dayjs';
import { API_GET_PACKAGE_PAYMENT } from '../../configs/apis.js';
import { Helmet } from 'react-helmet-async';

//  thanh toán thành công
function PaySuccessPage(props) {
  const [dataPaymentSuccess, setDataPaymentSuccess] = useState();
  const [count, setCount] = useState(10);

  const { userInfo, setIsLogin } = useContext(CheckLoginContext);

  const navigate = useNavigate();
  // lấy thông tin gói phim người dùng vừa thanh toán
  useEffect(() => {
    const addPayment = async () => {
      const data = {
        userId: userInfo.userId,
      };
      const response = await fetch(API_GET_PACKAGE_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success === true) {
        setDataPaymentSuccess(responseJson.data[0]);
      }
    };
    addPayment();
  }, [userInfo]);

  useEffect(() => {
    let timer;
    if (count - 1 >= 0) {
      timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setIsLogin(2);
      localStorage.removeItem('login');
      navigate('/');
    }
    return () => clearTimeout(timer);
  }, [count]);

  const handleClickHomePage = () => {
    setIsLogin(2);
    localStorage.removeItem('login');
    navigate('/');
  };

  if (!dataPaymentSuccess) {
    return (
      <div className="loading-component">
        <div>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Pay Success</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <PaySuccessContainer>
        <PaySuccessContent>
          <DivIcon>
            <CheckCircleFilled />
          </DivIcon>
          <DivInformation>
            <Title>Thanh toán thành công</Title>
            <DivDetail>
              <ListInfoDetail>
                <ItemDetail>
                  <p>Id giao dịch:</p>
                  <p>{dataPaymentSuccess._id}</p>
                </ItemDetail>
                <ItemDetail>
                  <p>Tên gói:</p>{' '}
                  <p>{dataPaymentSuccess?.packageId?.typePack}</p>
                </ItemDetail>

                <ItemDetail>
                  <p>Thời gian thanh toán:</p>
                  <p>
                    {dayjs(dataPaymentSuccess.createAt).format('DD-MM-YYYY')}
                  </p>
                </ItemDetail>
                <ItemDetail>
                  <p>Ngày hết hạn:</p>
                  <p>
                    {dayjs(dataPaymentSuccess.expirationDate).format(
                      'DD-MM-YYYY',
                    )}
                  </p>
                </ItemDetail>
                <ItemDetail>
                  <p>Giá:</p>
                  <p>{dataPaymentSuccess?.packageId?.monthlyPrice} VND/tháng</p>
                </ItemDetail>
              </ListInfoDetail>
            </DivDetail>
          </DivInformation>
          <DivThanks>
            <TitleThanks>
              Cảm ơn bạn đã đăng ký gói phim của chúng tôi! Chúc bạn một trải
              nghiệm giải trí tuyệt vời.
            </TitleThanks>
          </DivThanks>
          <DivRedirect>
            <ButtonRedirect onClick={handleClickHomePage}>
              Tới trang chủ
              <ArrowRightOutlined />
            </ButtonRedirect>
            <span>Bạn sẽ được chuyển hướng sau {count}</span>
          </DivRedirect>
        </PaySuccessContent>
      </PaySuccessContainer>
    </>
  );
}

export default PaySuccessPage;
