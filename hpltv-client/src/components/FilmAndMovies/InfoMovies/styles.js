import { Tag } from 'antd';
import styled from 'styled-components';

export const Title = styled.h1`
  color: var(--white);
  margin: 0 20px;
  font-size: 24px;
  text-align: left;
`;

export const TextFilm = styled.p`
  margin: 10px 40px 0 20px;
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  color: var(--white-bg);
  & ul {
    position: relative;
    top: 2px;
  }
`;
export const TagCategory = styled(Tag)`
  background: #b2aa07;
  border: none;
  padding: 3px 10px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--white-bg);
`;
