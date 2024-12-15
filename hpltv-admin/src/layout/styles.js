import styled from 'styled-components';

export const DivContainerWeb = styled.div`
  display: flex;
  height: auto;
`;

export const DivSider = styled.div`
  position: relative;
  background-color: #f5f5f5;
  & > div {
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
