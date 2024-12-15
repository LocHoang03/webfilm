import styled from 'styled-components';

export const ButtonCustomerSupport = styled.button`
  background: var(--bg-customer);
  cursor: pointer;
  color: #fff;
  position: fixed;
  right: 2rem;
  top: 83vh;
  border-radius: 100%;
  padding: 0.5rem;
  z-index: 10000;
  & svg {
    font-size: 34px;
  }

  @media (max-width: 575px) {
    top: 82vh;
  }
`;
