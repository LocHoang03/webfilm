import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalDetail = styled(Modal)`
  width: 1000px;
`;
export const DivTitle = styled.div`
  border-top: 2px solid #ccc;
  margin-top: 0.5rem;
  text-align: center;
`;
export const TitleDetail = styled.h2`
  margin: 10px 0;
`;
export const DivVideo = styled.div`
margin-bottom: 1rem;
  & > h2 {
  text-align: center;
`;

export const DivVideoFilm = styled.div`
  margin-top: 1rem;
`;

export const VideoDetail = styled.div``;
export const DivInfoDetail = styled.div`
  border-bottom: 2px solid #ccc;
  border-top: 2px solid #ccc;
  display: flex;
  justify-content: space-between;
`;
export const InfoDetail = styled.div`
  padding-right: 10px;
  min-height: 400px;
  & h2 {
    text-align: left;
    font-size: 20px;
  }
`;
export const InfoItem = styled.p`
  text-align: left;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;
export const DivImage = styled.div`
  border-left: 2px solid #ccc;
  padding-left: 10px;

  & img {
    width: 180px;
    height: 260px;
    border-radius: 20px;
  }

  & h2 {
    text-align: center;
    font-size: 20px;
  }
`;

export const DivImageBanner = styled.div`
  & img {
    width: 180px;
    height: 260px;
    border-radius: 20px;
  }

  & h2 {
    text-align: center;
    font-size: 20px;
  }
`;

export const DivLoading = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    font-size: 40px;
    font-weight: 400;
  }
`;

export const DivInfo = styled.div``;
export const ListInfo = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;
export const ItemInfo = styled.li`
  width: 50%;
  margin: 10px 0;
`;
