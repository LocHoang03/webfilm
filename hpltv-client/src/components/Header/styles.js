import { Col, Row } from 'antd';
import styled from 'styled-components';
export const ContainerHeader = styled.div`
  background-color: transparent;
  margin-bottom: calc(var(--height-header) + var(--pd) * 2);
`;

export const DivHeader = styled.div`
  width: 100%;
  background-color: var(--bg-header-2);
  padding: var(--pd) 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  height: var(--height-header);
  display: flex;
  align-items: center;
`;

export const ContentHeader = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  @media (max-width: 1250px) {
    max-width: calc(100% - 40px);
  }

  @media (max-width: 575px) {
    max-width: calc(100% - 30px);
    margin: 10px auto;
  }
`;
export const RowHeader = styled(Row)``;
export const ColLeft = styled(Col)`
  margin: auto;
`;
export const ColRight = styled(Col)`
  display: flex;
  align-items: center;
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: 10px;
`;

export const ListNav = styled.ul`
  display: flex;
`;

export const ItemNav = styled.li`
  padding: 10px 14px;
  & a {
    color: var(--white-bg);
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    text-transform: uppercase;
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 18px;
    }
  }

  &:hover {
    & a {
      color: var(--bg-header-navbar);
    }
  }
  @media (max-width: 1200px) {
    padding: 10px 10px;
  }
`;

// mobile

export const DivContainerMobile = styled.div`
  background-color: transparent;
  margin-bottom: calc(32px + var(--pd) * 2);
`;

export const DivHeaderMobile = styled.div`
  background-color: transparent;
  margin-bottom: 100px;
  position: fixed;

  width: 100%;
  background-color: var(--bg-header-2);
  padding: 10px 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
`;
