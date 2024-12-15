import React, { useContext, useEffect, useState } from 'react';
import {
  ColLeft,
  ColRight,
  DivSearch,
  ButtonProfile,
  RowSearch,
  ProfileUser,
  ImageAvatar,
  NameUser,
  ButtonLogout,
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import InputSearchLayout from '../../InputSearch/InputSearch';
import { Dropdown } from 'antd';
import { CheckLoginContext } from '../../../contexts/LoginContext';
import { API_LOGOUT } from '../../../configs/apis';

function HeaderSearchLogin() {
  const { userInfo } = useContext(CheckLoginContext);

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(API_LOGOUT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const responseJson = await response.json();

    if (responseJson.success && localStorage.getItem('tokenUser')) {
      localStorage.removeItem('tokenUser');
      navigate('/landing-page');
    }
  };

  const items = [
    {
      key: 'profile',
      label: <Link to="/my-profile">Hồ sơ</Link>,
    },
    {
      key: 'myFavoriteMovies',
      label: <Link to="/my-favorite-movies">Phim yêu thích</Link>,
    },
    {
      key: 'logout',
      label: <ButtonLogout onClick={handleLogout}>Đăng xuất</ButtonLogout>,
    },
  ];

  return (
    <DivSearch>
      <RowSearch>
        <ColLeft span={16} lg={16} xl={16}>
          <InputSearchLayout />
        </ColLeft>
        <ColRight span={8} lg={8} xl={8}>
          <ProfileUser>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow>
              <ButtonProfile>
                <NameUser>
                  {user && user.lastName} {user && user.firstName}
                </NameUser>
                <ImageAvatar
                  src={user && user.avatarUser.url}
                  alt="image user"
                />
              </ButtonProfile>
            </Dropdown>
          </ProfileUser>
        </ColRight>
      </RowSearch>
    </DivSearch>
  );
}

export default HeaderSearchLogin;
