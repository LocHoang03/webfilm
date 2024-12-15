import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivLandingPage = styled.div`
  width: 100%;
`;

export const DivActionAuth = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DivContentAuth = styled.div`
  width: 100%;
  max-width: 1200px;
`;

export const DivBanner = styled.div``;
export const DivContent = styled.div`
  padding: 6rem 0 4rem;
  width: calc(100% - 6rem);
  margin: 2rem 0;

  @media (max-width: 767px) {
    text-align: center;
    margin: 2rem auto;
    padding: 3rem 0 3rem;
  }
  @media (max-width: 575px) {
    padding: 1rem 0 3rem;
  }
  @media (max-width: 400px) {
    padding: 0rem 0 2rem;
  }
`;

export const TextBanner = styled.h2`
  text-align: left;
  padding: 2rem;
  margin: 0;
  font-size: 44px;
  text-transform: uppercase;
  color: var(--white-bg);

  @media (max-width: 767px) {
    text-align: center;

    & img {
      width: 90%;
      height: auto;
    }
  }
`;

export const TextTitle = styled.h1`
  margin: 0;
  color: var(--white-bg);
  font-size: 44px;
  @media (max-width: 767px) {
    font-size: 40px;
    text-align: center;
  }
  @media (max-width: 575px) {
    font-size: 32px;
  }
  @media (max-width: 400px) {
    font-size: 26px;
  }
`;

export const TextContent = styled.p`
  margin: 0;
  color: var(--white-bg);
  font-size: 24px;
  margin-top: 20px;
  font-weight: 500;
  @media (max-width: 767px) {
    font-size: 22px;
  }
  @media (max-width: 575px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;
export const TextContent2 = styled.p`
  margin: 0;
  color: var(--white-bg);
  margin-top: 30px;
  font-size: 18px;
  font-weight: 400;
  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

export const ButtonLogin = styled.button`
  padding: 14px 0;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 700;
  border-radius: 5px;
  background-color: red;
  color: var(--white-bg);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  & a {
    padding: 14px 30px;
    color: var(--white-bg);
    text-decoration: none;
  }

  @media (max-width: 575px) {
    font-size: 20px;
    & a {
      padding: 12px 26px;
    }
  }
`;

export const DivInformation = styled.div`
  background: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 5px solid #ccc;
`;

export const RowInformation = styled(Row)`
  width: 100%;
  max-width: 1200px;
  padding: 4rem;
`;
export const ColInformation = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const TitleInformation = styled.h1`
  text-align: left;
  color: var(--white);
  font-size: 44px;
  @media (max-width: 991px) {
    font-size: 38px;
  }
  @media (max-width: 767px) {
    font-size: 30px;
    margin-right: 10px;
  }
  @media (max-width: 575px) {
    font-size: 26px;
    margin-right: 0;
    text-align: center;
  }
`;
export const TextInformation = styled.p`
  text-align: left;
  color: var(--white);
  font-size: 18px;
  margin: 10px 20px 0 0;
  font-weight: 400;
  @media (max-width: 991px) {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    font-size: 15px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
    margin: 10px 0 1rem;
  }
`;
export const ImageInformation = styled.img`
  width: 100%;
`;
