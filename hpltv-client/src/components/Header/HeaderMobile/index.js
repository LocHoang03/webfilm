import React, { useContext, useEffect, useState } from 'react';
import {
  DivContentHeader,
  DivHeader,
  ButtonMenu,
  ColLeft,
  ColRight,
  RowSearch,
  ProfileUser,
  ImageAvatar,
  NameUser,
  ButtonLeft,
  DivShow,
} from './styles';

import HeaderMenu from './Menu';
import { Drawer } from 'antd';
import { CheckLoginContext } from '../../../contexts/LoginContext';
import InputSearchLayout from '../../InputSearch/InputSearch';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

  const { userInfo } = useContext(CheckLoginContext);

  const location = useLocation();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    setShow(false);
  }, [location.search]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <DivHeader>
      <DivContentHeader>
        <RowSearch>
          <ColLeft span={12}>
            <ButtonLeft onClick={handleShow} show={show}>
              <SearchOutlined />
              <DivShow show={show} width={window.innerWidth * 0.9}>
                <InputSearchLayout />
              </DivShow>
            </ButtonLeft>
          </ColLeft>
          <ColRight span={12}>
            <ButtonMenu onClick={showDrawer}>
              <ProfileUser>
                <NameUser>
                  {user && user.lastName} {user && user.firstName}
                </NameUser>
                <ImageAvatar
                  src={user && user.avatarUser.url}
                  alt="image user"
                />
              </ProfileUser>
            </ButtonMenu>
          </ColRight>
        </RowSearch>
      </DivContentHeader>

      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        className="drawerHeaderMenu">
        <HeaderMenu />
      </Drawer>
    </DivHeader>
  );
}

export default HeaderMobile;
