import {
  ModalDetail,
  DivInfoDetail,
  InfoDetail,
  DivImage,
  InfoItem,
} from './styles';

import { Button, Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailUser({ setIsModalDetail, isModalDetail, asset, type }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (asset) {
      setData(asset);
    }
  }, [asset]);

  const handleOk = () => {
    setIsModalDetail(false);
  };
  const handleCancel = () => {
    setIsModalDetail(false);
  };

  if (!asset || !data) {
    return (
      <ModalDetail
        title={type === 'user' ? 'Chi tiết nhân viên' : 'Chi tiết khách hàng'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Đồng ý
          </Button>,
        ]}
        className="modal-detail-user">
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      title={type === 'user' ? 'Chi tiết nhân viên' : 'Chi tiết khách hàng'}
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Đồng ý
        </Button>,
      ]}
      className="modal-detail-user">
      <DivInfoDetail>
        <InfoDetail>
          <InfoItem>
            Họ và tên: {data.lastName} {data.firstName}
          </InfoItem>
          <InfoItem>
            Email: {data.email ? data.email : 'Chưa cập nhật'}
          </InfoItem>
          <InfoItem>
            Số điện thoại:{' '}
            {data.phoneNumber ? data.phoneNumber : 'Chưa cập nhật'}
          </InfoItem>
          <InfoItem>
            Giới tính: {data.sex ? data.sex : 'Chưa cập nhật'}
          </InfoItem>
          {type === 'user' && (
            <InfoItem>
              Loại tài khoản:{' '}
              {data.role === 'adminFilm'
                ? 'Nhân viên quản lý phim'
                : 'Nhân viên chăm sóc khách hàng'}
            </InfoItem>
          )}
        </InfoDetail>
        <DivImage>
          <h2>
            {type === 'user' ? 'Hình ảnh nhân viên' : 'Hình ảnh khách hàng'}
          </h2>
          <Image
            width={260}
            height={260}
            src={data.avatarUser.url}
            alt={data.avatarUser.imageId}
          />
        </DivImage>
      </DivInfoDetail>
    </ModalDetail>
  );
}

export default memo(ModalDetailUser);
