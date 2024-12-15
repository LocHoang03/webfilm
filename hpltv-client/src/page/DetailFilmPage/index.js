import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { fetchAllMovies } from '../../redux/action/home/movies';
import { fetchAllCategory } from '../../redux/action/category/category';
import { fetchMoviesMostView } from '../../redux/action/film/MostView';
import { fetchMoviesMostNew } from '../../redux/action/film/MostNew';
import { fetchMoviesMostRating } from '../../redux/action/film/MostRating';
import {
  handleLikeMovies,
  handleRatingMoviesAction,
} from '../../redux/action/home/movies';
import FilmMost from '../../components/FilmAndMovies/FilmMost';
import { fetchMoviesSameMovies } from '../../redux/action/film/SameMovies';
import { fetchOrderFromUserId } from '../../redux/action/order';
import { fetchAllPackage } from '../../redux/action/package';
import FilmSameComponent from '../../components/FilmAndMovies/FilmSameComponent';
import CommentComponent from '../../components/Comment/CommentComponent';
import InfoMovies from '../../components/FilmAndMovies/InfoMovies';
import VideoActionMovies from '../../components/FilmAndMovies/VideoActionMovies';
import LoadingPage from '../LoadingPage';
import { Modal } from 'antd';
import { CheckLoginContext } from '../../contexts/LoginContext';
import { Helmet } from 'react-helmet-async';

const { confirm } = Modal;

const DetailFilmPage = (props) => {
  const [data, setData] = useState();
  const [isLike, setIsLike] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [dataValueUserRating, setDataValueUserRating] = useState(0);
  const [isWatching, setIsWatching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userInfo } = useContext(CheckLoginContext);

  const navigate = useNavigate();

  const { filmId } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  const mostNew = useSelector((state) => state.moviesMostNewSlice);
  const mostView = useSelector((state) => state.moviesMostViewSlice);
  const mostRating = useSelector((state) => state.moviesMostRatingSlice);
  const sameMovies = useSelector((state) => state.sameMoviesSlice);
  const order = useSelector((state) => state.orderSlice);

  useEffect(() => {
    Promise.all([
      dispatch(fetchAllMovies()),
      dispatch(fetchMoviesMostNew()),
      dispatch(fetchMoviesMostView()),
      dispatch(fetchMoviesMostRating()),
      dispatch(fetchMoviesSameMovies(filmId)),
      dispatch(fetchAllCategory()),
      dispatch(fetchOrderFromUserId(userInfo.userId)),
      dispatch(fetchAllPackage()),
    ]);
  }, [dispatch, filmId, userInfo, props.watching]);

  //get phim chi tiết và thể loại của phim đó
  useEffect(() => {
    if (movies && category) {
      let objectData = { category: [], film: null };
      for (let item of movies.data) {
        if (item._id === filmId) {
          objectData.film = item;
          for (let cate of category.data) {
            if (
              item.listCategoryId.some((itemCate) => itemCate._id === cate._id)
            ) {
              objectData.category.push(cate.name);
            }
          }
        }
      }
      setData(objectData);
    }
  }, [movies, category, filmId]);

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
    if (data && data.film) {
      data.film.listUserIdRating.some((item) => {
        if (item.userId.toString() === userInfo.userId.toString()) {
          setDataValueUserRating(item.valueRating);
          setIsRating(true);
        }
      });
    }
  }, [data, userInfo]);

  // check package user (ktra xem gói phim người dùng có đủ quyền để xem dc bộ phim này ko)
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
    if (isWatching) {
      navigate('/film/watching-movies/' + filmId);
    } else {
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

  // thực hiện like phim
  const handleClickLikeMovies = async () => {
    const data = {
      userId: userInfo.userId,
      isLike: isLike,
      filmId: filmId,
    };
    await dispatch(handleLikeMovies(data));
    setIsLike((prev) => !prev);
  };
  // thực hiện đánh giá phim
  const handleRatingMovies = async (value) => {
    const data = {
      filmId: filmId,
      userId: userInfo.userId,
      valueRating: value,
    };
    await dispatch(handleRatingMoviesAction(data));
    setIsRating(true);
  };

  if (
    !movies ||
    !category ||
    !data ||
    !data.film ||
    !mostNew ||
    !mostNew.data ||
    !mostView ||
    !mostView.data ||
    !mostRating ||
    !mostRating.data ||
    !sameMovies ||
    !sameMovies.data ||
    !order ||
    !order.data
  ) {
    return <LoadingPage />;
  }

  return (
    <DivContainer>
      <Helmet>
        <title>Detail Film </title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <RowDetail>
        <ColDetail span={17} lg={16}>
          <RowLeft>
            {props.watching === false ? (
              <>
                <ColLeft span={10} lg={12} md={9} sm={12} xs={20}>
                  <ImageFilm src={data.film.imageUrl.url} />
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
                  <TextContent>{data.film.description}</TextContent>
                </DivContent>
              </>
            ) : (
              <>
                <VideoActionMovies
                  data={data}
                  isLike={isLike}
                  handleClickLikeMovies={handleClickLikeMovies}
                  handleRatingMovies={handleRatingMovies}
                  isRating={isRating}
                  dataValueUserRating={dataValueUserRating}
                  type={'movies'}
                />
              </>
            )}
            <DivFilmSame>
              <FilmSameComponent
                listFilm={sameMovies.data}
                filmId={filmId}
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
                {props.watching && <CommentComponent type="movies" />}
              </DivContentComment>
            </DivComment>
          </RowLeft>
        </ColDetail>
        <ColDetail span={7} lg={8} xs={24} right={'right'}>
          <FilmMost
            title={'Phim mới cập nhật'}
            film={mostNew.data}
            filmId={filmId}
            type="movies"
          />
          <FilmMost
            title={'Phim hay cho bạn'}
            film={mostView.data}
            filmId={filmId}
            type="movies"
          />
          <FilmMost
            title={'Phim đề xuất'}
            film={mostRating.data}
            filmId={filmId}
            type="movies"
          />
        </ColDetail>
      </RowDetail>
    </DivContainer>
  );
};

export default DetailFilmPage;
