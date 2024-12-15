import styled from 'styled-components';

export const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const AuthContent = styled.div`
  width: 400px;
  height: 50vh;
  background-color: var(--white-bg);
  margin: 25vh auto 0;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 767px) {
    margin: 20vh auto 0;
  }
  @media (max-width: 430px) {
    width: 100%;
    max-width: calc(100% - 20px);
  }
`;

export const DivHeader = styled.div`
  border-bottom: 1px solid #e6e6e6;
  & > div {
    margin: 0 auto;

    width: 100%;
    max-width: 1200px;
  }
`;

export const DivInformation = styled.div`
  width: 90%;
  margin: 20px auto 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 30px;
  @media (max-width: 767px) {
    font-size: 26px;
  }
  @media (max-width: 575px) {
    font-size: 22px;
  }
`;

export const Text = styled.p`
  margin: 1rem 0;
  @media (max-width: 767px) {
    font-size: 15px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
`;
export const DivDetail = styled.div`
  margin: 20px 0;

  & input {
    padding: 8px 12px !important;
    border-radius: 2px !important;
  }

  & .ant-form-item-explain-error {
    margin: 6px 0 4px;
  }

  & > form > div {
    margin-bottom: 12px !important;
  }

  & > form {
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

export const ButtonVerify = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #4ed80d;
  color: var(--white-bg);
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background-color: #65fb1e;
  }
`;

export const DivResend = styled.div`
  text-align: right;
  font-weight: 400;
  font-size: 14px;

  & button {
    background-color: transparent;
    font-weight: 500;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
`;
