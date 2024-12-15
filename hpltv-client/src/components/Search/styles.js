import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivLookContainer = styled.div`
  margin: 20px auto 0;
  max-width: 1200px;
  border-top: 2px dotted var(--white-bg);
  padding-top: 3rem;
  @media (max-width: 1200px) {
    margin: 20px 10px 0;
    text-align: left;
  }
`;
export const DivLook = styled.div`
  max-width: 90%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;
export const FormLook = styled.form`
  & > div {
    &:last-child {
      margin-top: 1rem;
      text-align: left;
      & button {
        cursor: pointer;
        padding: 10px 30px;
        font-size: 16px;
        color: var(--white-bg);
        font-weight: 500;
        border-radius: 3px;
        transition: all 0.3s linear;
        background-color: rgba(228, 183, 13, 1);
        & > span {
          margin-right: 6px;
        }

        &:hover {
          background-color: rgba(228, 183, 13, 0.85);
        }
      }
    }
  }

  @media (max-width: 991px) {
    width: 100% !important;
  }
`;
export const RowLook = styled(Row)``;
export const ColLook = styled(Col)`
  height: 40px;
  text-align: left;
  & > div,
  & > input {
    width: 96%;
    height: 100%;
    text-align: left;
  }

  & > div {
    & .ant-select-selector {
      border-radius: 3px !important;
    }
  }

  & > input {
    padding: 0 10px;
    border-radius: 3px !important;
  }

  @media (max-width: 575px) {
    margin-top: 10px;
  }
`;
export const ButtonSearch = styled.button``;
