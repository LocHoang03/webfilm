import { useContext, useRef, useState } from 'react';
import {
  DivContainerChat,
  RowContainer,
  ColContainer,
  DivLeft,
  DivRight,
  DivLeftItem,
  ListChat,
  ItemChat,
  LeftItem,
  RightItem,
  DivHeader,
  ListMessage,
  ItemMessage,
  FormChat,
  ButtonChat,
  DivContentChat,
  TextUser,
  TextUserResponse,
  DivItemChat,
  DivItemChatUser,
  ChatItemContent,
  DivInfo,
  DivRightItem,
  LeftHeaderItem,
  RightHeaderItem,
  DivOutRoom,
  ButtonOutRoom,
  DivAvatar,
  DivText,
  DivTextUser,
  DivAvatarUser,
  DivInfoOut,
  ButtonInfo,
  BtnIcon,
  DivPicker,
  DivFile,
  LabelFile,
  ArrowBottom,
  BtnExit,
  DivImage,
  DivError,
} from './styles';
import { Popconfirm } from 'antd';
import {
  SendOutlined,
  LogoutOutlined,
  SmileOutlined,
  LinkOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import ChildrenContext from '../../contexts/ChildrenContext';
import { RoleContext } from '../../contexts/UserContext';
import {
  API_UPDATE_JOIN_MESSAGE,
  API_UPDATE_MESSAGE,
  API_UPDATE_OFF_MESSAGE,
} from '../../configs/apis';
import LoadingComponent from '../../components/LoadingComponent';
import EmojiPicker from 'emoji-picker-react';

function ChatPage() {
  const {
    listChat,
    socket,
    socketUser,
    setMessage,
    message,
    isLoading,
    input,
    setInput,
    chooseChat,
    setChooseChat,
    setListChat,
    visible,
    handleOutRoom,
    setImagePreview,
    imagePreview,
    setFile,
    file,
  } = useContext(ChildrenContext);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);
  const { userInfo } = useContext(RoleContext);

  const handleSubmitChat = async (e, roomId) => {
    setOpenEmoji(false);
    if (!input[roomId] && !file[roomId]) {
      return;
    }

    const dataForm = new FormData();
    dataForm.append('input', input[roomId]);
    dataForm.append('userId', userInfo.userId);
    dataForm.append('firstName', userInfo.firstName);
    dataForm.append('lastName', userInfo.lastName);
    dataForm.append(
      'time',
      `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
    );
    dataForm.append('avatar', JSON.stringify(userInfo.avatarUser));

    const filePreview =
      imagePreview && imagePreview[roomId] ? imagePreview[roomId] : undefined;
    setImagePreview((prev) => ({ ...prev, [roomId]: null }));
    let data = null,
      dataLength = message && message[roomId] ? message[roomId].length : 0;
    if (input[roomId]) {
      dataLength = dataLength + 1;
      data = {
        input: input[roomId],
        roomId: roomId,
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          (new Date(Date.now()).getMinutes() > 9
            ? new Date(Date.now()).getMinutes()
            : '0' + new Date(Date.now()).getMinutes()),
        avatar: userInfo.avatarUser,
      };
      setMessage((prev) => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), data],
      }));
      setInput((prev) => ({
        ...prev,
        [roomId]: '',
      }));
      scrollToBottom();
      socketUser.emit('chatCustomer', data);
      await fetch(API_UPDATE_MESSAGE + '/' + roomId, {
        method: 'PATCH',
        body: dataForm,
      });
    }

    if (file && file[roomId]) {
      dataForm.append('file', file[roomId]);
      let newDataAdd = {
        input: '',
        roomId: roomId,
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          (new Date(Date.now()).getMinutes() > 9
            ? new Date(Date.now()).getMinutes()
            : '0' + new Date(Date.now()).getMinutes()),
        avatar: userInfo.avatarUser,
        file: filePreview,
        status: false,
      };

      setMessage((prev) => {
        let newMessages = { ...prev };

        if (!newMessages[roomId]) {
          newMessages[roomId] = [];
        }

        newMessages[roomId] = [...newMessages[roomId], newDataAdd];

        return newMessages;
      });

      setMessage((prev) => {
        let newMessages = { ...prev };

        return newMessages;
      });

      const response = await fetch(API_UPDATE_MESSAGE + '/' + roomId, {
        method: 'PATCH',
        body: dataForm,
      });
      const json = await response.json();
      let newData = {
        ...newDataAdd,
        status: true,
      };
      setMessage((prev) => {
        let newMessages = { ...prev };
        newMessages[roomId][dataLength] = newData;

        return newMessages;
      });
      data = {
        ...newDataAdd,
        file: json.data.messages[json.data.messages.length - 1].file,
        time: json.data.messages[json.data.messages.length - 1].time,
      };
      socketUser.emit('chatCustomer', data);
    }
    socket.off('chatCustomer');
    setFile((prev) => ({ ...prev, [roomId]: undefined }));
    inputRef.current.value = null;
    scrollToBottom();
  };

  const onConfirm = async (e, roomId) => {
    socket.emit('leaveRoom', roomId);
    socket.off('leaveRoom');
    setMessage((prev) => {
      let newMessage = { ...prev };
      delete newMessage[roomId];
      return newMessage;
    });
    setListChat((prev) => prev.filter((item) => item.roomId !== roomId));
    if (listChat.length - 1 > 0) {
      setChooseChat(listChat[0].roomId);
    } else {
      setChooseChat();
    }
    await fetch(API_UPDATE_OFF_MESSAGE + '/' + roomId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const onCancel = (e) => {};

  // scroll bottom
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector('.chat-content-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleChooseChat = (id) => {
    setChooseChat(id);
  };

  const handleClickEmoji = (roomId) => {
    setOpenEmoji((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  // check change file
  const handleChangeFile = (e, roomId) => {
    if (!e.target.files[0]) {
      return;
    }
    const checkType = ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4'];
    if (!checkType.includes(e?.target?.files[0]?.type)) {
      setError((prev) => ({ ...prev, [roomId]: true }));
      e.target.value = '';
      setTimeout(() => {
        setError((prev) => ({ ...prev, [roomId]: false }));
      }, 2500);
      return;
    }

    setImagePreview((prev) => ({ ...prev, [roomId]: undefined }));
    setDisabled(true);
    setIsLoad(true);
    const fileChange = e.target.files[0];

    setFile((prev) => ({ ...prev, [roomId]: e.target.files[0] }));
    if (fileChange) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (fileChange.type.startsWith('image/')) {
          setImagePreview((prev) => ({
            ...prev,
            [roomId]: {
              url: e.target.result,
              type: 'image',
            },
          }));
        } else {
          setImagePreview((prev) => ({
            ...prev,
            [roomId]: {
              url: e.target.result,
              type: 'video',
            },
          }));
        }
      };
      reader.readAsDataURL(fileChange);
    }
    setIsLoad(false);
    setDisabled(false);
    inputRef.current.value = null;
  };

  const handleExitImage = (roomId) => {
    setImagePreview((prev) => ({
      ...prev,
      [roomId]: undefined,
    }));
  };

  const handleImageClick = (imageId) => {
    const imgRef = document.getElementById(`image-${imageId}`);

    if (imgRef) {
      if (imgRef.requestFullscreen) {
        imgRef.requestFullscreen();
      } else if (imgRef.mozRequestFullScreen) {
        // Firefox
        imgRef.mozRequestFullScreen();
      } else if (imgRef.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        imgRef.webkitRequestFullscreen();
      } else if (imgRef.msRequestFullscreen) {
        // IE/Edge
        imgRef.msRequestFullscreen();
      }
    }
  };

  const handleJoinChat = async (roomId) => {
    setListChat((prev) =>
      prev.map((item) =>
        item.roomId === roomId ? { ...item, adminId: userInfo.userId } : item,
      ),
    );
    const data = {
      roomId: roomId,
      userId: userInfo.userId,
    };
    const result = await fetch(API_UPDATE_JOIN_MESSAGE, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await result.json();
    if (json.success) {
      console.log(data);
      socket.emit('joinRoom', data.roomId);
      socket.emit('deleteRoom', data);
    }
  };

  if (isLoading || !listChat || !message) {
    return (
      <DivContainerChat>
        <LoadingComponent />
      </DivContainerChat>
    );
  }

  console.log(
    listChat.map((chat) => console.log(chat.adminId === userInfo.userId)),
  );
  return (
    <DivContainerChat>
      <RowContainer>
        <ColContainer span={8}>
          <DivLeft>
            <h2>Tin nhắn trò chuyện</h2>
            <ListChat>
              {listChat &&
                listChat.length > 0 &&
                listChat.map((item, id) => {
                  if (item.adminId === userInfo.userId || !item.adminId) {
                    return (
                      <ItemChat key={id}>
                        <DivLeftItem
                          onClick={() => handleChooseChat(item.roomId)}
                          className={
                            chooseChat === item.roomId ? 'background-chat' : ''
                          }>
                          <LeftItem>
                            <img
                              src={item.userInfo.avatarUser.url}
                              alt={item.userInfo.avatarUser.imageId}
                            />
                          </LeftItem>
                          <RightItem>
                            <p>
                              {item.userInfo.firstName +
                                ' ' +
                                item.userInfo.lastName}
                            </p>
                            {message[item.roomId] &&
                              message[item.roomId].length > 0 && (
                                <p>
                                  {
                                    message[item.roomId][
                                      message[item.roomId].length - 1
                                    ].input
                                  }
                                </p>
                              )}
                          </RightItem>
                        </DivLeftItem>
                      </ItemChat>
                    );
                  }
                })}
              {(listChat.length < 1 ||
                (listChat.length > 0 &&
                  !listChat.some((chat) => !chat.adminId) &&
                  listChat.every(
                    (chat) => chat.adminId !== userInfo.userId,
                  ))) && (
                <DivInfo>
                  <h3>Không có cuộc trò chuyện</h3>
                </DivInfo>
              )}
            </ListChat>
          </DivLeft>
        </ColContainer>
        <ColContainer span={16}>
          <DivRight>
            <ListMessage>
              {listChat &&
                listChat.length > 0 &&
                listChat.map((item, id) => {
                  if (item.adminId === userInfo.userId || !item.adminId) {
                    return (
                      chooseChat === item.roomId && (
                        <ItemMessage key={id}>
                          {!item.adminId && (
                            <DivInfoOut>
                              <div>
                                <p style={{ textAlign: 'center' }}>
                                  Phiên trò chuyện chưa được nhận bởi bất cứ ai.
                                </p>
                                <ButtonInfo
                                  onClick={() => handleJoinChat(item.roomId)}>
                                  Tham gia trò chuyện
                                </ButtonInfo>
                              </div>
                            </DivInfoOut>
                          )}
                          {visible[item.roomId] && (
                            <DivInfoOut>
                              <div>
                                <p>Phiên trò chuyện này đã kết thúc</p>
                                <ButtonInfo
                                  onClick={() => handleOutRoom(item.roomId)}>
                                  Đồng ý
                                </ButtonInfo>
                              </div>
                            </DivInfoOut>
                          )}
                          <DivHeader>
                            <DivRightItem>
                              <LeftHeaderItem>
                                <img
                                  src={item.userInfo.avatarUser.url}
                                  alt={item.userInfo.avatarUser.imageId}
                                />
                              </LeftHeaderItem>
                              <RightHeaderItem>
                                <p>
                                  {item.userInfo.firstName +
                                    ' ' +
                                    item.userInfo.lastName}
                                </p>
                              </RightHeaderItem>
                            </DivRightItem>
                            <DivOutRoom>
                              <Popconfirm
                                title="Rời phòng"
                                description="Bạn có chắc chắn rời khỏi phòng này không?"
                                onConfirm={(e) => onConfirm(e, item.roomId)}
                                onCancel={onCancel}
                                okText="Đồng ý"
                                cancelText="Từ chối">
                                <ButtonOutRoom>
                                  <LogoutOutlined />
                                </ButtonOutRoom>
                              </Popconfirm>
                            </DivOutRoom>
                          </DivHeader>
                          <DivContentChat>
                            {error && error[item.roomId] && (
                              <DivError>
                                <p>
                                  Tệp chỉ ghi hình ảnh ở định dạng jpg/jpeg/png
                                  định dạng hoặc video ở định dạng mp4!!
                                </p>
                              </DivError>
                            )}

                            <ChatItemContent>
                              <div className="chat-content-scroll">
                                {message[item.roomId] &&
                                  message[item.roomId].length > 0 &&
                                  message[item.roomId].map((itemMes, id) => {
                                    return itemMes.userId ===
                                      userInfo.userId ? (
                                      <DivItemChat>
                                        <DivTextUser>
                                          {itemMes.input && !itemMes.file ? (
                                            <>
                                              <TextUser
                                                key={id}
                                                style={{ color: '#000' }}>
                                                <span>{itemMes.input}</span>
                                              </TextUser>
                                              <p>{itemMes.time}</p>
                                            </>
                                          ) : itemMes.file.type === 'image' ? (
                                            <>
                                              <DivFile>
                                                <img
                                                  src={itemMes.file.url}
                                                  alt={itemMes.file.url}
                                                  id={`image-${id}`}
                                                  onClick={() =>
                                                    handleImageClick(id)
                                                  }
                                                />
                                              </DivFile>
                                              <p>
                                                {itemMes.status !== undefined &&
                                                itemMes.status === false
                                                  ? 'Đang gửi'
                                                  : itemMes.time}
                                              </p>
                                            </>
                                          ) : (
                                            <>
                                              <>
                                                <DivFile>
                                                  <video
                                                    controls
                                                    style={{
                                                      maxWidth: '100%',
                                                    }}>
                                                    <source
                                                      src={itemMes.file.url}
                                                      type="video/mp4"
                                                    />
                                                    Trình duyệt của bạn không
                                                    video hỗ trợ.
                                                  </video>
                                                </DivFile>
                                                <p>
                                                  {itemMes.status !==
                                                    undefined &&
                                                  itemMes.status === false
                                                    ? 'Đang gửi'
                                                    : itemMes.time}
                                                </p>
                                              </>
                                            </>
                                          )}
                                        </DivTextUser>
                                        <DivAvatarUser>
                                          <img
                                            src={itemMes?.avatar?.url}
                                            alt={itemMes?.avatar?.imageId}
                                          />
                                        </DivAvatarUser>
                                      </DivItemChat>
                                    ) : (
                                      <DivItemChatUser>
                                        <DivAvatar>
                                          <img
                                            src={itemMes?.avatar?.url}
                                            alt={itemMes?.avatar?.imageId}
                                          />
                                        </DivAvatar>
                                        <DivText>
                                          {itemMes.input && !itemMes?.file ? (
                                            <TextUserResponse
                                              key={id}
                                              style={{ color: '#000' }}>
                                              <span>{itemMes.input}</span>
                                            </TextUserResponse>
                                          ) : itemMes?.file?.type ===
                                            'image' ? (
                                            <DivFile>
                                              <img
                                                src={itemMes.file.url}
                                                alt={itemMes.file.url}
                                                id={`image-${id}`}
                                                onClick={() =>
                                                  handleImageClick(id)
                                                }
                                              />
                                            </DivFile>
                                          ) : (
                                            <>
                                              <DivFile>
                                                <video
                                                  controls
                                                  style={{ maxWidth: '100%' }}>
                                                  <source
                                                    src={itemMes.file.url}
                                                    type="video/mp4"
                                                  />
                                                  Trình duyệt của bạn không hỗ
                                                  trợ video.
                                                </video>
                                              </DivFile>
                                            </>
                                          )}
                                          <p>{itemMes.time}</p>
                                        </DivText>
                                      </DivItemChatUser>
                                    );
                                  })}
                              </div>
                            </ChatItemContent>
                            <FormChat>
                              <input
                                ref={inputRef}
                                name="search"
                                placeholder="Nhập tin nhắn trò chuyện"
                                value={input[item.roomId] || ''}
                                onChange={(e) => {
                                  setInput((prev) => ({
                                    ...prev,
                                    [item.roomId]: '' + e.target.value,
                                  }));
                                  setOpenEmoji((prev) => ({
                                    ...prev,
                                    [item.roomId]: false,
                                  }));
                                }}
                              />
                              <LabelFile htmlFor="file">
                                <LinkOutlined />
                                <input
                                  id="file"
                                  name="file"
                                  type="file"
                                  hidden
                                  onChange={(e) =>
                                    handleChangeFile(e, item.roomId)
                                  }
                                />
                              </LabelFile>
                              <BtnIcon
                                onClick={() => handleClickEmoji(item.roomId)}>
                                <SmileOutlined />
                              </BtnIcon>
                              {openEmoji && openEmoji[item.roomId] && (
                                <DivPicker>
                                  <EmojiPicker
                                    onEmojiClick={(emojiObject) => {
                                      setInput((prev) => ({
                                        ...prev,
                                        [item.roomId]:
                                          prev[item.roomId] !== undefined
                                            ? prev[item.roomId] +
                                              emojiObject.emoji
                                            : emojiObject.emoji,
                                      }));
                                      setOpenEmoji((prev) => ({
                                        ...prev,
                                        [item.roomId]: false,
                                      }));
                                    }}
                                  />
                                </DivPicker>
                              )}
                              <ButtonChat
                                onClick={(e) =>
                                  handleSubmitChat(e, item.roomId)
                                }>
                                <SendOutlined />
                              </ButtonChat>
                            </FormChat>
                            {imagePreview && imagePreview[item.roomId] && (
                              <DivImage>
                                {isLoad ? (
                                  <LoadingOutlined />
                                ) : (
                                  <>
                                    <BtnExit
                                      onClick={(e) =>
                                        handleExitImage(item.roomId)
                                      }>
                                      <CloseCircleOutlined />
                                    </BtnExit>
                                    {imagePreview[item.roomId].type ===
                                    'image' ? (
                                      <img
                                        src={imagePreview[item.roomId].url}
                                        alt={imagePreview[item.roomId].url}
                                      />
                                    ) : (
                                      <>
                                        <video
                                          controls
                                          style={{
                                            maxWidth: '100%',
                                            height: '180px',
                                          }}>
                                          <source
                                            src={imagePreview[item.roomId].url}
                                            type="video/mp4"
                                          />
                                          Trình duyệt của bạn không hỗ trợ
                                          video.
                                        </video>
                                      </>
                                    )}
                                  </>
                                )}
                                <ArrowBottom />
                              </DivImage>
                            )}
                          </DivContentChat>
                        </ItemMessage>
                      )
                    );
                  }
                })}
              {(listChat.length < 1 ||
                (listChat.length > 0 &&
                  !listChat.some((chat) => !chat.adminId) &&
                  listChat.every(
                    (chat) => chat.adminId !== userInfo.userId,
                  ))) && (
                <DivInfo>
                  <h3>Không có cuộc trò chuyện</h3>
                </DivInfo>
              )}
            </ListMessage>
          </DivRight>
        </ColContainer>
      </RowContainer>
    </DivContainerChat>
  );
}

export default ChatPage;
