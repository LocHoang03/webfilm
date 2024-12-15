import styled from 'styled-components';

export const DivDetailComment = styled.div`
  padding: 10px 0 10px;
`;

export const RowComment = styled.div`
  display: flex;
`;
export const ColLeftComment = styled.div`
  text-align: left;
  width: 8%;
  @media (max-width: 710px) {
    width: 10%;
  }
  @media (max-width: 576px) {
    width: 12%;
  }
  @media (max-width: 480px) {
    width: 14%;
  }
  @media (max-width: 430px) {
    width: 16%;
  }
`;
export const ColRightComment = styled.div`
  flex: 1;
`;
export const DivRightComment = styled.div`
  text-align: left;
  position: relative;
`;

export const DivContent = styled.div`
  display: inline-block;

  & > div {
    display: flex;
  }
`;
export const DivLeft = styled.div`
  margin-right: 10px;
  border: 1px solid var(--white-bg);
  border-radius: 10px;
  background-color: var(--bg-comment);
`;

export const DivActionUpdate = styled.div``;

export const AvatarUserComment = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;
export const NameUser = styled.h3`
  margin: 0 10px;
  padding: 5px 0 0;
  text-align: left;
  color: var(--white-bg);
`;
export const ContentUser = styled.p`
  text-align: left;
  padding: 5px 10px;
  color: var(--white);
`;

export const TextTime = styled.p`
  margin-right: 1rem;
`;

export const DivAction = styled.div`
  margin-top: 4px;
`;
export const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  color: var(--white-bg);
  cursor: pointer;
  padding: 5px 10px 5px 0;
  & p {
    margin-left: 6px;
    font-weight: 500;
    font-size: 14px;
  }
`;

// action comment
export const DivContainerAction = styled.div`
  display: flex;
  align-items: center;
`;

export const DivDetailCommentReply = styled.div`
  padding-bottom: 14px;
`;

export const DivActionComment = styled.div`
  cursor: pointer;
  background: var(--bg-comment);
  padding: 0 3px;
  border-radius: 4px;
  & span {
    font-size: 30px;
    color: var(--white-bg);
    font-weight: 700;
  }
`;

export const ButtonComment = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 5px 10px;
`;

export const DivInput = styled.div``;

export const DivUpdate = styled.div`
  text-align: left;
  margin-top: 12px;
`;

export const ButtonSend = styled.button`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 700;
  background-color: #006fcd;
  color: var(--white-bg);
  padding: 8px 20px;
  border-radius: 5px;
  uppercase: true;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 111, 205, 0.7);
  }
`;
