import styled from 'styled-components';

export const DivContact = styled.div`
  width: 100%;
`;
export const DivBanner = styled.div`
  margin-bottom: 1.5rem;
`;
export const BannerContact = styled.img`
  width: 100%;
  height: 370px;
  @media (max-width: 767px) {
    height: 300px;
  }
  @media (max-width: 575px) {
    height: 220px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 5rem;
  text-align: left;
  & a {
    color: #ffd700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1250px) {
    margin: 0 2rem;
  }
`;

export const Text = styled.p`
  margin-bottom: 1.5rem;
  color: var(--white-bg);
  line-height: 2rem;
`;

export const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: #ffd700;
`;
