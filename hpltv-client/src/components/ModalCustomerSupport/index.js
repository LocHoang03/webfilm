import {
  MinusOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  SmileOutlined,
  LinkOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  ModalCustomer,
  BtnLog,
  DivContainer,
  DivContainerChat,
  Title,
  DivChat,
  FormChat,
  ButtonChat,
  DivContentChat,
  TitleChat,
  ChatContent,
  TextUser,
  TextUserResponse,
  TextWelcome,
  DivItemChat,
  DivItemChatRes,
  DivTextUser,
  DivAvatarUser,
  DivText,
  DivAvatar,
  DivInfo,
  ButtonInfo,
  BtnIcon,
  TitleChatSHowHub,
  DivPicker,
  LabelFile,
  DivImage,
  ArrowBottom,
  BtnExit,
  DivError,
  DivFile,
} from './styles';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import { CheckLoginContext } from '../../contexts/LoginContext';
import {
  API_GET_ON_MESSAGE_USER,
  API_UPDATE_MESSAGE,
  API_UPDATE_OFF_MESSAGE,
} from '../../configs/apis';
import EmojiPicker from 'emoji-picker-react';

function ModalCustomerSupport({
  isModal,
  handleOk,
  handleCancel,
  isState,
  setIsState,
  socket,
  socketAdmin,
  handleChatCustomer,
  setMessage,
  message,
  roomId,
  setRoomId,
  visible,
  handleOutRoom,
  setImagePreview,
  imagePreview,
  setFile,
  file,
  socketConnect,
  socketConnectAdmin,
}) {
  const [input, setInput] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(false);
  const [nameAdmin, setNameAdmin] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(CheckLoginContext);

  //  lấy thông tin phòng chat xem ng dùng trc đó đã ở phòng chat chưa
  useEffect(() => {
    setIsState(undefined);

    const fetchListChat = async () => {
      const response = await fetch(
        API_GET_ON_MESSAGE_USER + '/' + userInfo.userId,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await response.json();
      if (json.success) {
        setMessage(json.data.messages);
        setRoomId(json.data.roomId);
        setNameAdmin(
          json.data?.participants?.adminId
            ? `${json.data.participants.adminId.lastName} ${json.data.participants.adminId.firstName}`
            : '',
        );
        socketConnect.emit('joinRoom', json.data);
        setIsState(2);
        scrollToBottom();
      } else {
        setIsState(0);
        setMessage([]);
        setRoomId();
      }
    };
    fetchListChat();
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollToBottom();
      setIsLoading(false);
    }, 2000);
  }, [message]);

  const handleChat = () => {
    setIsState(1);
    setMessage([]);
    handleChatCustomer();
  };

  // send data chat

  const handleSubmitChat = async (e) => {
    setOpenEmoji(false);
    if (!input && !file) {
      return;
    }

    const dataForm = new FormData();
    dataForm.append('input', input);
    dataForm.append('userId', userInfo.userId);
    dataForm.append('firstName', userInfo.firstName);
    dataForm.append('lastName', userInfo.lastName);
    dataForm.append(
      'time',
      `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
    );
    dataForm.append('avatar', JSON.stringify(userInfo.avatarUser));

    setImagePreview();
    let data = null,
      dataLength = message.length;
    if (input) {
      dataLength = dataLength + 1;
      data = {
        input: input,
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
      setMessage((prev) => [...prev, data]);
      scrollToBottom();

      socket.emit('chatCustomerAdmin', { roomId: roomId, data: data });

      await fetch(API_UPDATE_MESSAGE + '/' + roomId, {
        method: 'PATCH',
        body: dataForm,
      });
    }

    if (file) {
      dataForm.append('file', file);
      data = {
        input: '',
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
        file: imagePreview,
        status: false,
      };
      setMessage((prev) => [...prev, data]);

      const response = await fetch(API_UPDATE_MESSAGE + '/' + roomId, {
        method: 'PATCH',
        body: dataForm,
      });
      const json = await response.json();
      let newData = {
        ...data,
        status: true,
      };
      setMessage((prev) => {
        let newMessages = [...prev];
        newMessages[dataLength] = newData;
        return newMessages;
      });
      scrollToBottom();

      let dataMessage = {
        ...data,
        file: json.data.messages[json.data.messages.length - 1].file,
        time: json.data.messages[json.data.messages.length - 1].time,
      };
      socket.emit('chatCustomerAdmin', { roomId: roomId, data: dataMessage });
    }
    setInput('');
    setFile();
    scrollToBottom();
  };

  // scroll bottom
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector('.chat-content-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  // confirm out chat
  const onConfirm = async () => {
    socket.emit('leaveRoom', roomId);
    socket.off('leaveRoom');
    socket.emit('receiveLeaveRoom', roomId);
    socket.off('receiveLeaveRoom');
    setIsState(0);
    setMessage([]);
    setRoomId();
    setFile();
    setImagePreview();

    await fetch(API_UPDATE_OFF_MESSAGE + '/' + roomId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onCancel = (e) => {};

  const handleClickEmoji = () => {
    setOpenEmoji((prev) => !prev);
  };
  // biểu tường icon
  const handleAddEmoji = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setOpenEmoji((prev) => !prev);
  };

  // check change file
  const handleChangeFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const checkType = ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4'];
    if (!checkType.includes(e?.target?.files[0]?.type)) {
      setError(true);
      e.target.value = '';
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }
    setImagePreview();
    setDisabled(true);
    setIsLoad(true);
    const fileChange = e.target.files[0];
    setFile(e.target.files[0]);
    if (fileChange) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (fileChange.type.startsWith('image/')) {
          setImagePreview({
            url: e.target.result,
            type: 'image',
          });
        } else {
          setImagePreview({
            url: e.target.result,
            type: 'video',
          });
        }
      };
      reader.readAsDataURL(fileChange);
    }
    setIsLoad(false);
    setDisabled(false);
  };

  /// xóa ảnh
  const handleExitImage = () => {
    setImagePreview();
  };

  //  lấy ảnh để gửi chat
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

  return (
    <ModalCustomer
      open={isModal}
      style={{ right: 30, top: 10 }}
      closeIcon={<MinusOutlined />}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      {error && (
        <DivError>
          <p>
            Tệp chỉ ghi hình ảnh ở định dạng jpg/jpeg/png hoặc video ở định dạng
            mp4.
          </p>
        </DivError>
      )}
      {visible && (
        <DivInfo>
          <div>
            <p>Phiên trò chuyện này đã kết thúc.</p>
            <ButtonInfo onClick={handleOutRoom}>Đồng ý</ButtonInfo>
          </div>
        </DivInfo>
      )}
      {isState !== 2 ? (
        <DivContainer>
          <Title>SHOWHUB</Title>
          {isState === 0 && (
            <DivChat>
              <p>
                Chào mừng đến với SHOWHUB! Trang web xem phim chất lượng hàng
                đầu!
              </p>
              <button onClick={handleChat}>
                Trò chuyện ngay bây giờ
                <SendOutlined />
              </button>
            </DivChat>
          )}
        </DivContainer>
      ) : (
        <DivContainerChat>
          <Popconfirm
            title="Rời phòng chat"
            description="Bạn có chắc chắn rời khỏi phòng này không?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Đồng ý"
            cancelText="Hủy">
            <BtnLog>
              <ArrowLeftOutlined />
            </BtnLog>
          </Popconfirm>

          <TitleChatSHowHub>SHOWHUB</TitleChatSHowHub>
          {isLoading ? (
            <LoadingOutlined className="loading-chat" />
          ) : (
            <DivContentChat>
              <TitleChat>Trò chuyện với quản trị viên {nameAdmin}</TitleChat>
              <ChatContent className="chat-content-scroll">
                <TextWelcome>Chào mừng đến với cuộc trò chuyện.</TextWelcome>
                {message &&
                  message.length > 0 &&
                  message.map((itemMes, id) => {
                    return itemMes.userId === userInfo.userId ? (
                      <DivItemChat>
                        <DivTextUser>
                          {itemMes.input && !itemMes.file ? (
                            <>
                              <TextUser key={id} style={{ color: '#000' }}>
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
                                  onClick={() => handleImageClick(id)}
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
                                  <video controls style={{ maxWidth: '100%' }}>
                                    <source
                                      src={itemMes.file.url}
                                      type="video/mp4"
                                    />
                                    Trình duyệt của bạn không hỗ trợ video.
                                  </video>
                                </DivFile>
                                <p>
                                  {itemMes.status !== undefined &&
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
                            src={itemMes.avatar.url}
                            alt={itemMes.avatar.imageId}
                          />
                        </DivAvatarUser>
                      </DivItemChat>
                    ) : (
                      <DivItemChatRes>
                        <DivAvatar>
                          <img
                            src={itemMes?.avatar?.url}
                            alt={itemMes?.avatar?.imageId}
                          />
                        </DivAvatar>
                        <DivText>
                          {itemMes.input && !itemMes.file ? (
                            <TextUserResponse
                              key={id}
                              style={{ color: '#000' }}>
                              {itemMes.input}
                            </TextUserResponse>
                          ) : itemMes.file.type === 'image' ? (
                            <DivFile>
                              <img
                                src={itemMes.file.url}
                                alt={itemMes.file.url}
                                id={`image-${id}`}
                                onClick={() => handleImageClick(id)}
                              />
                            </DivFile>
                          ) : (
                            <>
                              <DivFile>
                                <video controls style={{ maxWidth: '100%' }}>
                                  <source
                                    src={itemMes.file.url}
                                    type="video/mp4"
                                  />
                                  Trình duyệt của bạn không hỗ trợ video.
                                </video>
                              </DivFile>
                            </>
                          )}
                          <p>{itemMes.time}</p>
                        </DivText>
                      </DivItemChatRes>
                    );
                  })}
              </ChatContent>
              <FormChat>
                <input
                  name="search"
                  placeholder="Nhập tin nhắn trò chuyện"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <LabelFile htmlFor="file">
                  <LinkOutlined />
                  <input
                    id="file"
                    name="file"
                    type="file"
                    hidden
                    onChange={handleChangeFile}
                  />
                </LabelFile>
                <BtnIcon onClick={handleClickEmoji}>
                  <SmileOutlined />
                </BtnIcon>
                {openEmoji && (
                  <DivPicker>
                    <EmojiPicker onEmojiClick={handleAddEmoji} />
                  </DivPicker>
                )}
                <ButtonChat disabled={disabled} onClick={handleSubmitChat}>
                  <SendOutlined />
                </ButtonChat>
              </FormChat>
              {imagePreview && (
                <DivImage>
                  {isLoad ? (
                    <LoadingOutlined />
                  ) : (
                    <>
                      <BtnExit onClick={handleExitImage}>
                        <CloseCircleOutlined />
                      </BtnExit>
                      {imagePreview.type === 'image' ? (
                        <img src={imagePreview.url} alt={imagePreview.url} />
                      ) : (
                        <>
                          <video
                            controls
                            style={{ maxWidth: '100%', height: '180px' }}>
                            <source src={imagePreview.url} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ video.
                          </video>
                        </>
                      )}
                    </>
                  )}
                  <ArrowBottom />
                </DivImage>
              )}
            </DivContentChat>
          )}
        </DivContainerChat>
      )}
    </ModalCustomer>
  );
}

export default ModalCustomerSupport;
