import styled from 'styled-components';

export const DivFilm = styled.div`
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 0 16px;
    & button {
      width: 150px;
      height: 40px;
      font-size: 20px;
    }
  }
  @media (max-width: 991px) {
    padding: 0;
    & button {
      width: 140px;
      height: 40px;
      font-size: 16px;
    }
  }
  @media (max-width: 767px) {
    padding: 0 10px;
    & button {
      width: 140px;
      height: 40px;
      font-size: 16px;
    }
  }
`;

export const ImageFilm = styled.img`
  width: 195px;
  border-radius: 20px;
  height: 300px;
  @media (max-width: 991px) {
    width: 185px;
    height: 275px;
  }
  @media (max-width: 400px) {
    width: 160px;
    height: 275px;
  }
`;
export const NameFilm = styled.h3`
  margin: 10px 0;
  font-weight: 500;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: var(--white);
`;
