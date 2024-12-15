import { useContext, useEffect, useState } from 'react';
import {
  DivAssets,
  DivAction,
  DivData,
  ButtonImport,
  Text,
  DivError,
  TextError,
  DivAddData,
  DivPagination,
} from './styles';
import { Button, Modal, Select, message, notification } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllSeries,
  deleteSeries,
  fetchAllSeriesLook,
} from '../../redux/Action/Assets/series';
import {
  fetchAllSeriesTrash,
  postRecoverSeries,
  deleteTrashSeries,
  fetchAllSeriesTrashLook,
} from '../../redux/Action/Assets/trashSeries';
import {
  fetchAllMoviesTrash,
  postRecoverMovies,
  deleteTrashMovies,
  fetchAllMoviesTrashLook,
} from '../../redux/Action/Assets/trashMovies';
import {
  deleteMovies,
  fetchAllMovies,
  fetchAllMoviesLook,
} from '../../redux/Action/Assets/movies';
import {
  deleteFilmForSeries,
  fetchAllFilmForSeries,
} from '../../redux/Action/Assets/filmForSeries';
import {
  fetchAllCategory,
  deleteCategory,
  fetchAllCategoryLook,
} from '../../redux/Action/Assets/category';
import TableAssets from '../../components/TableAssets';
import { RoleContext } from '../../contexts/UserContext';
import LoadingComponent from '../../components/LoadingComponent';
import ModalAdd from '../../components/ModalAdd';
import FormModalContext from '../../contexts/FormModalContext';
import PaginationComponent from '../../components/Common/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteTrashFilmForSeries,
  fetchAllFilmForSeriesTrash,
  postRecoverFilmForSeries,
} from '../../redux/Action/Assets/trashFilmForSeries';
import { importMovies } from '../../assets/fileImport';
import { CSVLink } from 'react-csv';
import { countries } from '../../assets/country';
import LookInfo from '../../components/Common/LookComponent';
import { API_SERIES, API_ADD_MANY_MOVIES } from '../../configs/apis';

