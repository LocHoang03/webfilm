import styled from 'styled-components';

export const DivInput = styled.div`
  margin: 10px 0;
  text-align: left;
  width: 90%;
  & textarea {
    height: 50px;
  }
`;

export const ButtonSend = styled.button`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  background-color: #006fcd;
  color: var(--white-bg);
  padding: 10px 20px;
  border-radius: 5px;
  uppercase: true;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 111, 205, 0.7);
  }
`;
