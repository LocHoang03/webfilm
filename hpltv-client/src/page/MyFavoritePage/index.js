import { useEffect, useState, useContext } from 'react';
import {
  DivFilm,
  Title,
  ColPage,
  RowPage,
  DivContent,
  DivInfo,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMovies } from '../../redux/action/home/movies';
import Film from '../../components/FilmAndMovies/FilmComponent';
import LoadingPage from '../LoadingPage';
import { CheckLoginContext } from '../../contexts/LoginContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const MyFavoritePage = () => {
  const [data, setData] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [slide, setSlide] = useState(4);

  const { userInfo } = useContext(CheckLoginContext);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesSlice);
  const series = useSelector((state) => state.seriesSlice);

  // responsive
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    if (width >= 1200) {
      setSlide(4);
    }
    if (width >= 992 && width < 1200) {
      setSlide(6);
    }
    if (width < 992 && width >= 768) {
      setSlide(6);
    }
    if (width < 768 && width > 576) {
      setSlide(8);
    }
    if (width < 576) {
      setSlide(12);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  // lấy phim người dùng đã like
  useEffect(() => {
    const fetchData = async () => {
      if (movies && series) {
        let arrayData = [];
        for (let item of movies.data) {
          if (item.listUserIdLike.includes(userInfo.userId))
            arrayData.push(item);
        }
        for (let item of series.data) {
          if (item.listUserIdLike.includes(userInfo.userId))
            arrayData.push(item);
        }
        setData(arrayData);
      }
    };
    fetchData();
  }, [movies, series, userInfo]);

  if (!movies || !data) {
    return <LoadingPage />;
  }

  return (
    <DivFilm>
      <Helmet>
        <title>Favorite Film</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <DivContent>
        <Title>Danh sách phim yêu thích</Title>

        <RowPage justify="start">
          {data && data.length > 0 ? (
            data.map((item, id) => {
              return (
                <ColPage key={id} span={slide}>
                  <Film
                    title={item.title}
                    image={item.imageUrl.url}
                    idFilm={item._id}
                    type="movies"
                  />
                </ColPage>
              );
            })
          ) : (
            <DivInfo>
              <p>Danh sách trống!!</p>
            </DivInfo>
          )}
        </RowPage>
      </DivContent>
    </DivFilm>
  );
};

export default MyFavoritePage;
