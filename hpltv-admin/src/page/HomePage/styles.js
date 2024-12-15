import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivContainer = styled.div`
  margin: 20px 2%;
`;

export const RowSummary = styled(Row)``;

export const ColSummary = styled(Col)`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--white);
    margin: 0 5%;
    padding: 20px 16px;
    border-radius: 5px;
    & h4 {
      margin: 0;
      font-weight: 500;
      font-size: 12px;
    }

    & label {
      font-size: 24px;
      font-weight: 500;
    }

    & svg {
      font-size: 2em;
      font-weight: 900;
      color: ${(props) => (props.user ? '#fff' : '#dddfeb')};
      background: ${(props) => props.user && '#dddfeb'};
      border-radius: 50%;
    }
  }
`;

export const DivTotal = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;

  & > div {
    width: 96%;
    border-radius: 5px;

    background-color: var(--white);
    & canvas {
      width: 80% !important;
      height: 300px !important;
      padding: 0 16px;
      border-radius: 5px;
      margin: 0 auto;
    }
  }
`;

export const DivSelectAndTitle = styled.div`
  width: 96%;
  display: flex;
  padding: 10px 16px 0 0;
  justify-content: space-between;
  align-items: center;
  & > h3 {
    padding: 10px 16px;
  }
`;

export const DivSelectAndExport = styled.div`
  display: flex;
  align-items: center;
`;

export const DivExport = styled.div`
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DivIcon = styled.div``;

export const RowContent = styled(Row)``;

export const ColContent = styled(Col)``;

export const RowSummaryToday = styled(Row)``;

export const ColSummaryToday = styled(Col)`
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
`;

export const DivSummaryToday = styled.div`
  background-color: var(--white);
`;

export const Title = styled.h3`
  background-color: #f8f9fc;
  margin: 0;
  padding: 16px 10px;
  border-bottom: 1px solid #ccc;
`;
export const DataToday = styled.div`
  & > div {
    padding: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    & > canvas {
      width: 90% !important;
      height: 90% !important;
    }
  }
`;

export const RowTableUser = styled(Row)`
  margin-top: 20px;
`;

export const ColTableUser = styled(Col)``;

export const DivTable = styled.div`
  width: 97%;
  background-color: var(--white);
  float: ${(props) => (props.right ? 'right' : 'left')};
  border-radius: 5px;
  overflow: hidden;
  & > h3 {
    margin: 10px 0 10px 16px;
  }
`;
