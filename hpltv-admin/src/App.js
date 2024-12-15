import './App.css';
import LayoutAdmin from './layout';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './page/LoginPage';
import Router from './routes/index';
import { useContext, useEffect } from 'react';
import LoadingPage from './page/LoadingPage';
import { RoleContext } from './contexts/UserContext';
import { jwtDecode } from 'jwt-decode';

function App() {
  const { userInfo, isLogin } = useContext(RoleContext);
  const location = useLocation();
  const navigate = useNavigate();
  // kiểm tra token đăng nhập nếu hết hạn thì bị đảy ra trang đăng nhập
  useEffect(() => {
    if (localStorage.getItem('tokenManager')) {
      const tokenDecoded = jwtDecode(localStorage.getItem('tokenManager'));
      const dateExpiresIn = new Date(tokenDecoded.exp);
      const currentDate = new Date();

      if (currentDate > dateExpiresIn) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }, [location, navigate]);

  if (isLogin === undefined || userInfo === undefined) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      {isLogin ? (
        <LayoutAdmin>
          <Router />
        </LayoutAdmin>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
