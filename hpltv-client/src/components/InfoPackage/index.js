import { Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { API_GET_ORDER_FROM_USER_ID } from '../../configs/apis';
import { DivContainer, DivInfo, ListInfo, ItemInfo, DivAction } from './styles';
import { CheckLoginContext } from '../../contexts/LoginContext';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function InfoPackage() {
  const [data, setData] = useState();

  const navigate = useNavigate();

  const { userInfo } = useContext(CheckLoginContext);

  useEffect(() => {
    const fetchOrderPackage = async () => {
      const response = await fetch(
        API_GET_ORDER_FROM_USER_ID + '/' + userInfo.userId,
      );
      const data = await response.json();
      setData(data.data[0]);
    };
    fetchOrderPackage();
  }, [userInfo]);

  const handleUpgradePackage = () => {
    navigate('/package-upgrade');
  };

  return (
    <DivContainer>
      <DivInfo>
        <ListInfo>
          <ItemInfo>Loại gói: {data && data.packageId.typePack}</ItemInfo>
          <ItemInfo>Độ phân giải: {data && data.packageId.resolution}</ItemInfo>
          <ItemInfo>
            Chất lượng hình ảnh: {data && data.packageId.qualityPicture}
          </ItemInfo>
          <ItemInfo>
            Giá hàng tháng:{' '}
            {data &&
              data.packageId.monthlyPrice.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{' '}
            VND
          </ItemInfo>
          <ItemInfo>
            Hỗ trợ thiết bị: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Số lượng tải xuống: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Số lượng thiết bị xem: {data && data.packageId.deviceSupport}
          </ItemInfo>
          <ItemInfo>
            Thời gian thanh toán:{' '}
            {dayjs(data && data.createAt).format('DD-MM-YYYY')}
          </ItemInfo>
          <ItemInfo>
            Thời hạn gói:{' '}
            {dayjs(data && data.expirationDate).format('DD-MM-YYYY')}
          </ItemInfo>
        </ListInfo>
      </DivInfo>
      <DivAction>
        <Button type="primary" onClick={handleUpgradePackage}>
          Nâng cấp gói
        </Button>
      </DivAction>
    </DivContainer>
  );
}

export default InfoPackage;
