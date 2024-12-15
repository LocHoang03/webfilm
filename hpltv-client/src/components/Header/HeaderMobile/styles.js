import { Col, Row } from 'antd';
import styled, { css } from 'styled-components';

export const DivHeader = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 10px auto;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  @media (max-width: 1250px) {
    max-width: calc(100% - 32px);
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
  @media (max-width: 575px) {
    max-width: calc(100% - 32px);
  }
`;

export const DivContentHeader = styled.div`
  width: 100%;
`;

export const RowSearch = styled(Row)``;

export const ColLeft = styled(Col)`
  margin: auto;
  text-align: left;
  & a {
    color: var(--black);
    font-weight: bold;
    font-size: 36px;
  }
  & span {
    font-size: 24px;
    color: white;
  }
`;

export const ButtonLeft = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const DivShow = styled.div`
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  left: 0;
  top: 58px;

  ${({ width }) =>
    css`
      width: ${width}px;
    `}

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      &::before {
        content: '';
        position: absolute;
        border-width: 14px;
        border-style: solid;
        border-color: transparent transparent var(--bg-search) transparent;
        top: -22px;
        left: 8px;
        z-index: 0 !important;
      }
    `}
`;

export const ColRight = styled(Col)`
  margin: auto;
  text-align: right;
`;

export const ButtonMenu = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  &:hover span {
    color: rgba(0, 0, 0, 0.6);
  }

  & span {
    font-size: 34px;
  }

  @media (max-width: 767px) {
    & span {
      font-size: 30px;
    }
  }

  @media (max-width: 575px) {
    & span {
      font-size: 22x;
    }
  }
`;

export const ProfileUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover div {
    display: block;
  }
`;
export const ImageAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const NameUser = styled.p`
  margin-right: 10px;
  font-weight: 500;
  font-size: 18px;
  color: var(--white);
`;

export const ButtonProfile = styled.button`
display: flex;
align-items: center;
justify-content: flex-end;
width: 100%;
padding: 0;
background-color: transparent;
cursor: pointer;
}`;
