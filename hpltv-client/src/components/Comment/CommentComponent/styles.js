import styled from 'styled-components';

export const DivComment = styled.div``;
export const DivTitle = styled.div`
  text-align: left;
  margin: 1rem 0;
  color: var(--white-bg);
`;
export const TitleComment = styled.h2``;

export const DivInput = styled.div`
  text-align: left;
`;

export const ButtonSend = styled.button`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 700;
  background-color: #006fcd;
  color: var(--white-bg);
  padding: 10px 20px;
  border-radius: 5px;
  uppercase: true;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background-color: rgba(0, 111, 205, 0.7);
  }
`;
