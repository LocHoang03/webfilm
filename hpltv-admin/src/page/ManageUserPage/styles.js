import styled, { css } from 'styled-components';

export const DivManage = styled.div``;

export const DivAddAndLook = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 5% 0px;
  ${(props) =>
    css`
      justify-content: ${props.user ? 'space-between' : 'flex-end'};
    `};
`;

export const DivAction = styled.div`
  display: flex;
  & button:nth-child(2) {
    margin-left: 20px;
  }
`;

export const DivError = styled.div`
  margin: 20% auto 0;
  text-align: center;
`;
export const TextError = styled.h2`
  font-weight: 400;
`;

export const DivData = styled.div`
  margin: 30px 5%;
`;

export const DivPagination = styled.div`
  margin-top: 30px;
  text-align: center;
`;
