import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_GET_PACKAGE_PAYMENT, API_VERIFY_TOKEN } from '../../configs/apis';

export const CheckLoginContext = createContext();

function LoginContext({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [isLogin, setIsLogin] = useState(undefined);

  const location = useLocation();

  //  kiểm tra người dùng mua gói phim chưa
  const getOrder = async (userId) => {
    const data = {
      userId: userId,
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
    if (responseJson.success === true) {
      setIsLogin(2);
    } else {
      setIsLogin(1);
    }
  };

  // set lại login = undefined
  useEffect(() => {
    setIsLogin(undefined);
  }, [location.pathname]);

  useEffect(() => {
    setUserInfo(undefined);
    setIsLogin(undefined);
    const fetchUserInfo = async () => {
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const json = await response.json();

      if (json.success === true) {
        setUserInfo(json.userInfo);
        //  isAuth xem có xác thực chưa
        if (json.isAuth) {
          getOrder(json.userInfo.userId);
        } else {
          setIsLogin(0);
        }
      } else {
        setUserInfo();
        setIsLogin(-1);
      }
    };
    if (localStorage.getItem('tokenUser')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
      setIsLogin(-1);
    }
  }, [location]);

  //  thực hiện khi người dùng update lại profile
  useEffect(() => {
    setIsUpdateUser(false);
    const fetchUserInfo = async () => {
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
      } else {
        setUserInfo('');
      }
    };
    if (localStorage.getItem('tokenUser')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
    }
  }, [isUpdateUser]);

  const updateUserInfo = (token) => {
    const updateToken = async () => {
      await localStorage.removeItem('tokenUser');
      await localStorage.setItem('tokenUser', token);
      setIsUpdateUser((prev) => !prev);
    };
    updateToken();
  };

  return (
    <CheckLoginContext.Provider
      value={{
        userInfo,
        isLogin,
        updateUserInfo,
        setIsLogin,
      }}>
      {children}
    </CheckLoginContext.Provider>
  );
}

export default LoginContext;
