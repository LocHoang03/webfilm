import { Fragment, useEffect, useRef, useState } from 'react';
import {
  DivBanner,
  ButtonSlick,
  DivInfo,
  Title,
  Category,
  Description,
  LeftInfo,
  RightInfo,
} from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Tag } from 'antd';

function BannerLandingPage({ dataVideo, isLoading, data }) {
  console.log(dataVideo);
  const carouselRef = useRef(null);
  const videoRef = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(Array(dataVideo.length).fill(true));

  useEffect(() => {
    if (!isLoading && dataVideo && videoRef.current[currentSlide]) {
      videoRef.current[currentSlide].play().catch((error) => {});
    }
  }, [isLoading, currentSlide, dataVideo]);
  const handleAfterChange = (current) => {
    setCurrentId(current);
    setCurrentSlide(current);
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

export default BannerLandingPage;
