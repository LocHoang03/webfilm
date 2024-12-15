import { Col, Row } from 'antd';
import styled from 'styled-components';

export const DivListComment = styled.div`
  background-color: transparent;
  margin: 50px 0;
`;

export const DivDetailComment = styled.div`
  padding: 25px 0 10px;
`;

export const RowComment = styled(Row)``;
export const ColLeftComment = styled(Col)`
  text-align: left;
`;
export const ColRightComment = styled(Col)``;

export const DivContent = styled.div`
  margin-right: 10px;
  border: 1px solid #ccc;
`;

export const AvatarUserComment = styled.img`
  width: 45px;
  height: 45px;
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

export const DivAction = styled.div`
  margin-top: 10px;
`;
export const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  color: #3f94d5;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  & p {
    margin-left: 6px;
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

export const NoCommentTitle = styled.h3`
  margin: 150px 0;
  color: var(--white-bg);
`;

export const DivActionComment = styled.div`
  margin-left: 4px;
  cursor: pointer;
  & span {
    font-size: 30px;
    color: #3f94d5;
  }
`;

export const ButtonComment = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  padding: 5px 10px;
`;
