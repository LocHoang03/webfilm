import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivFilm = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px 0;
  min-height: 500px;
`;

export const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 767px) {
    width: 100%;
    max-width: calc(100% - 20px);
    margin: 0 auto;
  }
`;

export const Title = styled.h2`
  text-align: left;
  color: var(--white-bg);
  width: 100%;
  @media (max-width: 991px) {
    margin-left: 1rem;
  }
`;

export const RowPage = styled(Row)`
  width: 100%;
  margin-bottom: 50px;
`;
export const ColPage = styled(Col)`
  margin-top: 30px;
  padding: 0 10px;

  & div {
    padding: 0 !important;
  }
`;

export const DivInfo = styled.div`
  margin: 20% auto;

  & p {
    color: var(--white-bg);
    font-size: 20px;
    font-weight: 500;
  }
`;
