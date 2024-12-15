import styled from 'styled-components';

export const PaymentContainer = styled.div`
  width: 100%;
  color: var(--white-bg);
  @media (max-width: 1300px) {
    width: calc(100% - 20px);
  }
`;
export const PaymentHeader = styled.div`
  border-bottom: 1px solid #e6e6e6;
`;

export const OptionPack = styled.div`
  max-width: 978px;
  margin: 50px auto 150px;
`;

export const TitleOption = styled.h2`
  margin: 40px 0 20px;
`;

export const DivIconOption = styled.div`
  & > span {
    background-color: var(--white-bg);
    padding: 10px;
    border-radius: 50%;
  }
  & svg {
    font-size: 45px;
    color: #c63731;
  }
`;

export const DivText = styled.div`
  margin: 0 auto;
  max-width: 440px;

  & > div:first-child {
    font-size: 18px;
  }

  & > div:last-child {
    font-size: 18px;
    margin-top: 10px;
    & div {
      font-weight: 700;
    }
  }
`;

export const DivActionCheckout = styled.div`
  margin-top: 30px;
`;

export const ButtonCheckout = styled.button`
  border-radius: 5px;
  background: var(--white-bg);
  color: var(--black);
  font-size: 1rem;
  font-weight: 500;
  padding: 26px 220px;
  cursor: pointer;
  position: relative;

  text-align: left;
  & > span:first-child {
    display: flex;
    align-items: center;
    position: absolute;
    left: 20px;
    bottom: 50%;
    transform: translateY(50%);
  }

  & > span:last-child {
    position: absolute;
    right: 20px;
    bottom: 50%;
    transform: translateY(50%);

    & > svg {
      font-size: 20px;
    }
  }

  & img {
    margin-left: 16px;
    width: 45px;
    height: 25px;
  }

  @media (max-width: 575px) {
    padding: 26px 30%;
    width: 100%;
  }
`;

export const DivFooter = styled.div``;
