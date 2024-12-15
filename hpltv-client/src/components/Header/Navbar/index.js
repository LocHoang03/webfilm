import React from 'react';
import { ColLeft, DivNavbar, RowNavbar } from './styles';
import { Link } from 'react-router-dom';
import LogoImage from '../../Common/ImageBanner';

function HeaderNavBar() {
  return (
    <DivNavbar>
      <RowNavbar>
        <ColLeft span={24} lg={24} xl={24}>
          <Link to="/">
            <LogoImage height="100%" width="90%" />
          </Link>
        </ColLeft>
      </RowNavbar>
    </DivNavbar>
  );
}

export default HeaderNavBar;
