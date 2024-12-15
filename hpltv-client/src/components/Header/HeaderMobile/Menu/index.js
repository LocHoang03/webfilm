import React from 'react';
import { DivMenu, DivPage, ListNav, ItemNav, TextTitle } from './styles';
import { RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { API_LOGOUT } from '../../../../configs/apis';
function HeaderMenu(props) {
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
  return (
    <DivMenu>
      <TextTitle>ShowHub</TextTitle>
      <DivPage>
        <ListNav>
          <ItemNav>
            <Link to="/my-profile">
              <span>Hồ sơ</span>
              <span>
                <RightOutlined />
              </span>
            </Link>
          </ItemNav>
          <ItemNav>
            <Link to="/my-favorite-movies">
              <span>Danh sách phim yêu thích</span>
              <span>
                <RightOutlined />
              </span>
            </Link>
          </ItemNav>
          <ItemNav>
            <button onClick={handleLogout}>
              <span>Đăng xuất</span>
              <span>
                <RightOutlined />
              </span>
            </button>
          </ItemNav>
        </ListNav>
      </DivPage>
    </DivMenu>
  );
}

export default HeaderMenu;
