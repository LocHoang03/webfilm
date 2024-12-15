import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivContact = styled.div`
  width: 100%;
`;
export const DivBanner = styled.div``;
export const BannerContact = styled.img`
  width: 100%;
  height: 370px;
  @media (max-width: 767px) {
    height: 300px;
  }
  @media (max-width: 575px) {
    height: 220px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 5rem;
`;
export const DivTitle = styled.div`
  margin: 4rem 0;
  color: var(--white-bg);
`;
export const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;
export const Title1 = styled.p``;

export const RowContent = styled(Row)`
  @media (max-width: 991px) {
    margin: 0 1rem;
  }
`;

export const ColContent = styled(Col)`
  margin-bottom: 1.4rem;
  &:first-child {
    & > div {
      background-color: #9d4d2a;
      width: 96%;
      margin: 0 auto;
    }
  }
  &:nth-child(2) {
    & > div {
      background-color: #1677ff;
      width: 96%;
      margin: 0 auto;
    }
  }
  &:last-child {
    & > div {
      background-color: #0abe41;
      width: 96%;
      margin: 0 auto;
    }
  }
`;

export const DivForm = styled.div`
  padding: 0 1rem 1rem 1rem;
  & label {
    color: var(--white-bg) !important;
  }
  & input {
    padding: 8px;
    border-radius: 3px;
  }

  & button {
    margin-top: 1rem;
    width: 100%;
    height: 40px;
    font-weight: 500;
  }
  .ant-form-item-explain-error {
    margin-top: 4px;
  }

  @media (max-width: 600px) {
    & form {
      width: 100% !important;
    }
  }
`;

export const TitleLeft = styled.h2`
  text-align: left;
  color: var(--white-bg);
  padding: 1rem;
`;

export const TitleRight = styled.h2`
  text-align: left;
  color: var(--white-bg);
  padding: 1rem;
`;

export const DivListQuestion = styled.div`
  text-align: left;
  padding: 0 3rem 1rem 1rem;
  color: var(--white-bg);
`;
export const InfoQuestion = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
`;
export const TitleQuestion = styled.p`
  margin-bottom: 4px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const DescriptionQuestion = styled.p`
  color: #ffdc00;
`;

export const TitleCenter = styled.h2`
  text-align: left;
  color: var(--white-bg);
  padding: 1rem;
`;

export const ListCenter = styled.ul`
  text-align: left;
  padding: 0 2rem 2rem 1rem;
`;
export const ItemCenter = styled.li`
  display: flex;
  color: var(--white-bg);
  margin-bottom: 1rem;
  & > div:first-child {
    & span {
      background-color: var(--white-bg);
      color: var(--color-icon);
      padding: 8px;
      border-radius: 50%;
      font-size: 2rem;
    }
  }

  & > div:last-child {
    margin-left: 10px;
    & p {
      line-height: 1.6rem;
      font-size: 16px;

      &:first-child {
        font-weight: 500;
      }
    }

    & a {
      color: var(--white-bg);
      text-decoration: underline;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      display: block;
    }
  }
`;
