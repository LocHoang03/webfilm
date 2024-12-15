import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivNavbar = styled.div``;

export const RowNavbar = styled(Row)``;
export const ColLeft = styled(Col)`
  text-align: left;
  & a {
    color: var(--white);
    font-weight: bold;
    font-size: 36px;

    & img {
      width: 220px !important;
      height: 50px;
    }
  }
`;

export const ImageLogo = styled.img`
  width: 90%;
  cursor: pointer;
`;
