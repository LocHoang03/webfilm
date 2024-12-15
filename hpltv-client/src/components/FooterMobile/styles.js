import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivFooter = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--bg-header-2);
  height: 60px;
  width: 100%;
  z-index: 10000;
`;

export const RowFooter = styled.ul`
  display: flex;
  align-items: center;
  height: 60px;
`;

export const ColFooter = styled.li`
  width: 20%;

  & a {
    & > p:first-child {
      margin-bottom: 5px;
      & > span {
        font-size: 20px !important;
      }
    }
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }
`;
