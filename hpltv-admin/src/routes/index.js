import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import ChildrenContext from '../contexts/ChildrenContext';
import HomePage from '../page/HomePage';
import AssetsPage from '../page/AssetsPage';
import ManageUserPage from '../page/ManageUserPage';
import PaymentAndPackagePage from '../page/PaymentAndPackagePage';
import ProfilePage from '../page/ProfilePage';
import SettingPage from '../page/SettingPage';
import ChatPage from '../page/ChatPage';
import { RoleContext } from '../contexts/UserContext';

function Router() {
  const { select } = React.useContext(ChildrenContext);
  const { userInfo } = useContext(RoleContext);

  return (
    // trang thống kê
    <Routes>
      {select === 'statistics' && userInfo?.role === 'superAdmin' && (
        <Route path="/" element={<HomePage type={select} />} />
      )}

      {/* các trang đường dẫn vè quản lý phim  */}
      {(userInfo?.role === 'superAdmin' || userInfo?.role === 'adminFilm') &&
        (select === 'series' ||
          select === 'movies' ||
          select === 'category' ||
          select === 'trash-series' ||
          select === 'trash-movies' ||
          select === 'film-for-series' ||
          select === 'trash-film-for-series') && (
          <>
            <Route
              path={'/' + select}
              element={
                <AssetsPage
                  title={
                    select === 'category'
                      ? 'Tên thể loại'
                      : select === 'film-for-series' ||
                        select === 'trash-film-for-series'
                      ? 'Tập phim'
                      : 'Tên phim'
                  }
                  key={
                    select === 'category'
                      ? 'name'
                      : select === 'film-for-series' ||
                        select === 'trash-film-for-series'
                      ? 'filmSerialNumber'
                      : 'title'
                  }
                  dataIndex={
                    select === 'category'
                      ? 'name'
                      : select === 'film-for-series' ||
                        select === 'trash-film-for-series'
                      ? 'filmSerialNumber'
                      : 'title'
                  }
                  type={select}
                />
              }
            />
            {/* phân trang */}
            <Route
              path={'/' + select + '?page=:pageNum'}
              element={
                <AssetsPage
                  title={select === 'category' ? 'Name category' : 'Name film'}
                  key={select === 'category' ? 'name' : 'title'}
                  dataIndex={select === 'category' ? 'name' : 'title'}
                  type={select}
                />
              }
            />
          </>
        )}

      {/*  trang quản lý gói phim và gói mua phim */}
      {(userInfo?.role === 'superAdmin' || userInfo?.role === 'adminFilm') &&
        (select === 'payment' || select === 'subscription-price') && (
          <>
            <Route
              path={'/' + select}
              element={<PaymentAndPackagePage type={select} />}
            />
            <Route
              path={'/' + select + '?page=:pageNum'}
              element={<PaymentAndPackagePage type={select} />}
            />
          </>
        )}

      {/* trang quản lý các vấn đề vè khách hàng */}
      {(userInfo?.role === 'superAdmin' || userInfo?.role === 'adminCustom') &&
        (select === 'common-questions' || select === 'customer-questions') && (
          <>
            <Route
              path={'/' + select}
              element={<SettingPage type={select} />}
            />
          </>
        )}

      {((select === 'user' && userInfo?.role === 'superAdmin') ||
        ((userInfo?.role === 'superAdmin' ||
          userInfo?.role === 'adminCustom') &&
          (select === 'subscriber' || select === 'banned-subscriber'))) && (
        <Route
          path={'/' + select}
          element={
            <ManageUserPage
              title={
                select === 'user'
                  ? 'Tên nhân viên'
                  : 'subscriber'
                  ? 'Tên khách hàng'
                  : 'Khách hàng bị cấm'
              }
              type={select}
            />
          }
        />
      )}
      {(userInfo?.role === 'superAdmin' ||
        userInfo?.role === 'adminCustom') && (
        <Route path="/support-customer" element={<ChatPage />} />
      )}

      {/*  tất cả các quyền vô dc */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* trang sẽ đi vô nếu vô ng dùng vô trang ko tồn tại */}
      {userInfo?.role === 'superAdmin' ? (
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      ) : userInfo?.role === 'adminCustom' ? (
        <Route
          path="*"
          element={<Navigate to="/subscriber" replace={true} />}
        />
      ) : (
        <Route path="*" element={<Navigate to="/series" replace={true} />} />
      )}
    </Routes>
  );
}

export default Router;
