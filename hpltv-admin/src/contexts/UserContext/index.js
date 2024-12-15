import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_VERIFY_TOKEN } from '../../configs/apis';

export const RoleContext = createContext();

function UserContext({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState();
  const [isUpdateUser, setIsUpdateUser] = useState(false);

  const { pathname } = useLocation();

  // lấy thông tin ng dùng nếu đã đăng nhập
  useEffect(() => {
    // gọi api kèm token nếu đã đăng nhập thì lưu thông tin ng dùng ngược lại là setIsloginj = false tức là chưa đăng nhập
    const fetchUserInfo = async () => {
      setIsLogin(undefined);
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
        setIsLogin(true);
      } else {
        setUserInfo('');
        setIsLogin(false);
      }
    };
    if (localStorage.getItem('tokenManager')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
      setIsLogin(false);
    }
  }, [pathname]);

  // kiểm tra xem có token tên là: tokenManager hay chưa nếu có thì cho vô set biến setIslogin là true, ngược lại là false
  useEffect(() => {
    setIsLogin(undefined);
    if (localStorage.getItem('tokenManager') && userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pathname]);

  // update ho so user
  useEffect(() => {
    setIsUpdateUser(false);
    const fetchUserInfo = async () => {
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
      } else {
        setUserInfo('');
      }
    };
    if (localStorage.getItem('tokenManager')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
    }
  }, [isUpdateUser]);

  //  cập nhạt lại thong tin token
  const updateUserInfo = (token) => {
    const updateToken = async () => {
      await localStorage.removeItem('tokenManager');
      await localStorage.setItem('tokenManager', token);
      setIsUpdateUser((prev) => !prev);
    };
    updateToken();
  };

  return (
    <RoleContext.Provider
      value={{
        userInfo,
        isLogin,
        updateUserInfo,
      }}>
      {children}
    </RoleContext.Provider>
  );
}

export default UserContext;
