import Footer from '../../components/Footer';
import {
  PaymentContainer,
  PaymentHeader,
  OptionPack,
  TitleOption,
  DivIconOption,
  DivText,
  DivFooter,
  DivActionCheckout,
  ButtonCheckout,
} from './styles';
import { LockOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// lựa chọn phương thức thanh toán
function OptionCheckoutPage(props) {
  const [data, setData] = useState();

  useEffect(() => {
    const dataPayment = JSON.parse(localStorage.getItem('dataPayment'));
    setData(dataPayment);
  }, []);
  const navigate = useNavigate();
  const handleClickCheckout = async () => {
    navigate('/checkout');
  };

  return (
    <PaymentContainer>
      <Helmet>
        <title>Option Checkout</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {!props.login && (
        <PaymentHeader>
          <HeaderPaymentComponent />
        </PaymentHeader>
      )}
      <OptionPack>
        <DivIconOption>
          <LockOutlined />
        </DivIconOption>
        <TitleOption>Chọn phương thức thanh toán</TitleOption>
        <DivText>
          <div>
            Quy trình thanh toán của bạn được mã hóa và bạn có thể thay đổi
            khoản thanh toán của mình phương pháp bất cứ lúc nào.
          </div>
          <div>
            <div>An toàn cho sự yên tâm.</div>
            <div>Hủy trực tuyến dễ dàng.</div>
          </div>
        </DivText>
        <DivActionCheckout>
          <ButtonCheckout onClick={handleClickCheckout}>
            <span>
              Tín dụng
              <img
                src="https://res.cloudinary.com/dzxupp48t/image/upload/v1709902109/image-webFilm/di2u3ywiwhwubo7xjqt4.png"
                alt="credit"
              />
            </span>
            <span>
              <RightOutlined />
            </span>
          </ButtonCheckout>
        </DivActionCheckout>
      </OptionPack>
      {!props.login && (
        <DivFooter>
          <Footer />
        </DivFooter>
      )}
    </PaymentContainer>
  );
}

export default OptionCheckoutPage;
