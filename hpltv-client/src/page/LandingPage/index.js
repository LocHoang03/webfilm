import React, { useEffect, useState } from 'react';
import {
  DivLandingPage,
  DivActionAuth,
  DivInformation,
  TextBanner,
  DivContentAuth,
  DivBanner,
  DivContent,
  TextTitle,
  TextContent,
  TextContent2,
  ButtonLogin,
  RowInformation,
  ColInformation,
  TitleInformation,
  TextInformation,
  ImageInformation,
} from './styles';
import { Link } from 'react-router-dom';
import banner1 from '../../assets/images/img-login.jpg';
import imageInfo1 from '../../assets/images/laptop-landing.jpg';
import imageInfo2 from '../../assets/images/tv-landing.jpg';
import { RightOutlined } from '@ant-design/icons';
import LogoImage from '../../components/Common/ImageBanner';
import { Helmet } from 'react-helmet-async';
import { fetchAllCategory } from '../../redux/action/category/category';
import { useDispatch, useSelector } from 'react-redux';
import { API_GET_NEW_MOVIES, API_GET_NEW_SERIES } from '../../configs/apis';
import BannerLandingPage from '../../components/BannerLandingPage';
import LoadingPage from '../LoadingPage';
import { fetchAllSeries } from '../../redux/action/home/series';

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataVideo, setDataVideo] = useState();
  const [dataVideoSeries, setDataVideoSeries] = useState();
  const [data, setData] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  const category = useSelector((state) => state.categorySlice);
  const series = useSelector((state) => state.seriesSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(API_GET_NEW_MOVIES);
      const data = await response.json();
      setDataVideo(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    const fetchSeries = async () => {
      const response = await fetch(API_GET_NEW_SERIES);
      const data = await response.json();
      setDataVideoSeries(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    Promise.all([
      dispatch(fetchAllCategory()),
      fetchMovies(),
      fetchSeries(),
      fetchAllSeries(),
    ]);
  }, [dispatch]);
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  });

  useEffect(() => {
    if (dataVideo && category) {
      let arrData = [];
      for (let item of dataVideo) {
        let arrayCategory = [];
        for (let cate of category.data) {
          if (item.listCategoryId.includes(cate._id))
            arrayCategory.push(cate.name);
        }

        arrData.push({
          name: item.title,
          category: arrayCategory,
          description: item.description,
          filmId: item._id,
        });
      }
      setData(arrData);
    }
  }, [dataVideo, category]);

  useEffect(() => {
    if (dataVideoSeries && category) {
      let arrData = [];
      for (let item of dataVideoSeries) {
        let arrayCategory = [];
        for (let cate of category.data) {
          if (item.listCategoryId.includes(cate._id)) {
            arrayCategory.push(cate.name);
          }
        }

        arrData.push({
          name: item.title,
          category: arrayCategory,
          description: item.description,
          filmId: item._id,
        });
      }
      setDataSeries(arrData);
    }
  }, [dataVideoSeries, category]);

  if (!dataVideo || !dataVideoSeries || !data) {
    return <LoadingPage />;
  }
  return (
    <DivLandingPage>
      <Helmet>
        <title>Landing Page</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <DivActionAuth backgroundImage={banner1}>
        <DivContentAuth>
          <DivBanner>
            <TextBanner>
              <LogoImage height="100" width="400" />
            </TextBanner>
          </DivBanner>
          <DivContent>
            <TextTitle>
              Thưởng thức những bộ phim đình đám, chương trình truyền hình nổi
              bật và hơn thế nữa chỉ từ 30,000 VND.
            </TextTitle>
            <TextContent>
              Tham gia ngay hôm nay, hủy bỏ bất cứ lúc nào.
            </TextContent>
            <TextContent2>
              Bạn đã sẵn sàng để xem chưa? Đăng nhập để kích hoạt lại tư cách
              thành viên của bạn.
            </TextContent2>
            <ButtonLogin>
              <Link to="/auth/login">
                Bắt đầu <RightOutlined />
              </Link>
            </ButtonLogin>
          </DivContent>
        </DivContentAuth>
      </DivActionAuth>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>
              Thưởng thức những bộ phim hấp dẫn kịch tính
            </TitleInformation>
            <TextInformation>
              Mang đến trải nghiệm tốt nhất cho bạn, với chất lượng hình ảnh sắc
              nét, âm thanh sống động, và một kho tàng phim đồ sộ từ nhiều thể
              loại khác nhau.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <BannerLandingPage
              dataVideo={dataVideo}
              isLoading={isLoading}
              data={data}
            />
          </ColInformation>
        </RowInformation>
      </DivInformation>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>
              Khám phá những bộ phim bộ dài tập đầy cuốn hút
            </TitleInformation>
            <TextInformation>
              Đắm chìm trong thế giới điện ảnh với những câu chuyện được kể qua
              từng tập phim, từ drama sâu sắc đến hành động nghẹt thở, mang đến
              cho bạn niềm vui và cảm xúc bất tận.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <BannerLandingPage
              dataVideo={dataVideoSeries}
              isLoading={isLoading}
              data={dataSeries}
            />
          </ColInformation>
        </RowInformation>
      </DivInformation>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>Thưởng thức trên TV của bạn</TitleInformation>
            <TextInformation>
              Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV,
              Đầu phát Blu-ray và hơn thế nữa.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <ImageInformation src={imageInfo1} />
          </ColInformation>
        </RowInformation>
      </DivInformation>
      <DivInformation>
        <RowInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <TitleInformation>Xem mọi nơi</TitleInformation>
            <TextInformation>
              Truyền phát phim và chương trình truyền hình không giới hạn trên
              điện thoại, máy tính bảng, máy tính xách tay của bạn và truyền
              hình.
            </TextInformation>
          </ColInformation>
          <ColInformation span={12} md={12} lg={12} xs={24}>
            <ImageInformation src={imageInfo2} />
          </ColInformation>
        </RowInformation>
      </DivInformation>
    </DivLandingPage>
  );
}

export default LandingPage;
