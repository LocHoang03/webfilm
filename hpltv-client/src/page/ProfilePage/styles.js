import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivContainer = styled.div`
  width: 100%;
  background: var(--bg-app);
`;

export const DivProfile = styled.div`
  margin: 30px auto 50px;
  width: 100%;
  max-width: 800px;
  position: relative;
  @media (max-width: 850px) {
    max-width: calc(100% - 20px);
  }
`;

export const DivContent = styled.div`
  input:disabled {
    color: var(--black);
    background-color: #fffcfc;
    opacity: 1;
    text-shadow: 1px 1px 1px #fff;
  }
`;

export const RowContent = styled(Row)``;

export const ColLeft = styled(Col)``;
export const ColRight = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const DivContentLeft = styled.div`
  background-color: var(--bg-profile);
  width: 90%;
  padding: 20px 10px 40px;
  color: var(--white);
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
  }
  @media (max-width: 450px) {
    padding: 20px 0px 40px;
  }
`;

export const DivNameUser = styled.div`
  color: var(--white-bg);
`;

export const NameUser = styled.h2`
  margin-bottom: 20px;
  color: var(--white-bg);
`;

export const DivInfo = styled.div`
  margin-top: 30px;
  color: var(--white-bg);
  @media (max-width: 767px) {
    margin-left: 15%;
  }
`;

export const Text = styled.p`
  text-align: left;
  margin: 16px 20px 0;
  font-size: 16px;
  color: var(--white-bg);
`;

export const DivImage = styled.div`
  text-align: center;
  position: relative;

  & img {
    border-radius: 50%;
  }

  & button {
    position: absolute;
    left: 62%;
    top: 0;
    background-color: var(--white);
    width: 40px !important;
    height: 40px;
    border-radius: 40px;
    border: 2px solid #ccc;

    & svg {
      font-size: 24px;
    }
  }

  & .loading-container {
    margin: 100px 0;
    position: relative !important;
    background-color: transparent !important;
  }
`;

export const DivUpload = styled.div`
  margin-top: 30px;
`;

export const DivContentRight = styled.div`
  background-color: var(--bg-profile);
  padding: 30px 20px;
  width: 90%;
  @media (max-width: 767px) {
    width: 100%;
    margin: 1rem auto;
    max-width: 400px;
    padding: 30px 10px;
  }
  @media (max-width: 450px) {
    padding: 30px 0px;

    & > div {
      padding: 0px 15px;
    }
  }
`;
