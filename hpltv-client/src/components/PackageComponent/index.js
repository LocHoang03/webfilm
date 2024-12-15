import { CheckCircleFilled } from '@ant-design/icons';
import {
  ContentPack,
  TypePack,
  InfoType,
  Resolution,
  Describe,
  ListInfo,
  ItemInfo,
  DivItemInfo,
  CheckIcon,
} from './styles';

function PackageComponent({
  item,
  dataChoosePayment,
  setDataChoosePayment,
  dataDisabled,
  login,
}) {
  const handleChoosePackService = () => {
    setDataChoosePayment(item);
  };
  return (
    <ContentPack
      onClick={handleChoosePackService}
      className={
        `${
          dataChoosePayment._id === item._id
            ? 'choose-service-package-shadow '
            : ''
        }` +
        `${login ? 'disabled' : ''}` +
        `${
          dataDisabled && !dataDisabled.includes(item._id) ? 'non-disabled' : ''
        }`
      }>
      <TypePack
        className={
          dataChoosePayment._id === item._id && 'choose-service-package'
        }>
        <InfoType>{item.typePack}</InfoType>
        <Resolution>{item.resolution}</Resolution>
        {dataChoosePayment._id === item._id && (
          <CheckIcon>
            <CheckCircleFilled />
          </CheckIcon>
        )}
      </TypePack>
      <Describe>
        <ListInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Giá hàng tháng</div>
              <div>
                {item.monthlyPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{' '}
                VND
              </div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Chất lượng hình ảnh và âm thanh</div>
              <div>{item.qualityPicture}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Độ phân giải</div>
              <div>{item.resolution}</div>
            </DivItemInfo>
          </ItemInfo>
          {item.spatialSound && (
            <ItemInfo>
              <DivItemInfo>
                <div>Âm thanh không gian (âm thanh trung thực)</div>
                <div>{item.SpatialSound}</div>
              </DivItemInfo>
            </ItemInfo>
          )}
          <ItemInfo>
            <DivItemInfo>
              <div>Thiết bị được hỗ trợ</div>
              <div>{item.deviceSupport}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Các thiết bị mà gia đình bạn có thể xem cùng lúc</div>
              <div>{item.quantityWatch}</div>
            </DivItemInfo>
          </ItemInfo>
          <ItemInfo>
            <DivItemInfo>
              <div>Số thiết bị được tải xuống</div>
              <div>{item.quantityDownload}</div>
            </DivItemInfo>
          </ItemInfo>
        </ListInfo>
      </Describe>
    </ContentPack>
  );
}

export default PackageComponent;
