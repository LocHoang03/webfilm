import {
  ModalDetail,
  DivTitle,
  TitleDetail,
  VideoDetail,
  DivVideo,
  DivInfoDetail,
  InfoDetail,
  DivImage,
  InfoItem,
  DivVideoFilm,
  DivInfo,
  ListInfo,
  ItemInfo,
} from './styles';

import dayjs from 'dayjs';
import { Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailAssets({ setIsModalDetail, isModalDetail, asset, type }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (asset) {
      setData(asset);
    }
  }, [asset]);

  useEffect(() => {
    return () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.src = '';
      }
    };
  }, []);

  const handleOk = () => {
    setIsModalDetail(false);
  };
  const handleCancel = () => {
    setIsModalDetail(false);
  };

  if (!asset || !data) {
    return (
      <ModalDetail
        title={'Chi tiết'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  if (type === 'movies' && !data && !data.videoUrl && !data.videoUrl.url) {
    return (
      <ModalDetail
        title={'Chi tiết'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      className="detail-assets"
      title={
        type === 'category'
          ? 'Chi tiết thể loại'
          : type !== 'film-for-series' &&
            type !== 'trash-film-for-series' &&
            type !== 'payment' &&
            type !== 'subscription-price'
          ? 'Chi tiết phim'
          : type !== 'payment' && type !== 'subscription-price'
          ? 'Chi tiết tập phim ' + data.seriesId.title
          : type !== 'payment'
          ? 'Chi tiết gói'
          : 'Chi tiết gói mua hàng'
      }
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <DivTitle>
        {type === 'category' ? (
          <TitleDetail>Tên thể loại : {data.name}</TitleDetail>
        ) : type !== 'film-for-series' &&
          type !== 'trash-film-for-series' &&
          type !== 'payment' &&
          type !== 'subscription-price' ? (
          <TitleDetail>Tên phim : {data.title}</TitleDetail>
        ) : type !== 'payment' && type !== 'subscription-price' ? (
          <TitleDetail>Tập {data.filmSerialNumber}</TitleDetail>
        ) : type === 'payment' ? (
          <TitleDetail>Thông tin khách hàng mua gói</TitleDetail>
        ) : (
          <TitleDetail>Thông tin gói</TitleDetail>
        )}
      </DivTitle>

      {type !== 'category' &&
        type !== 'film-for-series' &&
        type !== 'trash-film-for-series' && (
          <>
            {(type === 'movies' || type === 'series') && (
              <DivVideo>
                <h2>Đoạn giới thiệu </h2>
                <VideoDetail>
                  <iframe
                    width="100%"
                    height="400"
                    title={data.title}
                    src={data?.videoTrailerUrl?.url || data?.videoUrl?.url}
                    frameBorder="0"
                    style={{ borderRadius: '20px' }}
                    allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </VideoDetail>
              </DivVideo>
            )}
            {type === 'movies' && (
              <DivVideo>
                <h2>Video</h2>
                <VideoDetail>
                  <iframe
                    width="100%"
                    height="400"
                    title={data.title}
                    src={data.videoUrl.url}
                    frameBorder="0"
                    style={{ borderRadius: '20px' }}
                    allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </VideoDetail>
              </DivVideo>
            )}
            {type !== 'subscription-price' && (
              <DivInfoDetail>
                <InfoDetail>
                  <h2>Thông tin chi tiết </h2>
                  {type !== 'payment' && type !== 'subscription-price' && (
                    <InfoItem>Mô tả: {data.description}</InfoItem>
                  )}
                  {(type === 'movies' || type === 'series') && (
                    <InfoItem>Đạo diễn: {data.director}</InfoItem>
                  )}
                  {(type === 'movies' || type === 'series') && (
                    <InfoItem>Dàn diễn viên: {data.cast}</InfoItem>
                  )}
                  {(type === 'movies' || type === 'series') && (
                    <InfoItem>Thời lượng: {data.duration} minute</InfoItem>
                  )}
                  {(type === 'movies' || type === 'series') && (
                    <InfoItem>Quốc gia: {data.country.join(', ')}</InfoItem>
                  )}

                  {type !== 'payment' && type !== 'subscription-price' && (
                    <InfoItem>Đánh giá: {data.rating}/5</InfoItem>
                  )}
                  {(type === 'movies' || type === 'series') && (
                    <InfoItem>Năm sản xuất: {data.releaseDate}</InfoItem>
                  )}

                  {type === 'payment' && (
                    <>
                      <InfoItem>
                        Họ và tên: {data.userId.firstName}{' '}
                        {data.userId.lastName}
                      </InfoItem>
                      <InfoItem>Email: {data.userId.email}</InfoItem>
                      <InfoItem>
                        Số điện thoại: {data.userId.phoneNumber}
                      </InfoItem>
                      <InfoItem>
                        Loại gói đăng ký đang dùng: {data.typePack}
                      </InfoItem>
                      <InfoItem>
                        Giá hàng tháng:{' '}
                        {data.monthlyPrice.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{' '}
                        VND
                      </InfoItem>
                    </>
                  )}

                  {type !== 'subscription-price' && (
                    <InfoItem>
                      Ngày tạo: {dayjs(data.createAt).format('DD-MM-YYYY')}
                    </InfoItem>
                  )}
                  {type === 'payment' && (
                    <InfoItem>
                      Ngày hết hạn:{' '}
                      {dayjs(data.expirationDate).format('DD-MM-YYYY')}
                    </InfoItem>
                  )}
                </InfoDetail>
                {type !== 'subscription-price' && (
                  <DivImage>
                    <h2>
                      {type !== 'payment'
                        ? 'Hình ảnh phim'
                        : 'Hình ảnh người dùng'}
                    </h2>
                    <Image
                      width={type !== 'payment' ? 250 : 300}
                      height={350}
                      src={
                        data && data.userId && data.userId.avatarUser.url
                          ? data.userId.avatarUser.url
                          : data.imageUrl.url
                      }
                      alt={data.title || 'image user'}
                    />
                  </DivImage>
                )}
              </DivInfoDetail>
            )}
            {type === 'subscription-price' && (
              <DivInfo>
                <ListInfo>
                  <ItemInfo>Loại gói: {data.typePack}</ItemInfo>
                  <ItemInfo>
                    Giá hàng tháng:{' '}
                    {data.monthlyPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{' '}
                    VND
                  </ItemInfo>
                  <ItemInfo>
                    Chất lượng hình ảnh: {data.qualityPicture}
                  </ItemInfo>
                  <ItemInfo>Độ phân giải: {data.resolution}</ItemInfo>
                  <ItemInfo>Thiết bị hỗ trợ: {data.deviceSupport}</ItemInfo>
                  <ItemInfo>
                    Số lượng thiết bị được xem: {data.quantityWatch}
                  </ItemInfo>
                  <ItemInfo>
                    Số lượng thiết bị được tải về: {data.quantityDownload}
                  </ItemInfo>
                  <ItemInfo>
                    Ngày tạo gói: {dayjs(data.createAt).format('DD-MM-YYYY')}
                  </ItemInfo>
                </ListInfo>
              </DivInfo>
            )}
          </>
        )}
      {type === 'trash-film-for-series' ||
        (type === 'film-for-series' && (
          <DivVideoFilm>
            <VideoDetail>
              <iframe
                width="100%"
                height="400"
                title={data.filmSerialNumber}
                src={data.videoUrl.url}
                frameBorder="0"
                style={{ borderRadius: '20px' }}
                allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </VideoDetail>
          </DivVideoFilm>
        ))}
    </ModalDetail>
  );
}

export default memo(ModalDetailAssets);
