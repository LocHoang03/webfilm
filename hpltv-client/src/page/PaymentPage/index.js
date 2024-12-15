import { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import {
  PaymentContainer,
  PaymentHeader,
  ServicePack,
  TitleService,
  DivPackage,
  RowPack,
  ColPack,
  DivFooter,
  DivNotification,
  DivActionContinue,
  ButtonContinue,
} from './styles';
import HeaderPaymentComponent from '../../components/HeaderPaymentComponent';
import PackageComponent from '../../components/PackageComponent';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../contexts/LoginContext';
import LoadingPage from '../LoadingPage';
import {
  API_GET_ALL_PAYMENT_DATA,
  API_GET_ALL_ORDER,
} from '../../configs/apis';
import { Helmet } from 'react-helmet-async';

// lựa chọn gói phim
function PaymentPage(props) {
  const [dataChoosePayment, setDataChoosePayment] = useState();
  const [data, setData] = useState();
  const [dataDisabled, setDataDisabled] = useState();
  const [isBlock, setIsBlock] = useState(false);
  const { userInfo } = useContext(CheckLoginContext);

  const navigate = useNavigate();
  // lấy all gói phim
  useEffect(() => {
    const fetchAllPayment = async () => {
      const response = await fetch(API_GET_ALL_PAYMENT_DATA);
      const dataJson = await response.json();
      setDataChoosePayment(dataJson.data[0]);
      setData(dataJson.data);
    };
    fetchAllPayment();
  }, []);

  // các gói phim thấp hơn gói phim đang mua hiện tại (trường hợp đăng nhập rồi)
  useEffect(() => {
    setIsBlock(false);
    const fetchPaymentDisabled = async () => {
      const response = await fetch(API_GET_ALL_PAYMENT_DATA);
      const dataJson = await response.json();

      const responsePackageMax = await fetch(
        API_GET_ALL_PAYMENT_DATA + '/package-max',
      );
      const dataJsonPackageMax = await responsePackageMax.json();

      const responseOrder = await fetch(
        API_GET_ALL_ORDER + '/' + userInfo.userId,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
          },
        },
      );
      const dataJsonOrder = await responseOrder.json();

      let dataDisabledObj = [];

      dataJson.data.map((item, id) => {
        if (
          item._id.toString() >= dataJsonOrder.data.packageId._id.toString()
        ) {
          dataDisabledObj.push(item._id);
        }
        if (
          dataJsonPackageMax.packageId.toString() ===
          dataJsonOrder.data.packageId._id.toString()
        ) {
          setIsBlock(true);
        }
      });
      setDataDisabled(dataDisabledObj);
    };
    if (props.login) {
      fetchPaymentDisabled();
    }
  }, [props.login, userInfo]);

  // bấm tiếp tục
  const handleCLickContinue = async () => {
    await localStorage.setItem(
      'dataPayment',
      JSON.stringify(dataChoosePayment),
    );
    navigate('/option-checkout');
  };

  if (!dataChoosePayment || isBlock === undefined) {
    return <LoadingPage />;
  }
  return (
    <PaymentContainer>
      <Helmet>
        <title>Payment</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {!props.login && (
        <PaymentHeader>
          <HeaderPaymentComponent />
        </PaymentHeader>
      )}
      <ServicePack>
        <TitleService>Chọn gói dịch vụ phù hợp với bạn</TitleService>
        <DivPackage>
          <RowPack>
            {data &&
              data.map((item, id) => {
                return (
                  <ColPack span={6} lg={6} md={8} sm={12} xs={24} key={id}>
                    <PackageComponent
                      item={item}
                      dataChoosePayment={dataChoosePayment}
                      setDataChoosePayment={setDataChoosePayment}
                      dataDisabled={dataDisabled}
                      login={props.login}
                    />
                  </ColPack>
                );
              })}
          </RowPack>
        </DivPackage>
        <DivNotification>
          <p>
            Cho dù bạn có thể xem ở chế độ HD (720p), Full HD (1080p), Ultra HD
            (4K) và HDR tùy thuộc vào dịch vụ Internet và khả năng của thiết bị.
            Không phải tất cả nội dung đều có sẵn ở mọi độ phân giải. Xem Điều
            khoản của chúng tôi Sử dụng để biết thêm chi tiết.
          </p>
          <p>
            Chỉ những người sống cùng bạn mới có thể sử dụng tài khoản của bạn.
            Xem vào ngày 4 nhiều thiết bị khác nhau cùng lúc với gói Premium, 2
            với gói Standard gói và 1 với gói Cơ bản và Di động.
          </p>
        </DivNotification>
        <DivActionContinue>
          <ButtonContinue
            onClick={handleCLickContinue}
            disabled={isBlock ? true : false}
            block={isBlock}>
            Tiếp tục
          </ButtonContinue>
        </DivActionContinue>
      </ServicePack>
      {!props.login && (
        <DivFooter>
          <Footer />
        </DivFooter>
      )}
    </PaymentContainer>
  );
}

export default PaymentPage;
