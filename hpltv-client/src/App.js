import Router from './routes';
import './App.css';
import Layout from './layout/index';
import { React, useContext, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LandingPage from './page/LandingPage';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import { jwtDecode } from 'jwt-decode';
import PaymentPage from './page/PaymentPage';
import OptionCheckoutPage from './page/OptionCheckoutPage';
import PaySuccessPage from './page/PaySuccessPage';
import CheckoutFormPage from './page/CheckoutFormPage';
import { CheckLoginContext } from './contexts/LoginContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from './redux/action/home/movies';
import { fetchAllSeries } from './redux/action/home/series';
import LoadingPage from './page/LoadingPage';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { ButtonCustomerSupport } from './styles';
import ModalCustomerSupport from './components/ModalCustomerSupport';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import ForgotPasswordPage from './page/ForgotPasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';
import AuthPage from './page/AuthPage';
import { API_CREATE_MESSAGE } from './configs/apis';
import FooterMobile from './components/FooterMobile';
import LoginSuccessPage from './page/LoginSuccessPage';

const newSocket = io(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/user`);
const newSocketAdmin = io(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/admin`);

function App() {
  const [isModal, setIsModal] = useState(false);
  const [socket, setSocket] = useState();
  const [socketAdmin, setSocketAdmin] = useState();
  const [isState, setIsState] = useState(0);
  const [message, setMessage] = useState([]);
  const [roomId, setRoomId] = useState();
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLogin } = useContext(CheckLoginContext);
  const movies = useSelector((state) => state.moviesSlice); // đầu tiên là 0 dữ liệu
  const series = useSelector((state) => state.seriesSlice);

  // gọi danh sách phim và series
  useEffect(() => {
    Promise.all([dispatch(fetchAllMovies()), dispatch(fetchAllSeries())]);
  }, [dispatch]);

  // kiểm tra phim or series có tồn tại ko nếu k đẩy về trang chủ
  useEffect(() => {
    let check = false;
    const arr = window.location.pathname.split('/');
    const idFilm = arr[arr.length - 1];
    if (window.location.pathname.startsWith('/film/')) {
      if (movies.data.length > 0) {
        for (let item of movies.data) {
          if (item._id === idFilm) {
            check = true;
            break;
          }
        }
        if (!check) {
          navigate('/');
        }
      }
    } else if (window.location.pathname.startsWith('/series/')) {
      const idFilm = arr[arr.length - 1];
      if (series.data.length > 0) {
        for (let item of series.data) {
          if (item._id === idFilm) {
            check = true;
            break;
          }
        }
        if (!check) {
          navigate('/');
        }
      }
    }
  }, [pathname, series, movies, navigate]);

  // useEffect(() => {
  //   setIsSuccess(false);

  //   if (isLogin !== undefined) {
  //     const currentPath = location.pathname;

  //     if (isLogin === -1) {
  //       const allowedPaths = [
  //         '/auth/signup',
  //         '/login-success',
  //         '/auth/login',
  //         '/auth/reset-password',
  //         '/auth/forgot-password',
  //         '/landing-page',
  //       ];

  //       const isAllowedPath = allowedPaths.some((path) => currentPath === path);

  //       if (!isAllowedPath) {
  //         navigate('/landing-page');
  //       }
  //     } else if (isLogin === 0) {
  //       const path = '/two-factor-authentication';
  //       if (currentPath !== path) {
  //         navigate(path);
  //       }
  //     } else if (isLogin === 1) {
  //       const allowedPaths = [
  //         '/choose-payment',
  //         '/payment-success',
  //         '/option-checkout',
  //         '/checkout',
  //       ];
  //       const isAllowedPath = allowedPaths.some((path) => currentPath === path);

  //       if (!isAllowedPath) {
  //         navigate('/choose-payment');
  //       }
  //     }
  //     setIsSuccess(true);
  //   }
  // }, [isLogin, pathname]);

  // cuộn lên đầu trang khi chuyển qua url mới
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // kiểm tra token đăng nhập -> hết hạn out đăng nhập
  useEffect(() => {
    if (localStorage.getItem('tokenUser')) {
      const tokenDecoded = jwtDecode(localStorage.getItem('tokenUser'));
      const dateExpiresIn = new Date(tokenDecoded.exp * 1000);
      const currentDate = new Date();

      if (currentDate > dateExpiresIn) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }, [location, navigate]);

  // cuộn xuống cuối đoạn chat
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector('.chat-content-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };
  // socket chat - mở đóng giao diện chat
  const handleOpenCustomerSupport = () => {
    setIsModal((prev) => !prev);
  };

  const handleOk = () => {
    setIsModal(false);
  };
  const handleCancel = () => {
    setIsModal(false);
  };

  // rời phòng chát
  const handleOutRoom = () => {
    setVisible(false);
    setIsState(0);
  };

  // thực hiện tạo phòng chat và gửi thông tin phòng chát tới admin CSKH
  const handleChatCustomer = async () => {
    setIsState(2);
    setTimeout(() => {
      const id = uuidv4();
      setRoomId(id);
      const data = {
        roomId: id,
        userId: userInfo.userId,
        adminId: '',
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userInfo: userInfo,
      };
      const dataPost = {
        roomId: id,
        participants: {
          userId: userInfo.userId,
        },
      };

      const addMessage = async () => {
        const response = await fetch(API_CREATE_MESSAGE, {
          method: 'POST',
          body: JSON.stringify(dataPost),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (json.success) {
          newSocket.emit('joinRoom', data);
          newSocket.emit('receiveRoom', data);
        }
      };
      addMessage();
    }, 300);
  };

  useEffect(() => {
    if (isState === 2) {
      setSocket(newSocket);
      setSocketAdmin(newSocketAdmin);

      // nhận tin từ admin gửi tới
      newSocket.on('receiveChatCustomer', (data) => {
        console.log('data chat', data);
        setMessage((prev) => [...prev, data]);
        scrollToBottom();
      });

      newSocket.on('forceLeave', (roomId) => {
        newSocket.emit('leaveRoom', roomId);
        setVisible(true);
        setMessage([]);
        setRoomId();
        setFile();
        setImagePreview();
      });
      return () => {
        newSocket.off('receiveChatCustomer');
      };
    }
  }, [isState, message]);

  if (isLogin === undefined || userInfo === undefined) {
    return (
      <div className="loading-component">
        <LoadingPage />
      </div>
    );
  }
  return (
    <div className="App">
      {((isLogin !== 0 && isLogin !== -1) ||
        pathname.startsWith('/login-success/')) && (
        <>
          <ModalCustomerSupport
            isModal={isModal}
            handleCancel={handleCancel}
            handleOk={handleOk}
            isState={isState}
            setIsState={setIsState}
            socket={socket}
            socketAdmin={socketAdmin}
            socketConnect={newSocket}
            socketConnectAdmin={newSocketAdmin}
            handleChatCustomer={handleChatCustomer}
            setMessage={setMessage}
            message={message}
            roomId={roomId}
            setRoomId={setRoomId}
            visible={visible}
            handleOutRoom={handleOutRoom}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
            setFile={setFile}
            file={file}
          />
          <ButtonCustomerSupport onClick={handleOpenCustomerSupport}>
            <CustomerServiceOutlined />
          </ButtonCustomerSupport>
        </>
      )}

      {isLogin === 2 && window.innerWidth < 768 && (
        <>
          <FooterMobile />
        </>
      )}
      {isLogin === 2 ? (
        <Layout>
          <Router />
        </Layout>
      ) : isLogin === 1 ? (
        <Routes>
          <Route
            path="/choose-payment"
            element={<PaymentPage login={false} />}
          />
          <Route
            path="/payment-success"
            element={<PaySuccessPage login={false} />}
          />
          <Route
            path="/option-checkout"
            element={<OptionCheckoutPage login={false} />}
          />
          <Route
            path="/checkout"
            element={<CheckoutFormPage login={false} />}
          />

          <Route
            path="*"
            element={<Navigate to={'/choose-payment'} replace={true} />}
          />
        </Routes>
      ) : isLogin === 0 ? (
        <Routes>
          <Route path="/two-factor-authentication" element={<AuthPage />} />
          <Route
            path="*"
            element={
              <Navigate to={'/two-factor-authentication'} replace={true} />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/login-success/:userId" element={<LoginSuccessPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/auth/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route path="/landing-page" element={<LandingPage />} />
          <Route
            path="*"
            element={<Navigate to={'/landing-page'} replace={true} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
