import styled from 'styled-components';
import bgLogin from '../../assets/images/background-login.jpg';

export const DivAuth = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bgLogin});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DivContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    max-width: calc(100% - 20px);
  }
`;

export const DivContent = styled.div`
  width: 600px;
  @media (max-width: 767px) {
    width: 90%;
    max-width: 600px;
  }
`;

export const TextContent = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: var(--white-bg);
`;
export const DivForm = styled.div`
  background: var(--bg-form);
  margin: 20px 0 0;
  padding: 40px 0;
  border-radius: 20px;

  & > div {
    width: 80%;
    margin: 0 auto;
  }
  & form {
    width: 80%;
    margin: 0 auto;

    & label {
      color: var(--white-bg) !important;
    }

    & .ant-form-item-control-input-content {
      display: flex;
      justify-content: center;
      & button {
        width: 100%;
        margin-top: 26px;
        border-radius: 20px;
        padding: 20px 0;
        font-weight: 500;
        font-size: 20px;
        display: flex;
        align-items: center;
        & span {
          width: 100%;
          text-align: center;
        }
      }
    }

    & input,
    & .ant-form-item-control-input-content > span {
      padding: 8px 15px;
      border-radius: 20px;
    }
  }
`;
export const DivFooter = styled.div``;
export const DivBanner = styled.div`
  position: relative;
  z-index: 100;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const TextBanner = styled.h2`
  text-align: left;
  padding: 2rem;
  margin: 0;
  font-size: 44px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    text-align: center;
    padding: 2rem 0;

    & img {
      width: 80% !important;
      max-width: 400px;
      height: 70px !important;
    }
  }
  @media (max-width: 575px) {
  }
`;

export const DivLink = styled.div`
  display: flex;

  justify-content: space-between;
  @media (max-width: 575px) {
    flex-direction: column !important;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: var(--white);
  @media (max-width: 575px) {
    margin: 5px 0;
  }

  & a {
    color: var(--text-action);
    text-decoration: none;

    &:hover {
      color: var(--hover-text-action);
    }
  }
`;
export const DivLoginOther = styled.div``;

export const DivText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;

  & > div:nth-child(2) {
    padding: 0 10px;
    color: var(--white);
    font-size: 16px;
    font-weight: 500;
  }

  & > div:first-child {
    background-color: #dbdbdb;
    flex: 1;
    height: 1px;
    width: 100%;
  }

  & > div:last-child {
    background-color: #dbdbdb;
    flex: 1;
    height: 1px;
    width: 100%;
  }
`;

export const DivLoginButton = styled.div`
  text-align: center;
  & > button {
    margin: 10px auto 20px;
    border-radius: 3px;
    width: 150px;
    background-color: var(--white-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    cursor: pointer;
    transition: all 0.3s linear;

    & > span {
      margin-left: 6px;
      font-size: 15px;
      font-weight: 500;
    }
  }
  & img {
    height: 30px;
    width: 30px;
  }

  & button:hover {
    background-color: rgba(255, 255, 255, 0.85);
  }
`;

export const DivError = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: var(--error-text);
`;
