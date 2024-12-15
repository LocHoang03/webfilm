import { Tag } from 'antd';
import styled from 'styled-components';

export const ButtonAction = styled.button`
  border: none;
  background-color: transparent;
  padding: 0px !important;
  color: var(--color-action) !important;
  cursor: pointer;
`;

export const TagAction = styled(Tag)`
  padding: 4px 18px;
  &:hover {
    opacity: 0.7;
  }
`;
