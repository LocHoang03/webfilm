import styled from 'styled-components';

export const DivAssets = styled.div`
  margin: 30px 0;
  text-align: left;
`;

export const DivAddData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5%;

  & > div {
    display: flex;
    align-items: center;
  }
  & > div:last-child {
    width: 50%;
    justify-content: flex-end;
  }
`;

export const DivAction = styled.div`
  display: flex;

  & button {
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 10px 36px;
    font-weight: 500;
  }

  & button:nth-child(2) {
    margin-left: 20px;
  }
`;

export const ButtonImport = styled.button`
  margin-left: 10px;
  background: green;
  color: var(--white);
  padding: 6px 20px;
  border-radius: 6px;
  cursor: pointer;
  border-color: transparent;
`;

export const DownLoadCsv = styled.a`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 7px 15px;
  color: #1677ff;
  margin-left: 10px;

  &:hover {
    color: #1677ff !important;
    border: 1px solid #1677ff;
    & a {
      color: #1677ff !important;
    }
  }
`;

export const Text = styled.label`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 7px 15px;
  color: #1677ff;
  margin-left: 10px;

  &:hover { 
    color: #1677ff !important;
    border: 1px solid #1677ff;
    & a {
    color: #1677ff !important;

    }
  }
}
`;

export const DivLoading = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    font-size: 40px;
    font-weight: 400;
  }
`;
export const TextLoading = styled.h2`
  font-weight: 400;
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

export const DivLook = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 5%;
  & > span {
    width: 38%;
  }
  & > div {
    margin-left: 1rem;
    width: 20%;
  }
`;

export const AssetsTitle = styled.h2``;
export const ButtonAdd = styled.button``;

export const DivPagination = styled.div`
  margin-top: 30px;
  text-align: center;
`;
