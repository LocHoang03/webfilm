import styled from 'styled-components';

export const DivMenu = styled.div``;

export const TextTitle = styled.h2`
  text-align: center;
  font-size: 30px;
`;

export const DivPage = styled.div``;

export const DivAction = styled.div``;

export const ListNav = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const ItemNav = styled.li`
  & a,
  & button {
    color: var(--black);
    font-size: 24px;
    font-weight: 700;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 18px;
    }
  }
  & button {
    width: 100%;
    background: transparent;
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    padding: 10px 10px;
  }
`;

export const ListNavAction = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export const ItemNavAction = styled.li`
  & a {
    color: var(--black);
    font-size: 18px;
    font-weight: 700;
    padding: 6px 20px;
    border: 1px solid black;
    border-radius: 20px;
    &:hover {
      background-color: var(--bg-footer);
      color: white;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 18px;
    }
  }
  @media (max-width: 1200px) {
    padding: 10px 10px;
  }
`;
