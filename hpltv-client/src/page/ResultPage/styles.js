import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivFilm = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px 0;
  min-height: 500px;
  color: var(--white-bg);
`;

export const Title = styled.h2`
  text-align: left;
  width: 100%;
  @media (max-width: 1200px) {
    margin-left: 10px;
  }
`;

export const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    max-width: 900px;
    margin: 0 auto;
    & .container-search {
      width: 100%;
      max-width: calc(100% - 20px);
    }
  }

  @media (max-width: 767px) {
    width: 100%;
    max-width: calc(100% - 20px);
  }
`;

export const DivSearch = styled.div`
  width: 100%;
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

export const DivNull = styled.div`
  margin-top: 150px;
  font-size: 24px;
  font-weight: 500;
`;
