import styled from 'styled-components';

export const ContentPack = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.4);
  border-radius: 20px;
  background: var(--bg-package);
  min-height: 650px;
  height: 100%;
  cursor: pointer;
  margin: 0 8px;
`;

export const TypePack = styled.label`
  background: radial-gradient(
      140.76% 131.96% at 100% 100%,
      rgb(176, 56, 220) 0%,
      rgba(74, 42, 150, 0.5) 73.57%,
      rgba(74, 42, 150, 0) 100%
    ),
    rgb(29, 82, 157);
  color: white;
  border-radius: 12px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 8px;
  min-height: 83px;
  padding: 10px 16px;
  text-align: left;
`;

export const InfoType = styled.span`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5;
`;

export const Resolution = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
`;

export const CheckIcon = styled.span`
  text-align: right;

  & svg {
    font-size: 18px;
  }
`;

export const Describe = styled.div``;

export const ListInfo = styled.ul`
  padding: 0px 25px;
`;

export const ItemInfo = styled.li`
  padding: 12.5px 0px;
  margin: 0px;
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.4);

  &:last-child {
    border-bottom: none;
  }
`;

export const DivItemInfo = styled.div`
  text-align: left;

  & div {
    line-height: 1.5;
    font-size: 14px;
    color: #333333;
    font-weight: 500;
  }
`;
