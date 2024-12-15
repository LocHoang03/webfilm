import { ModalDetail, Title, Description, TitleUser, InfoUser } from './styles';

import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailQuestions({
  setIsModalDetail,
  isModalDetail,
  asset,
  type,
}) {
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
        title={
          type === 'common-questions'
            ? 'Chi tiết câu hỏi thường gặp'
            : 'Chi tiết phản ánh/góp ý từ khách hàng'
        }
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      title={
        type === 'common-questions'
          ? 'Chi tiết câu hỏi thường gặp'
          : 'Chi tiết phản ánh/góp ý từ khách hàng'
      }
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Title>
        {type === 'customer-questions' ? 'Tiêu đề' : 'Tiêu đề câu hỏi'}:{' '}
        {data.title}
      </Title>
      <Description>
        {type === 'customer-questions'
          ? 'Nội dung chi tiết'
          : 'Nội dung chi tiết'}
        : {data.description}
      </Description>
      {type === 'customer-questions' && (
        <>
          <TitleUser>Thông tin người phản ánh/góp ý:</TitleUser>
          <InfoUser>
            Họ và tên: {data.firstName} {data.lastName}
          </InfoUser>
          <InfoUser>Email: {data.email}</InfoUser>
          <InfoUser>Số điện thoại: {data.phoneNumber}</InfoUser>
          <InfoUser>Giới tính: {data.userId.sex}</InfoUser>
        </>
      )}
    </ModalDetail>
  );
}

export default memo(ModalDetailQuestions);
