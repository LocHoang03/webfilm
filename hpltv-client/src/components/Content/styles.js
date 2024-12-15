import styled from 'styled-components';

export const DivContent = styled.div`
  max-width: 1200px;
  margin: 70px auto;
  position: relative;
  min-height: 300px;
`;

export const DivTitle = styled.div`
  text-align: left;
  // margin-left: 20px;
  position: relative;
  z-index: 100;
  color: var(--white);
  @media (max-width: 1250px) {
    margin: 0 10px;
  }
`;

export const TextTitle = styled.h2`
  text-align: left;
  display: flex;
  align-items: center;
  @media (max-width: 991px) {
    font-size: 18px;
  }

  @media (max-width: 767px) {
    font-size: 18px;
  }

  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

export const BorderText = styled.div`
  height: 2px;
  background: var(--white);
  flex: 1;
  margin-left: 1rem;
`;

export const DivContentFilm = styled.div`
  overflow: hidden;
  margin-top: 12px;
  position: relative;
`;

export const ButtonSlick = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-200%);
  cursor: pointer;
  left: ${(props) => !props.next && '20px'};
  right: ${(props) => props.next && '20px'};
  z-index: 100;
  border: none;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  & span svg {
    font-size: 1.2rem;
    color: #fff;
  }
  &:hover {
    background-color: #0066b3;
  }
`;

export const DivCarousel = styled.div`
  @media (max-width: 991px) {
    margin: 0 3rem;
  }
  @media (max-width: 867px) {
    margin: 0 0.2rem;
  }
  @media (max-width: 767px) {
    margin: 0 2.5rem;
  }
  @media (max-width: 667px) {
    margin: 0 0.4rem;
  }
  @media (max-width: 575px) {
    margin: 0 3rem;
  }
  @media (max-width: 490px) {
    margin: 0;
  }
`;
