import styled, { css } from 'styled-components';

export const DivPayment = styled.div`
  margin: 30px 5%;
`;

export const DivAddDataPayment = styled.div``;
export const DivAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
  & > div:last-child {
    width: ${(props) => (props.width ? '100%' : '50%')};
    justify-content: flex-end;
  }
`;

export const DivTypePackPayment = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const DivTable = styled.div`
  margin-top: 30px;
`;

export const DivPagination = styled.div`
  margin-top: 30px;
  text-align: center;
`;
