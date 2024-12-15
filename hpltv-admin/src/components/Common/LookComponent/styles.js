import styled from 'styled-components';

export const DivLook = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  & > span {
    width: 50%;
    margin-left: 1rem;
  }

  & > div {
    margin-left: 1rem;
    width: 30%;
  }

  & .select-email > div {
    width: 200px !important;
  }
`;

export const BtnLook = styled.button`
  border: 1px solid transparent;
  background-color: #40f130;
  border-radius: 5px;
  margin-left: 1rem;
  padding: 7px 16px;
  color: var(--white);
  cursor: pointer;
  width: 100px;
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
    opacity: 0.9;
  }
`;
