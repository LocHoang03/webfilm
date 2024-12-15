import styled from 'styled-components';
import bgLogin from '../../assets/images/background-login.jpg';

export const DivAuth = styled.div`
  width: 100%;
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
  margin: 20px 0 60px;
  padding: 40px 0;
  border-radius: 20px;
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
  margin-top: 14px;
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

export const DivError = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: var(--error-text);
`;
