import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivFooter = styled.div`
  border-top: 2px solid var(--border-color-sp);
  width: 100%;
  background: var(--bg-app);
  padding: 50px 0 20px;
  text-align: center;
  @media (max-width: 991px) {
    padding: 0;
  }
`;

export const DivContentFooter = styled.div`
  max-width: 1200px;
  margin: 10px auto;
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;

export const RowFooter = styled(Row)``;

export const ColFooterTop = styled(Col)`
  padding: 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 991px) {
    padding: 20px 40px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid white;

    & img {
      width: 600px;
      height: 200px;
    }
  }

  @media (max-width: 991px) {
    & img {
      width: 400px;
      height: 130px;
    }
  }

  @media (max-width: 575px) {
    border-bottom: 1px solid white;
    padding: 25px 10px;
    display: flex;
    justify-content: center;
    & img {
      width: 90%;
      height: 100px;
    }
  }
`;

export const ColFooterMiddle = styled(Col)`
  padding: 0 1rem;

  @media (max-width: 991px) {
    padding: 20px 40px;
    border-bottom: 1px solid white;
  }

  @media (max-width: 575px) {
    border-bottom: 1px solid white;
    padding: 20px 0;
  }
`;

export const ColFooterBot = styled(Col)`
  padding: 0 1rem;
  @media (max-width: 991px) {
    padding: 20px 40px;
  }
  @media (max-width: 575px) {
    padding: 20px 0;
  }
`;

export const Text = styled.p`
  font-size: 13px;
  text-align: left;
  color: var(--white);
  margin-bottom: 10px;

  & span {
    text-decoration: underline;
    color: var(--border-color-sp);
  }

  @media (max-width: 575px) {
    font-size: 16px;
    margin: 0 16px 10px;
    line-height: 1.4;
    font-weight: 400;
  }

  @media (max-width: 575px) {
    font-size: 16px;
    margin: 0 16px 10px;
    line-height: 1.4;
    font-weight: 400;
  }
`;

export const DivContentSocial = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;

  @media (max-width: 575px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export const DivSocial = styled.a`
  margin-left: 10px;
`;

export const DivIcon = styled.div`
  & img {
    cursor: pointer;
  }
`;

export const DivContentSupport = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  @media (max-width: 575px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export const DivSupport = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  padding: 3px 0;
  border: 1px solid var(--border-color-sp);
  text-align: center;
  border-radius: 20px;
  margin-left: 10px;
  & span,
  & svg {
    font-size: 16px;
    color: var(--border-color-sp);
    cursor: pointer;
  }

  & svg {
    margin-right: 10px;
  }

  & span {
    font-weight: 500;
  }
`;

export const DivTextDownload = styled.div`
  text-align: right;
  font-size: 16px;
  color: var(--white);
  margin-bottom: 10px;
  @media (max-width: 575px) {
    text-align: center;
  }
`;

export const DivDownload = styled.div`
  text-align: right;
  & img {
    margin-left: 10px;
    cursor: pointer;
  }
  @media (max-width: 575px) {
    text-align: center;
  }
`;
