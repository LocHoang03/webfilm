import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const DivHeader = styled(Header)`
  padding: 0;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2%;
`;

export const DivLeft = styled.div``;

export const TitleContent = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 30px;
`;

export const DivRight = styled.div`
  margin: 0 3%;
  width: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
    &:last-child {
      justify-content: flex-end;
      & > span {
        font-size: 18px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
  }
`;

export const DivInfo = styled.div`
  width: 50px;
  height: 100%;

  & a {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & svg {
    height: 30px;
    font-size: 14px;
    color: var(--black);
  }
`;

export const AvatarUser = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const DivLabel = styled.div`
  border-bottom: 1px solid #ccc;
  color: var(--black) !important;
`;

export const LabelText = styled.label``;
