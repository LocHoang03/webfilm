import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  background-color: var(--bg-app);
  color: var(--white-bg);

  @media (max-width: 1250px) {
    width: 100%;
    max-width: calc(100% - 20px);
  }
`;
export const RowDetail = styled(Row)`
  @media (max-width: 991px) {
    width: 100%;
  }
`;
export const ColDetail = styled(Col)`
  ${(props) =>
    props.right &&
    `display: flex;flex-direction: column; align-items: flex-end;`}
  @media (max-width: 991px) {
    width: 100%;
    max-width: 100%;
    align-items: center !important;
  }
`;
export const RowLeft = styled(Row)``;
export const ColLeft = styled(Col)`
  position: relative;
  text-align: center;
  margin: 0 auto 2rem;
  @media (max-width: 575px) {
    width: 100%;
  }
`;
export const ColRight = styled(Col)``;

export const ImageFilm = styled.img`
  height: 450px;
  width: 100%;
`;

export const DivContent = styled.div`
  text-align: left;
  color: var(--white-bg);
`;
export const TitleContent = styled.h2`
  font-size: 26px;
  margin: 30px 0 10px 0;
`;
export const TextContent = styled.p`
  font-size: 18px;
  margin-right: 50px;
  @media (max-width: 991px) {
    margin-right: 0;
  }
`;

export const DivWatchButton = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 0;
  bottom: 3px;
  width: 100%;
`;
export const ButtonWatch = styled.button`
  flex-grow: 1;
  min-width: 0;
  max-width: calc(50% - 0.5rem);
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: #e6212a;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    color: #fff;
  }

  @media (max-width: 991px) {
    max-width: calc(70% - 0.5rem);
  }
  @media (max-width: 575px) {
    max-width: calc(100% - 0.5rem);
  }
`;

export const DivFilmSame = styled.div`
  width: 100%;
`;

export const DivComment = styled.div`
  width: 100%;
`;
export const DivContentComment = styled.div`
  margin: 0 20px;
`;

export const DivListComment = styled.div`
  width: 100%;

  margin-top: 50px;
`;

export const DivDetailComment = styled.div`
  width: 100%;
  background-color: #fefdfd;
  padding: 20px 0;
`;

export const RowComment = styled(Row)``;
export const ColLeftComment = styled(Col)``;
export const ColRightComment = styled(Col)`
  & > div {
    margin-right: 10px;
    border: 1px solid #ccc;
  }
`;
export const AvatarUserComment = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
export const NameUser = styled.h3`
  margin: 0 10px;
  padding: 5px 0;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;
export const ContentUser = styled.p`
  text-align: left;
  padding: 15px 10px;
`;
