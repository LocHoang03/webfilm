import { Fragment, useEffect, useRef, useState } from 'react';
import {
  DivBanner,
  ButtonSlick,
  DivInfo,
  Title,
  Category,
  DivAction,
  ButtonWatch,
  ButtonDetail,
  Description,
  LeftInfo,
  RightInfo,
} from './styles';
import {
  CaretRightOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Carousel, Modal, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

function Banner({ dataVideo, isLoading, data, type, order }) {
  const carouselRef = useRef(null);
  const videoRef = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(Array(dataVideo.length).fill(true));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && dataVideo && videoRef.current[currentSlide]) {
      videoRef.current[currentSlide].play().catch((error) => {});
    }
  }, [isLoading, currentSlide, dataVideo]);
  const handleAfterChange = (current) => {
    setCurrentId(current);
    setCurrentSlide(current);
  };
  //  xử lý khi người dung muốn xem luôn nếu đủ quyền cho xem ngược lại báo lỗi
  const handleWatchNow = (filmId) => {
    if (dataVideo && order?.data[0]?.packageId) {
      for (let i = 0; i < dataVideo.length; i++) {
        if (dataVideo[i]._id === filmId) {
          const packageId = order.data[0].packageId._id;
          const listPackageIds = dataVideo[i].listPackageIdBand;
          if (listPackageIds.includes(packageId)) {
            confirm({
              title: 'Hoạt động không thành công!!',
              content: `Gói dịch vụ của bạn không xem được phim này, vui lòng nâng cấp lên dịch vụ cao hơn 
          gói để có thể xem phim này. Gần đây bạn có nâng cấp gói hiện tại của mình không?`,
              okText: 'Đồng ý',
              cancelText: 'Đóng',
              onOk() {
                navigate('/package-upgrade');
              },
              onCancel() {},
            });
          } else {
            if (type !== 'series') {
              navigate('/film/watching-movies/' + filmId);
            } else {
              navigate('/watching-series/' + filmId + '/' + 1);
            }
          }
        }
      }
    }
  };
  //xem chi tiết phim
  const handleDetail = (filmId) => {
    if (type !== 'series') {
      navigate('/film/' + filmId);
    } else {
      navigate('/series/' + filmId);
    }
  };

  //  xử lý load video
  const handleVideoLoad = (index) => {
    const newLoading = [...loading];
    newLoading[index] = false;
    setLoading(newLoading);
  };

  return (
    <DivBanner className="container-data-slider">
      <Carousel
        dots={true}
        dotPosition="bottom"
        fade={true}
        ref={carouselRef}
        slidesToShow={1}
        afterChange={handleAfterChange}
        style={{ width: '100%' }}>
        {dataVideo &&
          dataVideo.map((item, id) => (
            <Fragment key={id}>
              <div className="video-container">
                {loading[id] && (
                  <div className="loading-container">
                    <div className="loading-wave"></div>
                  </div>
                )}
                <video
                  ref={(el) => (videoRef.current[id] = el)}
                  muted
                  loop
                  autoPlay
                  className="video-player"
                  preload="auto"
                  key={id}
                  onLoadedData={() => handleVideoLoad(id)}>
                  <source src={item.videoUrl.url} type="video/mp4" />
                </video>
              </div>
            </Fragment>
          ))}
      </Carousel>
      <DivInfo>
        <LeftInfo>
          <Title>
            Tên phim: "{data && data.length && data[currentId].name}"
          </Title>
          <Category>
            Thể loại:{' '}
            {data &&
              data.length &&
              data[currentId].category.map((item, id) => {
                return (
                  <Tag color="processing" key={id}>
                    {item}{' '}
                  </Tag>
                );
              })}
          </Category>
          <Description>
            Mô tả: {data && data.length && data[currentId].description}
          </Description>
          <DivAction>
            <ButtonWatch onClick={() => handleWatchNow(data[currentId].filmId)}>
              <CaretRightOutlined /> Xem ngay
            </ButtonWatch>
            <ButtonDetail onClick={() => handleDetail(data[currentId].filmId)}>
              <InfoCircleOutlined /> Chi tiết
            </ButtonDetail>
          </DivAction>
        </LeftInfo>
        <RightInfo>
          <ButtonSlick
            onClick={() => {
              if (currentId > 0) {
                setCurrentId((prev) => prev - 1);
              } else {
                setCurrentId(4);
              }
              carouselRef.current.prev();
            }}
            className="btn-slider-left-banner">
            <LeftOutlined />
          </ButtonSlick>
          <ButtonSlick
            next="next"
            onClick={() => {
              if (currentId < 4) {
                setCurrentId((prev) => prev + 1);
              } else {
                setCurrentId(0);
              }
              carouselRef.current.next();
            }}
            className="btn-slider-right-banner">
            <RightOutlined />
          </ButtonSlick>
        </RightInfo>
      </DivInfo>
    </DivBanner>
  );
}

export default Banner;
