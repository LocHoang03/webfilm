import styled from 'styled-components';

export const DivContent = styled.div`
  margin: 60px auto;
  position: relative;
`;

export const DivTitle = styled.div``;

export const TextTitle = styled.h2`
  text-align: left;
  margin-bottom: 30px;
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

export const DivContentFilm = styled.div`
  overflow: hidden;
  margin: 0 auto;
  @media (max-width: 797px) {
    width: 90%;
  }
  @media (max-width: 680px) {
    width: 100%;
  }
  @media (max-width: 608px) {
    width: 85%;
  }
  @media (max-width: 560px) {
    width: 90%;
  }
  @media (max-width: 510px) {
    width: 100%;
  }
`;

export const ButtonSlick = styled.button`
  position: absolute;
  top: 40%;
  cursor: pointer;
  left: ${(props) => !props.next && '0'};
  right: ${(props) => props.next && '0'};
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
