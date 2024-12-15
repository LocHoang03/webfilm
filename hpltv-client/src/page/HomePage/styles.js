import styled from 'styled-components';

export const DivHomePage = styled.div`
  width: 100%;
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

export const DivInfo = styled.div`
  text-align: left;
  color: var(--white-bg);
  max-width: 1200px;
  margin: 1rem auto 0;
  display: flex;
`;

export const LeftInfo = styled.div``;

export const RightInfo = styled.div`
  display: flex;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  letter-spacing: 0.05em;
`;

export const Category = styled.p`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 18px;
  & span {
    font-size: 14px;
    padding: 4px 8px;
    font-weight: 500;
  }
`;

export const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
  margin-bottom: 10px;
`;

export const DivAction = styled.div``;

export const ButtonWatch = styled.button`
  background: var(--white-bg);
  margin-right: 1rem;
  padding: 12px 24px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background: var(--white);
  }
`;

export const ButtonDetail = styled.button`
  background: transparent;
  color: var(--white-bg);
  border: 1px solid var(--white-bg);
  margin-right: 1rem;
  padding: 12px 24px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 500;
  min-width: 140px;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const ButtonSlick = styled.button`
  cursor: pointer;
  left: ${(props) => !props.next && '0'};
  right: ${(props) => props.next && '0'};
  z-index: 100;
  border: 1px solid var(--white-bg);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
  & span svg {
    font-size: 1.2rem;
    color: #fff;
  }
  &:hover {
    background-color: #c4c4c4;
  }
`;
