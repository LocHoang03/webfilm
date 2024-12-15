import styled from 'styled-components';
import bgLogin from '../../assets/images/background-login.jpg';

export const DivAuth = styled.div`
  background: var(--bg-app);
`;

export const DivContent = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 18px;
    font-weight: 500;
    color: var(--white-bg);
    border: 2px solid var(--white-bg);
    border-radius: 4px;
    padding: 10px 16px;
  }
`;

export const PaymentHeader = styled.div`
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
`;
export const DivFooter = styled.div`
  width: 100%;
`;
