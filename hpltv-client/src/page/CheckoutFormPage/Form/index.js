import React, { useContext, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FormCheckout, ButtonCheckout, DivError } from './styles';
import { useNavigate } from 'react-router-dom';
import { API_ADD_DATA_PACKAGE_PAYMENT } from '../../../configs/apis';
import { CheckLoginContext } from '../../../contexts/LoginContext';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { userInfo, isLogin } = useContext(CheckLoginContext);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const clientSecret = props.clientSecret;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://google.com',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      const addPayment = async () => {
        const dataPayment = await JSON.parse(
          localStorage.getItem('dataPayment'),
        );

        const data = {
          packageId: dataPayment._id,
          userId: userInfo.userId,
        };
        let response;
        // api gọi khi thanh toán thành công
        if (isLogin === 2) {
          response = await fetch(API_ADD_DATA_PACKAGE_PAYMENT + '?login=true', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
              'Content-Type': 'application/json',
            },
          });
        } else {
          response = await fetch(
            API_ADD_DATA_PACKAGE_PAYMENT + '?login=false',
            {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
              },
            },
          );
        }
        //sau đó chuyển tới trang thanh toán thành công
        const responseJson = await response.json();
        if (responseJson.success) {
          await localStorage.setItem('login', true);
          navigate('/payment-success');
          localStorage.removeItem('dataPayment');
        }
      };
      addPayment();
    }
  };

  return (
    <FormCheckout onSubmit={handleSubmit}>
      <PaymentElement />
      <ButtonCheckout type="submit" disabled={!stripe || !elements}>
        Thanh toán
      </ButtonCheckout>
      {errorMessage && <DivError>{errorMessage}</DivError>}
    </FormCheckout>
  );
};

export default CheckoutForm;
