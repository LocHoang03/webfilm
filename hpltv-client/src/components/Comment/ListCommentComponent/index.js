import { useContext, useEffect, useState } from 'react';
import {
  DivDetailComment,
  NameUser,
  ContentUser,
  RowComment,
  DivContent,
  ColLeftComment,
  ColRightComment,
  AvatarUserComment,
  DivAction,
  ReplyButton,
  DivActionComment,
  DivContainerAction,
  ButtonComment,
  DivInput,
  DivUpdate,
  ButtonSend,
  DivRightComment,
  TextTime,
  DivActionUpdate,
  DivLeft,
} from './styles';
import { Dropdown, Space, Col, Menu, Input, Button } from 'antd';
import { MessageFilled, EllipsisOutlined } from '@ant-design/icons';
import ReplyTextComponent from '../ReplyTextComponent';
import { CheckLoginContext } from '../../../contexts/LoginContext';
const { TextArea } = Input;

function ListCommentComponent({
  item,
  open,
  setOpen,
  handleOpenReply,
  handleClickAction,
  input,
  setInput,
  updateCommentClick,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(item.content);
  }, [item.content]);

  const { userInfo } = useContext(CheckLoginContext);

  function timeAgo() {
    const now = new Date();
    const commentDate = new Date(item.createAt);
    const diff = Math.abs(now - commentDate);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }

  const handleUpdateComment = (id) => {
    if (!value) {
      return;
    }
    updateCommentClick(value, id);
  };
  const handleCancelComment = (id) => {
    setInput((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <DivDetailComment className="detail-comment">
      <RowComment>
        <ColLeftComment>
          <AvatarUserComment src={item.userId.avatarUser.url} />
        </ColLeftComment>
        <ColRightComment>
          <DivRightComment>
            {input[item._id] ? (
              <DivInput>
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <DivUpdate>
                  <ButtonSend onClick={() => handleUpdateComment(item._id)}>
                    Cập nhật
                  </ButtonSend>
                  <ButtonSend onClick={() => handleCancelComment(item._id)}>
                    Hủy bỏ
                  </ButtonSend>
                </DivUpdate>
              </DivInput>
            ) : (
              <>
                <DivContent>
                  <div>
                    <DivLeft>
                      <NameUser>
                        {item.userId.lastName} {item.userId.firstName}
                      </NameUser>
                      <ContentUser>{item.content}</ContentUser>
                    </DivLeft>
                    <DivActionUpdate>
                      {userInfo.userId === item.userId._id &&
                        !input[item._id] && (
                          <DivActionComment className="open-action-comment">
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Menu.Item key="edit">
                                    <ButtonComment
                                      onClick={() =>
                                        handleClickAction('UPDATE', item._id)
                                      }>
                                      Chỉnh sửa
                                    </ButtonComment>
                                  </Menu.Item>
                                  <Menu.Item key="delete">
                                    <ButtonComment
                                      onClick={() =>
                                        handleClickAction('DELETE', item._id)
                                      }>
                                      Xóa
                                    </ButtonComment>
                                  </Menu.Item>
                                </Menu>
                              }
                              placement="bottomRight">
                              <Space>
                                <EllipsisOutlined />
                              </Space>
                            </Dropdown>
                          </DivActionComment>
                        )}
                    </DivActionUpdate>
                  </div>
                </DivContent>
                <DivAction>
                  <DivContainerAction>
                    <TextTime>{timeAgo()}</TextTime>
                    <ReplyButton onClick={() => handleOpenReply(item._id)}>
                      <MessageFilled />
                      <p>Trả lời</p>
                    </ReplyButton>
                  </DivContainerAction>
                </DivAction>
              </>
            )}
          </DivRightComment>
          {open[item._id] && (
            <ReplyTextComponent
              item={item}
              rootId={item._id}
              setOpen={setOpen}
            />
          )}
        </ColRightComment>
      </RowComment>
    </DivDetailComment>
  );
}

export default ListCommentComponent;
