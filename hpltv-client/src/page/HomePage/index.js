import { useContext, useEffect, useState } from 'react';
import Content from '../../components/Content';
import { DivHomePage, DivLoading } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesFeature } from '../../redux/action/home/movies';
import { fetchSeriesFeature } from '../../redux/action/home/series';
import { LoadingOutlined } from '@ant-design/icons';
import { API_GET_NEW_MOVIES } from '../../configs/apis';
import LoadingPage from '../LoadingPage';

import { fetchAllCategory } from '../../redux/action/category/category';
import Banner from '../../components/Banner';
import { Helmet } from 'react-helmet-async';
import { fetchOrderFromUserId } from '../../redux/action/order';
import { CheckLoginContext } from '../../contexts/LoginContext';

function HomePage() {
  const [dataVideo, setDataVideo] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { userInfo } = useContext(CheckLoginContext);

  const category = useSelector((state) => state.categorySlice);
  const movies = useSelector((state) => state.moviesSlice);
  const series = useSelector((state) => state.seriesSlice);
  const order = useSelector((state) => state.orderSlice);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(API_GET_NEW_MOVIES);
      const data = await response.json();
      setDataVideo(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    Promise.all([
      dispatch(fetchMoviesFeature()),
      dispatch(fetchSeriesFeature()),
      dispatch(fetchAllCategory()),
      fetchMovies(),
      dispatch(fetchOrderFromUserId(userInfo.userId)),
    ]);
  }, [dispatch]);

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

  if (!dataVideo || !data || !order) {
    return <LoadingPage />;
  }
  return (
    <DivHomePage>
      <Helmet>
        <title>Home</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
        <link rel="icon" href={process.env.REACT_APP_IMAGE_BANNER} />
      </Helmet>
      <Banner
        dataVideo={dataVideo}
        isLoading={isLoading}
        data={data}
        order={order}
      />
      {movies && series ? (
        <>
          <Content
            title={'Phim mới nhất'}
            listFilm={movies.data}
            type="movies"
          />
          <Content title="Phim lẻ" listFilm={movies.data} type="movies" />
          <Content title="Phim bộ" listFilm={series.data} type="series" />
        </>
      ) : (
        <DivLoading>
          <div>
            <LoadingOutlined />
          </div>
        </DivLoading>
      )}
    </DivHomePage>
  );
}

export default HomePage;
