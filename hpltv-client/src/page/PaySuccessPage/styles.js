import styled from 'styled-components';

export const PaySuccessContainer = styled.div`
  width: 100%;
  height: 100vh;
  @media (max-width: 520px) {
    width: calc(100% -20px) !important;
  }
`;

export const PaySuccessContent = styled.div`
  width: 500px;
  height: 68vh;
  background-color: var(--white-bg);
  margin: 20vh auto 0;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 520px) {
    width: 92%;
    height: 70vh;

    margin: 30% auto 0;
  }
`;

export const DivIcon = styled.div`
  background-color: var(--success);
  & > span {
    margin: 25px 0;
  }
  & svg {
    color: var(--white-bg);
    font-size: 60px;
  }
  @media (max-width: 520px) {
    font-size: 45px !important;
  }
`;

export const DivInformation = styled.div`
  width: 90%;
  margin: 20px auto 0;
`;

export const Title = styled.h2`
  margin: 0;
  color: var(--success);
`;

export const DivDetail = styled.div`
  margin: 20px 0;
`;

export const ListInfoDetail = styled.ul`
  list-style: none;
`;

export const ItemDetail = styled.li`
  text-align: left;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;

  &:last-child {
    margin-top: 16px;
    font-weight: 700;
  }
  @media (max-width: 520px) {
    font-size: 14px;
  }
  @media (max-width: 350px) {
    font-size: 13px;
  }
`;
export const DivThanks = styled.div`
  margin: 20px auto;
  width: 90%;
`;

export const TitleThanks = styled.h2`
  font-weight: 500;
  margin: 0 auto;
  font-size: 16px;
  @media (max-width: 520px) {
    font-size: 15px;
  }
  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

export const DivRedirect = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  width: 90%;

  & > span {
    margin-top: 14px;
    font-size: 15px;
    font-weight: 500;
  }
  @media (max-width: 520px) {
    & > span {
      margin-top: 14px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

export const ButtonRedirect = styled.button`
  padding: 12px 16px;
  border-radius: 5px;
  background-color: #5ba0b5;
  color: var(--white-bg);
  font-weight: 500;
  font-size: 15px;
  width: 40%;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    margin-left: 10px;
  }
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;
