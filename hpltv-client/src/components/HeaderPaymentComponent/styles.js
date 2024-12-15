import styled from 'styled-components';

export const ContentPaymentHeader = styled.div`
  margin: 10px 3%;
  display: flex;
  justify-content: space-between;
`;
export const LogoHeader = styled.div`
  & h2 {
    font-size: 44px;
    margin: 0;
  }
`;
export const BtnActionLogout = styled.button`
  background: none;
  cursor: pointer;
  color: var(--white-bg);
  font-size: 20px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
