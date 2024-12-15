import { API_LOGOUT } from '../../configs/apis';
import LogoImage from '../Common/ImageBanner';
import { ContentPaymentHeader, LogoHeader, BtnActionLogout } from './styles';

function HeaderPaymentComponent() {
  const handleLogout = async () => {
    const response = await fetch(API_LOGOUT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        'Content-type': 'application/json',
      },
    });
    const responseJson = await response.json();
    if (responseJson.success && localStorage.getItem('tokenUser')) {
      await localStorage.removeItem('tokenUser');
      const tokenUser = await localStorage.getItem('tokenUser');
      if (tokenUser === null) {
        window.location.reload();
      }
    }
  };
  return (
    <ContentPaymentHeader>
      <LogoHeader>
        <h2>
          <LogoImage height="40" width="200" />
        </h2>
      </LogoHeader>
      <BtnActionLogout onClick={handleLogout}>Đăng xuất</BtnActionLogout>
    </ContentPaymentHeader>
  );
}

export default HeaderPaymentComponent;
