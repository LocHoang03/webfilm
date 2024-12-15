import React, { useContext } from 'react';
import { DivFooter, RowFooter, ColFooter } from './styles';
import { Link } from 'react-router-dom';
import {
  ContactsOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons';

function FooterMobile() {
  return (
    <DivFooter>
      <RowFooter>
        <ColFooter>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <HomeOutlined />
            </p>
            <p>Trang chủ</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link to="/movies" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <PlayCircleOutlined />
            </p>
            <p>Phim lẻ</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link to="/series" style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <PlayCircleOutlined />
            </p>
            <p>Phim bộ</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link
            to="/contact"
            style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <ContactsOutlined />
            </p>
            <p>Liên hệ</p>
          </Link>
        </ColFooter>
        <ColFooter>
          <Link
            to="/terms-and-conditions"
            style={{ textDecoration: 'none', color: 'white' }}>
            <p>
              <ReadOutlined />
            </p>
            <p>T&C</p>
          </Link>
        </ColFooter>
      </RowFooter>
    </DivFooter>
  );
}

export default FooterMobile;
