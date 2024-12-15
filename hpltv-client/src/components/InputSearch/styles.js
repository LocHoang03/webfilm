import styled from 'styled-components';
import { Col, Row } from 'antd';

export const DivSearch = styled.div`
  position: relative;
`;

export const FormSearch = styled.form`
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 42px;
  display: flex;
  align-items: space-between;
`;

export const InputSearch = styled.input`
  background: var(--bg-search);
  padding: 0px 15px;
  width: 72%;
  height: 100%;
  color: var(--white-bg);
  &::placeholder {
    color: var(--white-bg);
    font-size: 14px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    width: 72%;
  }

  @media (min-width: 670px) and (max-width: 767px) {
    width: 86%;
  }
  @media (min-width: 576px) and (max-width: 669px) {
    width: 84%;
  }
  @media (max-width: 575px) {
    width: 80%;
  }
  @media (max-width: 470px) {
    width: 78%;
  }
  @media (max-width: 410px) {
    width: 75%;
  }
`;

export const ButtonSearch = styled.button`
  flex: 1;
  border-left: 1px solid var(--white-bg);
  cursor: pointer;
  background: var(--bg-search);
  & span {
    font-size: 24px;
    color: white;
  }
`;

export const DivSelect = styled.div`
  position: absolute;
  background-color: #3648a4;
  width: 100%;
  margin-top: 6px;
`;

export const ListFilm = styled.ul`
  min-height: 100px;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
export const Item = styled.li`
  transition: all 0.3s linear;
  &:hover {
    background-color: rgba(29, 45, 124, 0.7);
    cursor: pointer;
  }

  & > button {
    background-color: rgba(29, 45, 124, 0.7);
    cursor: pointer;
    width: 100%;
    padding: 0.8rem 0.5rem;
  }
`;
export const RowItem = styled(Row)``;
export const ColItem = styled(Col)`
  text-align: left;
`;
export const ImageItem = styled.img`
  width: 80%;
  height: 60px;
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
`;

export const TextCountry = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--white-bg);
  text-align: left;
  margin-top: 10px;
`;

export const DivInfo = styled.div`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  color: var(--white-bg);
`;
