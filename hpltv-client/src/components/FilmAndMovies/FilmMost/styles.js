import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivListFilm = styled.div`
  width: 95%;
  margin-bottom: 40px;
  background-color: var(--bg-detail);
`;

export const TitleList = styled.h2`
  padding-top: 0.5rem;
  margin: 0 16px 10px;
  color: var(--black);
  font-size: 18px;
  color: var(--color-most-film);
`;

export const ListFilm = styled.ul`
  border-top: 2px solid var(--color-most-film);
  & li:nth-child(2n) {
    background-color: #1f367e;
  }
`;
export const Item = styled.li`
  padding: 0.8rem 0.5rem;
`;
export const RowItem = styled(Row)``;
export const ColItem = styled(Col)`
  text-align: left;
`;
export const ImageItem = styled.img`
  width: 80%;
  height: 60px;
  @media (max-width: 991px) {
    width: 60px;
  }
`;

export const TextFilm = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-most-film);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;

  &:hover {
    color: var(--white-bg);
  }
`;

export const TextCountry = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--white-bg);
  text-align: left;
  margin-top: 10px;
`;
