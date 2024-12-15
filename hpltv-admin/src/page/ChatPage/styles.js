import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivContainerChat = styled.div`
  margin: 20px 14rem;
  text-align: left;
  color: var(--white);
`;

export const DivError = styled.div`
  position: absolute;
  text-align: center;
  margin-top: 50%;
  z-index: 10050;
  & p {
    background-color: rgba(255, 0, 0, 1);
    color: var(--white-bg);
    width: 80%;
    margin: 0 auto;
    padding: 4px 6px;
    font-weight: 500;
  }
`;

export const RowContainer = styled(Row)`
  height: 620px;
`;
export const ColContainer = styled(Col)``;
export const DivLeft = styled.div`
  background-color: var(--white);
  width: 96%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  & h2 {
    color: var(--black);
    padding: 1rem 10px;
    border-bottom: 1px solid var(--black);
  }
`;
export const ListChat = styled.ul`
  padding: 0;
  flex-grow: 1;
`;
export const ItemChat = styled.li``;
export const DivLeftItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;
export const LeftItem = styled.div`
  width: 50px;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
export const RightItem = styled.div`
  color: var(--black);
  font-weight: 500;
  margin-left: 10px;
  overflow: hidden;

  & > p:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
  }
`;

export const DivRight = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;
`;

export const DivHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid #ccc;
`;

export const DivRightItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  flex: 1;
`;

export const LeftHeaderItem = styled.div`
  width: 50px;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
export const RightHeaderItem = styled.div`
  color: var(--black);
  font-weight: 500;
`;

export const DivOutRoom = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonOutRoom = styled.button`
  width: 70%;
  height: 70%;
  border: none;
  background: #0086e8;
  color: var(--white);
  cursor: pointer;
  border-radius: 50%;

  & span {
    font-size: 24px;
  }
`;

export const ListMessage = styled.ul`
  padding: 0;
  height: 100%;
`;

export const ItemMessage = styled.li`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatItemContent = styled.div`
  width: 100%;
  overflow: hidden !important;

  & > div {
    min-height: 520px;
    max-height: 520px;
    padding: 10px 1rem 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const DivChat = styled.div`
  background-color: var(--bg-chat);
  border-radius: 10px;
  & p {
    margin-bottom: 1rem;
  }
  & button {
    color: var(--white-bg);
    width: 100%;
    background: rgb(15 155 0);
    padding: 0.7rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s linear;
    & span {
      margin-left: 10px;
    }

    &:hover {
      background: rgb(17, 135, 4);
    }
  }
`;

export const DivItemChat = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
  justify-content: flex-end;
`;

export const DivItemChatUser = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
`;

export const DivAvatarUser = styled.div`
  margin-left: 6px;
  width: 25px;
  height: 25px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const DivAvatar = styled.div`
  margin-right: 6px;
  width: 25px;
  height: 25px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  align-items: flex-start;
  & > p:nth-child(2) {
    color: var(--black);
    font-size: 10px;
    font-weight: 700;
    margin-top: 4px;
  }
`;

export const DivTextUser = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  align-items: flex-end;
  & > p:nth-child(2) {
    color: var(--black);
    font-size: 10px;
    font-weight: 700;
    margin-top: 4px;
  }
`;

export const DivFile = styled.div`
  max-width: 100%;
  float: right;

  & img,
  & video {
    max-width: 100%;
  }
`;

export const TextUser = styled.p`
  background-color: #4c77f6;
  padding: 0.4rem 0.4rem;
  max-width: 100%;

  text-align: right;
  border-radius: 10px;
  overflow-wrap: break-word;
  color: var(--white) !important;
  float: right;
  font-size: 15px;
  font-weight: 500;
`;

export const TextUserResponse = styled.p`
  background-color: #10a829;
  padding: 0.4rem 0.4rem;
  text-align: right;
  border-radius: 10px;
  text-align: left;
  color: var(--white-bg) !important;
  overflow-wrap: break-word;
  float: left;
  font-size: 15px;
  max-width: 100%;

  font-weight: 500;
`;

export const ButtonFooter = styled.button`
  width: 50%;

  background: transparent;
  color: ${(props) => (!props.handle ? '#7f7f7f' : 'var(--white-bg)')};
  cursor: pointer;
  & p {
    margin-top: 4px;
  }
  & svg {
    color: ${(props) => (!props.handle ? '#7f7f7f' : 'var(--white-bg)')};
  }

  &:hover {
    color: var(--white-bg);
    & svg {
      color: var(--white-bg);
    }
  }
`;

export const DivForm = styled.div`
  & label {
    color: var(--white-bg) !important;
  }

  & button {
    margin-top: 24px;
  }

  & input {
    padding: 8px 10px;
  }

  & .ant-form-item {
    margin-bottom: 1rem !important;
  }
`;

export const DivContentChat = styled.div`
  height: 100%;
  background-color: var(--white);
  flex-grow: 1;
`;

export const FormChat = styled.div`
  height: var(--height-form);
  display: flex;
  align-items: center;
  border-top: 1px solid var(--black);

  & input {
    flex: 1;
    padding: 16px 10px;
    outline: none;
    border: none;
  }
`;

export const ButtonChat = styled.button`
  width: calc(var(--height-form) + 10px);
  padding: 18px 0;
  outline: none;
  border: none;
  background-color: transparent;
  border-left: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;

  & svg {
    color: var(--black);
  }
`;

export const DivInfo = styled.div`
  width: 100%;
  height: 100%;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DivInfoOut = styled.div`
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10003;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--white);
    width: 60%;
    border-radius: 10px;

    & > p {
      color: var(--black);
    }
  }
`;

export const ButtonInfo = styled.button`
  width: 200px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  border-radius: 5px;
  color: var(--white-bg);
  background-color: #00ac0b;
  cursor: pointer;
  border: none;
`;

export const BtnIcon = styled.button`
  width: 10% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  width: 50px;
  & svg {
    color: var(--black);
    font-size: 20px;
  }
`;

export const LabelFile = styled.label`
  width: 6%;
  display: flex;
  background: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  & svg {
    color: var(--black);
  }
`;

export const DivPicker = styled.div`
  position: absolute;
  top: 170px;
  right: 10%;
  & aside {
    width: 300px !important;
    height: 400px !important;
    border: 1px solid #ccc;
  }
`;

export const DivImage = styled.div`
  position: absolute;
  border: 1px solid #0924c8;
  background: #0924c8;
  padding: 4px;
  max-width: 300px;
  max-height: 250px;
  right: 19%;
  bottom: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & span {
    margin-bottom: 4px;
  }

  & img {
    max-width: 100%;
    max-height: 190px;
  }
`;

export const BtnExit = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  font-size: 20px;
  color: var(--white);
`;

export const ArrowBottom = styled.div`
  position: absolute;
  bottom: -12px;
  right: 7%;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid #0924c8;
`;