function AssetsPage(props) {
  const [isModal, setIsModal] = useState(false);
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFile, setDataFile] = useState(undefined);
  const [page, setPage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataId, setDataId] = useState(false);
  const [seriesId, setSeriesId] = useState(false);
  const [dataSeries, setDataSeries] = useState();
  const [defaultValue, setDefaultValue] = useState();
  const [typeModal, setTypeModal] = useState(false);
  const [textModal, setTextModal] = useState(false);
  const [dataExport, setDataExport] = useState(importMovies);
  const [dataCountries, setDataCountries] = useState();
  const [textLook, setTextLook] = useState('');
  const [valueCountries, setValueCountries] = useState('All');
  const [messageApi, contextHolder] = message.useMessage();

  const { userInfo } = useContext(RoleContext);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  //  lấy param search
  const look = searchParams.get('look');
  const pageCurrent = searchParams.get('page');
  const textSearch = searchParams.get('textSearch');
  const textCountry = searchParams.get('textCountry');

  //  thong báo
  const openNotification = (placement, message) => {
    notification.error({
      message: `Thông báo lỗi`,
      description: message,
      placement,
    });
  };

  const dispatch = useDispatch();
  let data, loading, error, count;
  const series = useSelector((state) => state.seriesSlice);
  const movies = useSelector((state) => state.moviesSlice);
  const category = useSelector((state) => state.categorySlice);
  const trashMovies = useSelector((state) => state.trashMoviesSlice);
  const trashSeries = useSelector((state) => state.trashSeriesSlice);
  const film = useSelector((state) => state.filmForSeriesSlice);
  const trashFilm = useSelector((state) => state.trashFilmForSeriesSlice);
  if (props.type === 'series') {
    data = series.data;
    loading = series.loading;
    error = series.error;
    count = series.count;
  }
  if (props.type === 'movies') {
    data = movies.data;
    loading = movies.loading;
    error = movies.error;
    count = movies.count;
  }
  if (props.type === 'category') {
    data = category.data;
    loading = category.loading;
    error = category.error;
    count = category.count;
  }
  if (props.type === 'trash-movies') {
    data = trashMovies.data;
    loading = trashMovies.loading;
    error = trashMovies.error;
    count = trashMovies.count;
  }
  if (props.type === 'trash-series') {
    data = trashSeries.data;
    loading = trashSeries.loading;
    error = trashSeries.error;
    count = trashSeries.count;
  }

  if (props.type === 'film-for-series') {
    data = film.data;
    loading = film.loading;
    error = film.error;
    count = film.count;
  }

  if (props.type === 'trash-film-for-series') {
    data = trashFilm.data;
    loading = trashFilm.loading;
    error = trashFilm.error;
    count = trashFilm.count;
  }

  const showModal = (type) => {
    setIsModal(true);
  };

  //  taobj table hien thi du lieu
  useEffect(() => {
    const tableData = {
      title: {
        title: props.title,
        dataIndex: props.dataIndex,
        key: props.key,
        width: userInfo.role === 'superAdmin' ? '70%' : '85%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
    };

    setDataTable(tableData);
    if (pageCurrent) setPage(pageCurrent);
    else setPage(1);
  }, [
    props.type,
    props.dataIndex,
    props.key,
    props.title,
    userInfo,
    pageCurrent,
  ]);

  //  gọi dữ liệu từ api action của redux đưa dữ liệu vào slice
  useEffect(() => {
    setIsLoading(true);
    let pageNum = getPage();
    setTextLook('');
    setValueCountries('All');

    // trang khi reload mới
    if (!look) {
      if (props.type === 'series') {
        Promise.all([dispatch(fetchAllSeries(pageNum))]);
      } else if (props.type === 'movies') {
        Promise.all([dispatch(fetchAllMovies(pageNum))]);
      } else if (props.type === 'category') {
        Promise.all([dispatch(fetchAllCategory(pageNum))]);
      } else if (props.type === 'trash-movies') {
        Promise.all([dispatch(fetchAllMoviesTrash(pageNum))]);
      } else if (props.type === 'trash-series') {
        Promise.all([dispatch(fetchAllSeriesTrash(pageNum))]);
      }
    } else {
      // trang khi reload mới có params search
      switch (props.type) {
        case 'series':
          Promise.all([
            dispatch(
              fetchAllSeriesLook({
                pageNum: pageNum,
                valueCountries: textCountry,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        case 'movies':
          Promise.all([
            dispatch(
              fetchAllMoviesLook({
                pageNum: pageNum,
                valueCountries: textCountry,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        case 'trash-series':
          Promise.all([
            dispatch(
              fetchAllSeriesTrashLook({
                pageNum: pageNum,
                valueCountries: textCountry,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        case 'trash-movies':
          Promise.all([
            dispatch(
              fetchAllMoviesTrashLook({
                pageNum: pageNum,
                valueCountries: textCountry,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        case 'category':
          Promise.all([
            dispatch(
              fetchAllCategoryLook({
                pageNum: pageNum,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        default:
          break;
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [location.search, props.type, dispatch, page]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(API_SERIES);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          let newOptions = [];

          await Promise.all(
            data.data.map(async (item, index) => {
              if (index === 0) {
                setDefaultValue(item._id);
                let pageNum = getPage();

                if (props.type === 'film-for-series') {
                  Promise.all([
                    dispatch(
                      fetchAllFilmForSeries({
                        pageNum: pageNum,
                        value: item._id,
                      }),
                    ),
                  ]);
                } else {
                  Promise.all([
                    dispatch(
                      fetchAllFilmForSeriesTrash({
                        pageNum: pageNum,
                        value: item._id,
                      }),
                    ),
                  ]);
                }
              }
              newOptions.push({
                label: item.title,
                value: item._id,
              });
            }),
          );

          setDataSeries(newOptions);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    if (
      props.type === 'film-for-series' ||
      props.type === 'trash-film-for-series'
    ) {
      fetchCategory();
    }
  }, [props.type]);

  useEffect(() => {
    setDataCountries(countries);
  }, [countries, props.type]);

  useEffect(() => {
    setIsLoading(false);
  }, [movies, series, film, category]);

  const handleOnchangeInput = (e) => {
    if (e.target.files[0] !== undefined) {
      setDataFile(e.target.files[0]);
      setTextModal(
        `Bạn có chắc chắn muốn thêm tất cả dữ liệu từ tệp csv không?`,
      );
      setTypeModal('file');
      setIsModalOpen(true);
      e.target.value = '';
    }
  };

  const handleOk = async () => {
    let pageNum = getPage();

    if (typeModal === 'file') {
      if (props.type === 'movies') {
        const formData = new FormData();
        formData.append('file', dataFile);
        // dispatch(addManyMovies(formData));
        const response = await fetch(API_ADD_MANY_MOVIES, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        });
        const json = await response.json();
        if (!json.success) {
          setTypeModal(undefined);
          setDataFile(undefined);
          setIsModalOpen(false);
          openNotification('top', json.message);
          return;
        } else {
          setIsModalOpen(false);
          setIsLoading(true);
          setTimeout(() => {
            Promise.all([dispatch(fetchAllMovies(1))]);
            setIsLoading(false);
          }, 2000);
        }
      }
    } else if (typeModal === 'delete') {
      if (props.type === 'movies') {
        dispatch(deleteMovies({ dataId: dataId, type: typeModal }));
        Promise.all([dispatch(fetchAllMovies(pageNum))]);
      }
      if (props.type === 'category') {
        dispatch(deleteCategory(dataId));
        Promise.all([dispatch(fetchAllCategory(pageNum))]);
      }
      if (props.type === 'series') {
        dispatch(deleteSeries({ dataId: dataId, type: typeModal }));
        Promise.all([dispatch(fetchAllSeries(pageNum))]);
      }
      if (props.type === 'film-for-series') {
        dispatch(
          deleteFilmForSeries({
            dataId: dataId,
            type: typeModal,
            seriesId: seriesId,
          }),
        );
        Promise.all([
          dispatch(
            fetchAllFilmForSeries({ pageNum: pageNum, value: defaultValue }),
          ),
        ]);
      }
    } else if (typeModal === 'recover') {
      if (props.type === 'trash-movies') {
        dispatch(postRecoverMovies({ dataId: dataId }));
      }
      if (props.type === 'trash-series') {
        dispatch(postRecoverSeries({ dataId: dataId }));
      }
      if (props.type === 'trash-film-for-series') {
        dispatch(
          postRecoverFilmForSeries({ dataId: dataId, seriesId: seriesId }),
        );
      }
    } else if (typeModal === 'destroy') {
      if (props.type === 'trash-movies') {
        dispatch(deleteTrashMovies({ dataId: dataId, type: typeModal }));
      }

      if (props.type === 'trash-series') {
        dispatch(deleteTrashSeries({ dataId: dataId, type: typeModal }));
      }

      if (props.type === 'trash-film-for-series') {
        dispatch(
          deleteTrashFilmForSeries({
            dataId: dataId,
            seriesId: seriesId,
            type: typeModal,
          }),
        );
      }
    }
    setTypeModal(undefined);
    setDataFile(undefined);
    setIsModalOpen(false);

    if (data.length - 1 === 0 && page > 1) {
      setPage((prev) => prev - 1);
      if (look) {
        navigate(
          '/' +
            props.type +
            '?look=true&page=' +
            (page - 1) +
            '&textSearch=' +
            textSearch +
            '&textCountry=' +
            textCountry,
        );
      } else navigate('/' + props.type + '?page=' + (page - 1));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDataFile(undefined);
  };

  const handleOnChangePage = (page, size) => {
    setPage(page);
    if (look) {
      navigate(
        '/' +
          props.type +
          '?look=true&page=' +
          page +
          '&textSearch=' +
          textSearch +
          '&textCountry=' +
          textCountry,
      );
    } else navigate('/' + props.type + '?page=' + page);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    if (value !== '') {
      setDefaultValue(value);
    }

    let pageNum = getPage();

    if (props.type === 'film-for-series') {
      Promise.all([
        dispatch(fetchAllFilmForSeries({ pageNum: pageNum, value: value })),
      ]);
    } else {
      Promise.all([
        dispatch(
          fetchAllFilmForSeriesTrash({ pageNum: pageNum, value: value }),
        ),
      ]);
    }
  };
  const handleImport = () => {
    setIsModalUpload(true);
  };
  const handleCancelUpload = () => {
    setIsModalUpload(false);
  };
  const handleOpenFile = () => {
    setIsModalUpload(false);
  };
  const getPage = () => {
    let pageNum;
    if (location.search !== '') {
      const searchParams = new URLSearchParams(location.search);

      for (let param of searchParams) {
        if (param[0] === 'page') {
          pageNum = parseInt(param[1]);
        }
      }
    } else {
      pageNum = 1;
    }
    return pageNum;
  };

  const onChangeLook = () => {
    setPage(1);
    if (props.type !== 'category') {
      navigate(
        '/' +
          props.type +
          '?look=true&page=1&textSearch=' +
          textLook +
          '&textCountry=' +
          valueCountries,
      );
    } else {
      navigate('/' + props.type + '?look=true&page=1&textSearch=' + textLook);
    }
  };

  if (
    isLoading ||
    loading ||
    ((props.type === 'film-for-series' ||
      props.type === 'trash-film-for-series') &&
      !dataSeries)
  ) {
    return (
      <DivAssets>
        <LoadingComponent />
      </DivAssets>
    );
  }

  if (error) {
    return (
      <DivAssets>
        <DivError>
          <TextError>Server đang gặp sự cố, vui lòng thử lại sau!!!</TextError>
        </DivError>
      </DivAssets>
    );
  }
  return (
    <DivAssets>
      {contextHolder}
      <DivAddData>
        <div>
          <FormModalContext.Provider
            value={{
              type: props.type,
              dataRecord: dataRecord,
              options: dataSeries,
              setDefaultValue: setDefaultValue,
              filterOption: filterOption,
              setIsLoading: setIsLoading,
            }}>
            <ModalAdd
              isModal={isModal}
              setIsModal={setIsModal}
              setDataRecord={setDataRecord}
            />
          </FormModalContext.Provider>
          {props.type !== 'trash-film-for-series' &&
            props.type !== 'trash-series' &&
            props.type !== 'trash-movies' && (
              <DivAction>
                <Button type="primary" onClick={showModal}>
                  Thêm
                </Button>
              </DivAction>
            )}

          {props.type === 'movies' && (
            <>
              <ButtonImport onClick={handleImport}>
                <ImportOutlined />
                Nhập nhiều dữ liệu phim
              </ButtonImport>
              <Modal
                open={isModalUpload}
                onCancel={handleCancelUpload}
                title="Tải tập tin lên"
                footer={(_) => (
                  <>
                    <CSVLink
                      onClick={handleOpenFile}
                      data={dataExport}
                      filename="instruction-file.csv"
                      className="link-download-csv">
                      Tập tin hướng dẫn
                    </CSVLink>
                    <Text htmlFor="file" onClick={handleOpenFile}>
                      Nhập tập tin{' '}
                      <input
                        id="file"
                        name="file"
                        type="file"
                        hidden
                        onChange={(e) => handleOnchangeInput(e)}
                      />
                    </Text>
                  </>
                )}>
                <p>
                  Nếu bạn không chắc chắn về cách thiết lập tệp csv, vui lòng
                  nhấp vào tải tập tin để được hướng dẫn. Nếu không, hãy nhấp
                  vào nhập tệp vào thêm dữ liệu.
                </p>
              </Modal>
            </>
          )}
        </div>
        <div>
          <LookInfo
            onChangeLook={onChangeLook}
            dataCountries={dataCountries}
            filterOption={filterOption}
            setValueCountries={setValueCountries}
            setTextLook={setTextLook}
            textLook={textLook}
            valueCountries={valueCountries}
            type={props.type}
          />
        </div>
        {(props.type === 'film-for-series' ||
          props.type === 'trash-film-for-series') && (
          <div>
            <Select
              showSearch
              value={defaultValue}
              placeholder="Chọn 1 phim bộ"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataSeries}
              style={{ width: '250px' }}
            />
          </div>
        )}
      </DivAddData>

      <Modal
        title={
          typeModal === 'delete'
            ? 'Xóa dữ liệu'
            : typeModal === 'recover'
            ? 'Khôi phục dữ liệu'
            : 'Loại bỏ dữ liệu'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{textModal}</p>
      </Modal>

      <DivData>
        {isLoading || loading ? (
          <LoadingComponent />
        ) : (
          <>
            <TableAssets
              data={data}
              setDataRecord={setDataRecord}
              type={props.type}
              setIsModal={setIsModal}
              dataTable={dataTable}
              setDataId={setDataId}
              setIsModalOpen={setIsModalOpen}
              setTypeModal={setTypeModal}
              setTextModal={setTextModal}
              setSeriesId={setSeriesId}
            />
            {data.length > 0 && (
              <DivPagination>
                <PaginationComponent
                  count={count}
                  page={page}
                  handleOnChangePage={handleOnChangePage}
                />
              </DivPagination>
            )}
          </>
        )}
      </DivData>
    </DivAssets>
  );
}

export default AssetsPage;
