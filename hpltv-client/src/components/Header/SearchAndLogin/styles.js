import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivSearch = styled.div`
  width: 100%;
`;

export const RowSearch = styled(Row)``;
export const ColLeft = styled(Col)`
  margin: auto;
  & a {
    color: var(--black);
    font-weight: bold;
    font-size: 36px;
  }
`;
export const ColRight = styled(Col)`
  margin: auto;
`;

export const FormSearch = styled.form`
  background: var(--bg-search);
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
  height: 46px;
  display: flex;
  align-items: space-between;

  @media (min-width: 992px) and (max-width: 1199px) {
    height: 30px !important;
  }
`;

export const InputSearch = styled.input`
  background: var(--bg-search);
  padding: 0px 20px;
  width: 85%;
  height: 100%;
  &::placeholder {
    color: var(--white);
    font-size: 16px;
  }
`;

export const ButtonSearch = styled.button`
  flex: 1;
  background: var(--bg-search);
  & span {
    font-size: 24px;
    color: white;
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

export const ButtonLogout = styled.button`
text-align: left;
width: 100%;
padding: 0;
background-color: transparent;
cursor: pointer;
}`;
