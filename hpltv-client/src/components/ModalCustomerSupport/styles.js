import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalCustomer = styled(Modal)`
  color: var(--white-bg);
  text-align: center;
  width: 400px !important;
  position: absolute;
  right: 20px;

  & .ant-modal-content {
    height: 600px !important;
    right: 60px;
    background: linear-gradient(
      160deg,
      rgb(72, 196, 58) -20%,
      rgb(6, 54, 1) 35%,
      rgb(0, 0, 0) 180%
    );
  }

  & svg {
    color: var(--white-bg);
    font-size: 22px;
  }

  & .ant-modal-close {
    top: 10px !important;
  }

  @media (max-width: 575px) {
    width: 70% !important;
    right: -20px !important;

    & .ant-modal-content {
      height: 530px !important;
      right: 60px;
      background: linear-gradient(
        160deg,
        rgb(72, 196, 58) -20%,
        rgb(6, 54, 1) 35%,
        rgb(0, 0, 0) 180%
      );
    }
  }
  @media (max-width: 490px) {
    width: 80% !important;
    right: -20px !important;
  }
  @media (max-width: 450px) {
    width: 90% !important;
    right: -40px !important;
  }

  @media (min-height: 750px) {
    & .ant-modal-content {
      height: 610px !important;
    }
  }
  @media (min-height: 750px) {
    & .ant-modal-content {
      height: 670px !important;
    }
  }
  @media (min-height: 750px) {
    & .ant-modal-content {
      height: 670px !important;
    }
  }
  @media (min-height: 1000px) {
    top: 20% !important;
  }
  @media (min-height: 1100px) {
    top: 25% !important;
  }
  @media (min-height: 1200px) {
    top: 30% !important;
  }
  @media (min-height: 1300px) {
    top: 35% !important;
  }
`;

export const DivError = styled.div`
  position: absolute;
  width: 88%;
  margin-top: 70%;
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

export const BtnLog = styled.button`
  position: relative;
  top: -8px;
  left: -160px;
  cursor: pointer;
  background: transparent;
  @media (max-width: 550px) {
    top: -8px;
    left: -150px;
  }
  @media (max-width: 530px) {
    top: -8px;
    left: -140px;
  }
  @media (max-width: 490px) {
    top: -8px;
    left: -150px;
  }
  @media (max-width: 450px) {
    top: -8px;
    left: -140px;
  }
  @media (max-width: 420px) {
    top: -8px;
    left: -130px;
  }
  @media (max-width: 385px) {
    top: -8px;
    left: -120px;
  }
  @media (max-width: 355px) {
    top: -8px;
    left: -110px;
  }
`;
export const DivContainer = styled.div`
  position: relative;
  height: 560px;
`;

export const Title = styled.h2`
  font-size: 36px;
  margin: 40px 0 20px !important;
`;

export const TitleChatSHowHub = styled.h2`
  font-size: 36px;
  margin: 0 !important;
`;

export const DivChat = styled.div`
  background-color: var(--bg-chat);
  border-radius: 10px;
  padding: 1.5rem 1rem;
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

export const DivContainerChat = styled.div`
  height: 100%;

  & > h2 {
    margin: 20px 0 10px;
  }
`;
export const DivContentChat = styled.div`
  background: var(--white-bg);
  height: 100%;
  @media (max-width: 575px) {
    height: 400px;
  }
  @media (min-height: 750px) {
    height: 490px;
  }
  @media (min-height: 820px) {
    height: 550px;
  }
`;

export const TitleChat = styled.h3`
  background: #212b30;
  padding: 5px 0;
`;

export const ChatContent = styled.div`
  min-height: 400px;
  max-height: 400px;
  margin: 6px 10px 0;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 575px) {
    min-height: 315px;
    max-height: 315px;
  }
  @media (min-height: 750px) {
    min-height: 405px;
    max-height: 405px;
  }
  @media (min-height: 820px) {
    min-height: 465px;
    max-height: 465px;
  }
`;

export const DivItemChat = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
  justify-content: flex-end;
`;

export const DivItemChatRes = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 12px;
`;

export const TextWelcome = styled.p`
  text-align: center;
  color: #f00;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
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
    float: right;
    font-size: 10px;
    font-weight: 700;
    margin-top: 4px;
  }
`;

export const TextUser = styled.p`
  background-color: #4c77f6;
  padding: 0.2rem 0.4rem;
  text-align: right;
  border-radius: 10px;
  color: var(--white-bg) !important;
  text-align: right;
  max-width: 100%;
  float: right;
  font-size: 14px;
  font-weight: 500;
  & > p {
    font-size: 10px;
  }

  & > span {
    text-align: left;
  }
`;

export const TextUserResponse = styled.p`
  background-color: #10a829;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  text-align: left;
  color: var(--white-bg) !important;
  text-align: left;
  max-width: 100%;

  float: left;
  font-size: 14px;
  font-weight: 500;
  & > p {
    font-size: 10px;
  }
`;

export const DivFile = styled.div`
  max-width: 100%;
  float: right;

  & img,
  & video {
    max-width: 100%;
    height: 100%;
  }
`;

export const FormChat = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--black);
  position: relative;
  & input {
    width: 60%;
    padding: 12px 10px;
  }

  @media (max-width: 575px) {
    & input {
      width: 55%;
    }
  }
  @media (max-width: 450px) {
    & input {
      width: 50%;
    }
  }
`;

export const ButtonChat = styled.button`
  flex: 1;
  padding: 10px 0;
  border-left: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & svg {
    color: var(--black);
  }
`;

export const BtnIcon = styled.button`
  width: 10%;
  display: flex;
  cursor: pointer;
  background: none;
  align-items: center;
  & svg {
    color: var(--black);
  }

  @media (max-width: 575px) {
    width: 12%;
  }
  @media (max-width: 450px) {
    width: 14%;
  }
`;

export const DivImage = styled.div`
  position: absolute;
  border: 1px solid #0924c8;
  background: #0924c8;
  padding: 4px;
  max-width: 220px;
  max-height: 180px;
  right: 26%;
  bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & span {
    margin-bottom: 4px;
  }

  & img {
    max-width: 100%;
    max-height: 138px;
  }

  @media (max-width: 575px) {
    width: 12%;
  }
  @media (max-width: 450px) {
    width: 14%;
  }
`;

export const BtnExit = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 0;
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

export const DivUpLoad = styled.div`
  width: 10%;
  display: flex;
  background: none;
  align-items: center;
  cursor: pointer;
  & button {
    border: none;
  }
  & svg {
    color: var(--black);
  }
`;

export const LabelFile = styled.label`
  width: 10%;
  display: flex;
  background: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & svg {
    color: var(--black);
  }
`;

export const DivPicker = styled.div`
  position: absolute;
  top: -410px;
  z-index: 10020;
  & aside {
    width: 300px !important;
    height: 400px !important;
    border: 1px solid #ccc;
  }
`;

export const DivInfo = styled.div`
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
    background-color: var(--white-bg);
    width: 60%;
    border-radius: 10px;

    & > p {
      color: var(--black);
    }
  }
`;

export const ButtonInfo = styled.button`
  width: 100px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
  border-radius: 5px;
  color: var(--white-bg);
  background-color: #00ac0b;
  cursor: pointer;
`;
