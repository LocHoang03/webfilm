import React, { useEffect, useState } from 'react';
import {
  ColLeft,
  ColRight,
  DivHeader,
  RowHeader,
  ContentHeader,
  ContainerHeader,
  Navbar,
  ItemNav,
  ListNav,
  DivHeaderMobile,
  DivContainerMobile,
} from './styles';
import HeaderNavBar from './Navbar';
import HeaderSearchLogin from './SearchAndLogin';
import HeaderMobile from './HeaderMobile';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return (
    <>
      {width >= 768 ? (
        <ContainerHeader>
          <DivHeader>
            <ContentHeader>
              <RowHeader>
                <ColLeft span={14} sm={10} lg={13} xl={14}>
                  <HeaderNavBar />
                </ColLeft>
                <ColRight span={10} sm={14} lg={11} xl={10}>
                  <HeaderSearchLogin />
                </ColRight>
              </RowHeader>
              <Navbar>
                <ListNav>
                  <ItemNav>
                    <Link
                      to="/"
                      className={pathname === '/' && 'bg-header-navbar'}>
                      Trang chủ
                    </Link>
                  </ItemNav>
                  <ItemNav>
                    <Link
                      to="/movies"
                      className={
                        pathname.slice(1) === 'movies' && 'bg-header-navbar'
                      }>
                      Phim lẻ
                    </Link>
                  </ItemNav>
                  <ItemNav>
                    <Link
                      to="/series"
                      className={
                        pathname.slice(1) === 'series' && 'bg-header-navbar'
                      }>
                      Phim bộ
                    </Link>
                  </ItemNav>
                  <ItemNav>
                    <Link
                      to="/contact"
                      className={
                        pathname.slice(1) === 'contact' && 'bg-header-navbar'
                      }>
                      Liên hệ
                    </Link>
                  </ItemNav>
                  <ItemNav>
                    <Link
                      to="/terms-and-conditions"
                      className={
                        pathname.slice(1) === 'terms-and-conditions' &&
                        'bg-header-navbar'
                      }>
                      Điều khoản và Điều kiện
                    </Link>
                  </ItemNav>
                </ListNav>
              </Navbar>
            </ContentHeader>
          </DivHeader>
        </ContainerHeader>
      ) : (
        <DivContainerMobile>
          <DivHeaderMobile>
            <HeaderMobile />
          </DivHeaderMobile>
        </DivContainerMobile>
      )}
    </>
  );
}

export default Header;
