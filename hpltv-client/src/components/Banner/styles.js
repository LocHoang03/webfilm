import styled from 'styled-components';

export const DivBanner = styled.div`
  max-width: 100%;
  margin: 0 auto 100px;
  position: relative;

  & video {
    width: 100% !important;
    position: relative;
  }

  // @media (max-width: 1250px) {
  //   max-width: calc(100% - 40px);
  // }

  // @media (max-width: 767px) {
  //   padding: 20px 0 50px;
  //   border-radius: 20px 20px 200px 20px;
  // }
`;

export const DivInfo = styled.div`
  text-align: left;
  color: var(--white-bg);
  max-width: 1200px;
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1250px) {
    max-width: calc(100% - 40px);
  }

  @media (max-width: 767px) {
    padding: 20px 0 50px;
    border-radius: 20px 20px 200px 20px;
  }
`;

export const LeftInfo = styled.div``;

export const RightInfo = styled.div`
  display: flex;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  letter-spacing: 0.05em;
  @media (max-width: 767px) {
    font-size: 20px;
    margin-right: 20px;
  }
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

  @media (max-width: 767px) {
    line-height: 2.2;
    margin-right: 20px;
    & span {
      font-size: 13px;
      font-weight: 500;
    }
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

  @media (max-width: 767px) {
    width: 90%;
  }
`;

export const DivAction = styled.div``;

export const ButtonWatch = styled.button`
  background: var(--white-bg);
  margin-right: 0.6rem;
  margin-bottom: 0.5rem;
  padding: 12px 24px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background: var(--white);
  }

  @media (max-width: 767px) {
    font-size: 15px;
    padding: 10px 20px;
    min-width: 120px;
  }

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 8px 12px;
    min-width: 100px;
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

  @media (max-width: 767px) {
    font-size: 15px;
    padding: 10px 20px;
    min-width: 120px;
  }

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 8px 16px;
    min-width: 100px;
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
