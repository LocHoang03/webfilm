import React, { useContext, useEffect, useState } from 'react';
import {
  DollarOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  TeamOutlined,
  BarChartOutlined,
  LockOutlined,
  RestOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Layout, theme } from 'antd';
import HeaderAdmin from '../components/HeaderComponent';
import FooterAdmin from '../components/FooterComponent';
import SiderAdmin from './SiderLayout';
import ChildrenContext from '../contexts/ChildrenContext';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { DivContainerWeb, DivSider } from './styles';
import { io } from 'socket.io-client';
import { API_GET_ON_MESSAGE } from '../configs/apis';
import { RoleContext } from '../contexts/UserContext';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const newSocket = io(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin`);
const newSocketUser = io(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user`);

function LayoutAdmin({ children }) {
  const [select, setSelect] = useState(
    window.location.pathname === '/' ||
      window.location.pathname.slice(1) === 'login' ||
      window.location.pathname.slice(1) === ''
      ? 'home'
      : window.location.pathname.slice(1),
  );

  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useContext(RoleContext);
  const items = [
    userInfo.role === 'superAdmin' &&
      getItem('Thống kê', 'statistics', <BarChartOutlined />),
    userInfo.role !== 'adminCustom' &&
      getItem('Quản lý phim', 'assets', <WalletOutlined />, [
        getItem('Phim bộ', 'series'),
        getItem('Các tập của phim bộ', 'film-for-series'),
        getItem('Phim lẻ', 'movies'),
        getItem('Thể loại', 'category'),
      ]),
    userInfo.role !== 'adminFilm' &&
      getItem('Quản lý', 'manage', <TeamOutlined />, [
        userInfo.role === 'superAdmin' &&
          getItem('Tài khoản nhân viên', 'user'),
        userInfo.role !== 'adminFilm' &&
          getItem('Tài khoản khách hàng', 'subscriber'),
      ]),
    userInfo.role !== 'adminCustom' &&
      getItem('Thanh toán', 'payment', <DollarOutlined />),
    userInfo.role !== 'adminCustom' &&
      getItem('Gói mua hàng', 'subscription-price', <DollarOutlined />),
    userInfo.role !== 'adminFilm' &&
      getItem(
        'Chăm sóc khách hàng',
        'support-customer',
        <CustomerServiceOutlined />,
      ),
    userInfo.role !== 'adminFilm' &&
      getItem('Câu hỏi', 'question', <QuestionCircleOutlined />, [
        getItem('Câu hỏi thường gặp', 'common-questions'),
        getItem('Câu hỏi từ khách hàng', 'customer-questions'),
      ]),
    userInfo.role !== 'adminFilm' &&
      getItem('Khóa tài khoản', 'banned account', <LockOutlined />, [
        getItem('Khách hàng', 'banned-subscriber'),
      ]),
    userInfo.role !== 'adminCustom' &&
      getItem('Thùng rác', 'trash', <RestOutlined />, [
        getItem('Phim bộ', 'trash-series'),
        getItem('Các tập của phim bộ', 'trash-film-for-series'),
        getItem('Phim lẻ', 'trash-movies'),
      ]),
    getItem('Đăng xuất', 'logout', <LogoutOutlined />),
  ];

  const navigate = useNavigate();

  const [listChat, setListChat] = useState([]);
  const [chooseChat, setChooseChat] = useState();
  const [message, setMessage] = useState({});
  const [socket, setSocket] = useState();
  const [socketUser, setSocketUser] = useState();
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    setSocket(newSocket);
    setSocketUser(newSocketUser);
    newSocket.on('test', (newMessage) => {});
    //  nhận tin nhắn từ khách hàng
    newSocket.on('receiveChatCustomer', (newMessage) => {
      setMessage((prev) => ({
        ...prev,
        [newMessage.roomId]: [
          ...(prev[newMessage.roomId] || []),
          newMessage.data,
        ],
      }));
    });

    //  xóa các phòng k phải do user này đảm nhận
    newSocket.on('delete-room', (data) => {
      if (userInfo.userId !== data.userId) {
        setListChat((prev) =>
          prev.filter((item) => item.roomId !== data.roomId),
        );
      }
    });

    // rời khỏi đoạn chat
    newSocket.on('forceLeave', (roomId) => {
      setVisible((prev) => ({ ...prev, [roomId]: true }));
      newSocket.emit('leaveRoom', roomId);
    });

    //  nhận phòng chat mới
    newSocket.on('room', (data) => {
      setListChat((prev) => [...prev, data]);

      if (listChat.length > 0) {
        setChooseChat(listChat[0].roomId);
      } else {
        setChooseChat(data.roomId);
      }
    });

    return () => {
      newSocket.off('receiveChatCustomer');
      newSocket.off('room');
    };
  }, [message, listChat, userInfo]);

  useEffect(() => {
    setSelect(
      window.location.pathname === '/' ||
        window.location.pathname.slice(1) === 'login' ||
        window.location.pathname.slice(1) === ''
        ? 'statistics'
        : window.location.pathname.slice(1),
    );
  }, [window.location.pathname]);

  //  lấy các đoạn chat đang còn chat(chưa out phòng)
  useEffect(() => {
    const fetchListChat = async () => {
      const response = await fetch(API_GET_ON_MESSAGE, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      let list = [],
        mess = [];
      if (json.data.length > 0) {
        for (let i = 0; i < json.data.length; i++) {
          list.push({
            roomId: json.data[i].roomId,
            userId: json.data[i].participants.userId._id,
            adminId: json.data[i].participants?.adminId?._id
              ? json.data[i].participants.adminId._id
              : '',
            firstName: json.data[i].participants.userId.firstName,
            lastName: json.data[i].participants.userId.lastName,
            userInfo: json.data[i].participants.userId,
          });
          mess = {
            ...mess,
            [json.data[i].roomId]: json.data[i].messages,
          };
        }
        if (list.length > 0) {
          setChooseChat(list[0].roomId);
        }
        setListChat(list);
        setMessage(mess);
      }
    };
    fetchListChat();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (select) => {
    navigate(`/${select}`);
  };

  //  out chat
  const handleOutRoom = (roomId) => {
    setVisible((prev) => ({ ...prev, [roomId]: false }));
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
  };

  if (!items) {
    return (
      <div className="loading-component">
        <div>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      </div>
    );
  }

  return (
    <DivContainerWeb>
      <DivSider>
        <div>
          <SiderAdmin
            items={items}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            select={select}
            setSelect={setSelect}
            handleSelect={handleSelect}
          />
        </div>
      </DivSider>
      <Layout className="layout-content-web">
        <HeaderAdmin
          bgColor={colorBgContainer}
          title={`${select}`.toUpperCase()}
        />
        <ChildrenContext.Provider
          value={{
            select: select,
            socket,
            socketUser,
            message,
            setMessage,
            listChat,
            setListChat,
            input,
            setInput,
            chooseChat,
            setChooseChat,
            isLoading,
            visible,
            handleOutRoom,
            setImagePreview,
            imagePreview,
            setFile,
            file,
          }}>
          {children}
        </ChildrenContext.Provider>

        <FooterAdmin />
      </Layout>
    </DivContainerWeb>
  );
}
export default LayoutAdmin;
