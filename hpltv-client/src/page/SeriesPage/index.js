import { useContext, useEffect, useState } from 'react';
import { DivFilm } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSeries } from '../../redux/action/home/series';
import { fetchAllCategory } from '../../redux/action/category/category';
import Content from '../../components/Content';
import { API_GET_NEW_SERIES } from '../../configs/apis';
import LoadingPage from '../LoadingPage';
import Banner from '../../components/Banner';
import SearchComponent from '../../components/Search';
import fetchDataLook from '../../utils/fetdataLook';
import { Helmet } from 'react-helmet-async';
import { fetchOrderFromUserId } from '../../redux/action/order';
import { CheckLoginContext } from '../../contexts/LoginContext';

const SeriesPage = () => {
  const [data, setData] = useState();
  const [dataVideo, setDataVideo] = useState();
  const [dataBanner, setDataBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);

  const { userInfo } = useContext(CheckLoginContext);

  const dispatch = useDispatch();
  const series = useSelector((state) => state.seriesSlice);
  const category = useSelector((state) => state.categorySlice);
  const order = useSelector((state) => state.orderSlice);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(API_GET_NEW_SERIES);
      const data = await response.json();
      setDataVideo(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    Promise.all([
      dispatch(fetchAllSeries()),
      dispatch(fetchAllCategory()),
      fetchSeries(),
      fetchDataLook(setOptions, setOptions1, setOptions2),
      dispatch(fetchOrderFromUserId(userInfo.userId)),
    ]);
  }, [dispatch]);

  useEffect(() => {
    if (series && category) {
      let arrayData = [];
      for (let cate of category.data) {
        let objectData = { title: null, film: [] };
        objectData.title = cate.name;
        for (let item of series.data) {
          if (Array.isArray(item.listCategoryId)) {
            if (
              item.listCategoryId.some((cate1) => {
                return cate1 === cate._id;
              })
            ) {
              objectData.film.push(item);
            }
          }
        }
        arrayData.push(objectData);
      }
      setData(arrayData);
    }
  }, [series, category]);

  useEffect(() => {
    if (dataVideo && category) {
      let arrData = [];
      for (let item of dataVideo) {
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
      setDataBanner(arrData);
    }
  }, [dataVideo, category]);

  if (
    !series ||
    !category ||
    !data ||
    !dataVideo ||
    !options ||
    !options1 ||
    !options2 ||
    !order
  ) {
    return <LoadingPage />;
  }

  return (
    <DivFilm>
      <Helmet>
        <title>Series Showhub</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <Banner
        dataVideo={dataVideo}
        isLoading={isLoading}
        data={dataBanner}
        type="series"
        order={order}
      />
      <SearchComponent
        options={options}
        options1={options1}
        options2={options2}
        type="series"
      />
      {data &&
        data.map((item, id) => {
          if (item.film.length > 4) {
            return (
              <Content
                title={item.title}
                listFilm={item.film}
                key={id}
                type="series"
              />
            );
          }
        })}
    </DivFilm>
  );
};

export default SeriesPage;
