import { useNavigate, useParams } from 'react-router-dom';
import {
  DivContainer,
  RowDetail,
  ColDetail,
  RowLeft,
  ColLeft,
  ColRight,
  ImageFilm,
  DivContent,
  TextContent,
  TitleContent,
  DivWatchButton,
  ButtonWatch,
  DivFilmSame,
  DivComment,
  DivContentComment,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import {
  fetchAllSeries,
  handleLikeSeries,
  handleRatingSeriesAction,
} from '../../redux/action/home/series';
import { fetchAllCategory } from '../../redux/action/category/category';
import { fetchSeriesMostView } from '../../redux/action/film/MostView';
import { fetchSeriesMostNew } from '../../redux/action/film/MostNew';
import { fetchSeriesMostRating } from '../../redux/action/film/MostRating';

import FilmMost from '../../components/FilmAndMovies/FilmMost';
import { fetchSeriesSameSeries } from '../../redux/action/film/SameMovies';
import { fetchOrderFromUserId } from '../../redux/action/order';
import { fetchAllPackage } from '../../redux/action/package';
import FilmSameComponent from '../../components/FilmAndMovies/FilmSameComponent';
import CommentComponent from '../../components/Comment/CommentComponent';
import InfoMovies from '../../components/FilmAndMovies/InfoMovies';
import VideoActionMovies from '../../components/FilmAndMovies/VideoActionMovies';
import LoadingPage from '../LoadingPage';
import { Modal } from 'antd';
import { CheckLoginContext } from '../../contexts/LoginContext';
import { fetchAllFilmForSeries } from '../../redux/action/home/filmforseries';
import { Helmet } from 'react-helmet-async';

const { confirm } = Modal;

const DetailSeriesPage = (props) => {
  const [data, setData] = useState();
  const [dataSeries, setDataSeries] = useState();
  const [isLike, setIsLike] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [dataValueUserRating, setDataValueUserRating] = useState(0);
  const [isWatching, setIsWatching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userInfo } = useContext(CheckLoginContext);

  const navigate = useNavigate();

  const { seriesId, number } = useParams();

  const dispatch = useDispatch();
  const series = useSelector((state) => state.seriesSlice);
  const filmForSeries = useSelector((state) => state.filmForSeriesSlice);
  const category = useSelector((state) => state.categorySlice);
  const mostNew = useSelector((state) => state.seriesMostNewSlice);
  const mostView = useSelector((state) => state.seriesMostViewSlice);
  const mostRating = useSelector((state) => state.seriesMostRatingSlice);
  const sameSeries = useSelector((state) => state.sameSeriesSlice);
  const order = useSelector((state) => state.orderSlice);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchAllSeries()),
          dispatch(fetchAllFilmForSeries(seriesId)),
          dispatch(fetchSeriesMostNew()),
          dispatch(fetchSeriesMostView()),
          dispatch(fetchSeriesMostRating()),
          dispatch(fetchSeriesSameSeries(seriesId)),
          dispatch(fetchAllCategory()),
          dispatch(fetchOrderFromUserId(userInfo.userId)),
          dispatch(fetchAllPackage()),
        ]);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch, seriesId, userInfo, number, props.watching]);

  //get name category
  useEffect(() => {
    if (series && category) {
      let objectData = { category: [], film: null };
      for (let item of series.data) {
        if (item._id === seriesId) {
          objectData.film = item;
          for (let cate of category.data) {
            if (
              item.listCategoryId.some(
                (itemCate) => itemCate.toString() === cate._id.toString(),
              )
            ) {
              objectData.category.push(cate.name);
            }
          }
        }
      }
      if (props.watching === false) setData(objectData);
      else setDataSeries(objectData);
    }
  }, [series, category, seriesId, props.watching]);

  //get name category
  useEffect(() => {
    if (filmForSeries && props.watching === true) {
      for (let item of filmForSeries.data) {
        if (number && item.filmSerialNumber === number) {
          setData(item);
          return;
        } else {
          if (item.filmSerialNumber === 1) {
            setData(item);
            return;
          }
        }
      }
    }
  }, [filmForSeries, seriesId, props.watching, number]);

  //set like user
  useEffect(() => {
    if (
      data &&
      data.film &&
      data.film.listUserIdLike.includes(userInfo.userId)
    ) {
      setIsLike(true);
    }
  }, [data, userInfo]);

  //set rating user
  useEffect(() => {
    setIsRating(false);
    setDataValueUserRating(0);
    if (dataSeries && dataSeries.film) {
      dataSeries.film.listUserIdRating.some((item) => {
        if (item.userId.toString() === userInfo.userId.toString()) {
          setDataValueUserRating(item.valueRating);
          setIsRating(true);
        }
      });
    }
  }, [data, userInfo]);

  // check package user
  useEffect(() => {
    setIsWatching(true);
    if (data?.film?.listPackageIdBand && order?.data[0]?.packageId) {
      const packageId = order.data[0].packageId._id;
      const listPackageIds = data.film.listPackageIdBand;
      if (listPackageIds.includes(packageId)) {
        setIsWatching(false);
      }
    }
  }, [data, order]);

  const handleWatchingMovies = () => {
    if (isWatching && seriesId) {
      navigate('/watching-series/' + seriesId + '/' + 1);
    } else {
      setIsModalOpen(true);
      confirm({
        title: 'Hoạt động không thành công!!',
        content: `Gói dịch vụ của bạn không xem được phim này, vui lòng nâng cấp lên dịch vụ cao hơn 
        gói để có thể xem phim này. Bạn có nâng cấp gói hiện tại của mình không?`,
        okText: 'Đồng ý',
        cancelText: 'Từ chối',
        onOk() {
          navigate('/package-upgrade');
        },
        onCancel() {},
      });
    }
  };

  const handleClickLikeSeries = async () => {
    const data = {
      userId: userInfo.userId,
      isLike: isLike,
      seriesId: seriesId,
    };
    await dispatch(handleLikeSeries(data));
    setIsLike((prev) => !prev);
  };

  const handleRatingSeries = async (value) => {
    const data = {
      seriesId: seriesId,
      userId: userInfo.userId,
      valueRating: value,
    };
    await dispatch(handleRatingSeriesAction(data));
    setIsRating(true);
  };

  if (
    !series ||
    !category ||
    !data ||
    !mostNew ||
    !mostNew.data ||
    !mostView ||
    !mostView.data ||
    !mostRating ||
    !mostRating.data ||
    !sameSeries ||
    !sameSeries.data ||
    !order ||
    !order.data ||
    !filmForSeries ||
    !filmForSeries.data
  ) {
    return <LoadingPage />;
  }

  return (
    <DivContainer>
      <Helmet>
        <title>Detail Series </title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <RowDetail>
        <ColDetail span={17} lg={16}>
          <RowLeft>
            {props.watching === false ? (
              <>
                <ColLeft span={10} lg={12} md={9} sm={12} xs={20}>
                  <ImageFilm src={data?.film?.imageUrl?.url} />
                  <DivWatchButton>
                    <ButtonWatch onClick={handleWatchingMovies}>
                      Xem phim
                    </ButtonWatch>
                  </DivWatchButton>
                </ColLeft>
                <ColRight span={14} lg={12} md={15} sm={12} xs={24}>
                  <InfoMovies data={data} />
                </ColRight>
                <DivContent>
                  <TitleContent>Nội dung</TitleContent>
                  <TextContent>{data?.film?.description}</TextContent>
                </DivContent>
              </>
            ) : (
              <>
                <VideoActionMovies
                  data={data}
                  isLike={isLike}
                  handleClickLikeSeries={handleClickLikeSeries}
                  handleRatingSeries={handleRatingSeries}
                  isRating={isRating}
                  dataValueUserRating={dataValueUserRating}
                  type={'series'}
                  listDataSeries={filmForSeries.data}
                  number={number}
                  seriesId={seriesId}
                />
              </>
            )}
            <DivFilmSame>
              <FilmSameComponent
                listFilm={sameSeries.data}
                filmId={seriesId}
                type="series"
                slide={
                  window.innerWidth > 797 && window.innerWidth <= 991
                    ? 4
                    : window.innerWidth > 610
                    ? 3
                    : 2
                }
              />
            </DivFilmSame>
            <DivComment>
              <DivContentComment>
                {props.watching && <CommentComponent type="series" />}
              </DivContentComment>
            </DivComment>
          </RowLeft>
        </ColDetail>
        <ColDetail span={7} lg={8} xs={24} right={'right'}>
          <FilmMost
            title={'Phim mới cập nhật'}
            film={mostNew.data}
            filmId={seriesId}
            type="series"
          />
          <FilmMost
            title={'Phim hay cho bạn'}
            film={mostView.data}
            filmId={seriesId}
            type="series"
          />
          <FilmMost
            title={'Phim đề xuất'}
            film={mostRating.data}
            filmId={seriesId}
            type="series"
          />
        </ColDetail>
      </RowDetail>
    </DivContainer>
  );
};

export default DetailSeriesPage;
