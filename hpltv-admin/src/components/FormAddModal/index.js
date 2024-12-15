import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Select,
  notification,
  InputNumber,
  message,
  Checkbox,
} from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createMovies, updateMovies } from '../../redux/Action/Assets/movies';
import {
  createCategory,
  updateCategory,
} from '../../redux/Action/Assets/category';
import { createSeries, updateSeries } from '../../redux/Action/Assets/series';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext, useState } from 'react';
import {
  createFilmForSeries,
  updateFilmForSeries,
} from '../../redux/Action/Assets/filmForSeries';
import { DivCheckUpdate } from './styles';
import {
  API_POST_CHECK_NAME_MOVIES,
  API_POST_CHECK_NAME_SERIES,
  API_SERIES_ADMIN,
} from '../../configs/apis';

function FormAddModal(props) {
  const [seriesId, setSeriesId] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const { type, dataRecord, options, setDefaultValue, setIsLoading } =
    useContext(FormModalContext);
  const openNotification = (placement, message) => {
    notification.error({
      message: `Thông báo lỗi`,
      description: message,
      placement,
    });
  };
  const onFinish = async (values) => {
    let typeCheck = dataRecord ? 'update' : 'create';

    if (type === 'movies') {
      let data;
      if (dataRecord) {
        data = {
          filmId: dataRecord._id,
          type: typeCheck,
          title: values.title,
        };
      } else {
        data = {
          title: values.title,
          type: typeCheck,
        };
      }
      const response = await fetch(API_POST_CHECK_NAME_MOVIES, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });

      const json = await response.json();
      if (!json.success) {
        messageApi.open({
          type: 'error',
          content: json.message,
          duration: 2,
        });
        return;
      }
    }

    if (type === 'series') {
      let data;
      if (dataRecord) {
        data = {
          seriesId: dataRecord._id,
          type: typeCheck,
          title: values.title,
        };
      } else {
        data = {
          title: values.title,
          type: typeCheck,
        };
      }
      const response = await fetch(API_POST_CHECK_NAME_SERIES, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });

      const json = await response.json();
      if (!json.success) {
        messageApi.open({
          type: 'error',
          content: json.message,
          duration: 2,
        });
        return;
      }
    }
    if (type === 'film-for-series') {
      let data;
      if (dataRecord) {
        data = {
          number: values.filmSerialNumber,
          type: typeCheck,
          numberUpdate: dataRecord.filmSerialNumber,
        };
      } else {
        data = {
          number: values.filmSerialNumber,
          type: typeCheck,
        };
      }

      const response = await fetch(
        API_SERIES_ADMIN + '/' + values.listSeries + '/check-series-number',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        },
      );
      const json = await response.json();
      if (!json.success) {
        messageApi.open({
          type: 'error',
          content: json.message,
          duration: 2,
        });
        return;
      }
    }

    if (type === 'movies') {
      if (
        values.imageUrl &&
        values.imageUrl.file.type !== 'image/jpeg' &&
        values.imageUrl.file.type !== 'image/jpg' &&
        values.imageUrl.file.type !== 'image/png'
      ) {
        openNotification('top', 'Loại hình ảnh không hợp lệ!!');
        return;
      }

      if (values.videoUrl && values.videoUrl.file.type !== 'video/mp4') {
        openNotification('top', 'Loại video không hợp lệ!!');
        return;
      }
    }
    let formData = new FormData();
    let dataBody;
    switch (type) {
      case 'series':
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (dataRecord) {
          if (props.checkVideoTrailer)
            formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        } else {
          formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        }
        if (dataRecord) {
          if (props.checkImageFilm)
            formData.append('imageUrl', values.imageUrl.file);
        } else {
          formData.append('imageUrl', values.imageUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('director', values.director);
        formData.append('cast', values.cast);
        formData.append('country', values.country);
        formData.append('listCategoryId', values.listCategoryId);
        formData.append('listPackageIdBand', values.listPackageIdBand);
        break;
      case 'movies':
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (dataRecord) {
          if (props.checkVideoTrailer)
            formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        } else {
          formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        }
        if (dataRecord) {
          if (props.checkImageFilm)
            formData.append('imageUrl', values.imageUrl.file);
        } else {
          formData.append('imageUrl', values.imageUrl.file);
        }
        if (dataRecord) {
          if (props.checkVideoFilm)
            formData.append('videoUrl', values.videoUrl.file);
        } else {
          formData.append('videoUrl', values.videoUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('director', values.director);
        formData.append('cast', values.cast);
        formData.append('country', values.country);
        formData.append('listCategoryId', values.listCategoryId);
        formData.append('listPackageIdBand', values.listPackageIdBand);
        break;
      case 'category':
        dataBody = {
          name: values.name,
        };
        break;
      case 'film-for-series':
        if (dataRecord) {
          if (props.checkVideoFilm)
            formData.append('videoUrl', values.videoUrl.file);
        } else {
          formData.append('videoUrl', values.videoUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('filmSerialNumber', values.filmSerialNumber);
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        let data;

        switch (type) {
          case 'series':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateSeries(data));

            break;
          case 'movies':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateMovies(data));
            break;
          case 'category':
            data = {
              formData: dataBody,
              Id: dataRecord._id,
            };
            dispatch(updateCategory(data));
            break;
          case 'film-for-series':
            data = {
              formData: formData,
              Id: dataRecord._id,
              seriesId: values.listSeries,
            };
            dispatch(updateFilmForSeries(data));
            setDefaultValue(options[0].value);
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'series':
            dispatch(createSeries(formData));
            break;
          case 'movies':
            dispatch(createMovies(formData));
            break;
          case 'category':
            dispatch(createCategory(dataBody));
            break;
          case 'film-for-series':
            let data = {
              formData: formData,
              seriesId: values.listSeries,
            };
            dispatch(createFilmForSeries(data));
            setDefaultValue(options[0].value);
            break;
          default:
            break;
        }
      }
      setIsLoading(true);
      props.handleCancel();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    if (value !== '') {
      setSeriesId(value);
    }
  };

  const onChangeCheckbox = (e, type) => {
    if (type === 'video-trailer') {
      props.setCheckVideoTrailer(e.target.checked);
    } else if (type === 'image') {
      props.setCheckImageFilm(e.target.checked);
    } else {
      props.setCheckVideoFilm(e.target.checked);
    }
  };

  return (
    <>
      {contextHolder}
      {dataRecord &&
        (type === 'movies' ||
          type === 'series' ||
          type === 'film-for-series') && (
          <DivCheckUpdate>
            {type !== 'film-for-series' && (
              <>
                <Checkbox
                  checked={props.checkImageFilm}
                  onChange={(e) => onChangeCheckbox(e, 'image')}>
                  Hình ảnh phim
                </Checkbox>
                <Checkbox
                  checked={props.checkVideoTrailer}
                  onChange={(e) => onChangeCheckbox(e, 'video-trailer')}>
                  Đoạn giới thiệu phim
                </Checkbox>
              </>
            )}
            {type !== 'series' && (
              <Checkbox
                checked={props.checkVideoFilm}
                onChange={(e) => onChangeCheckbox(e, 'video')}>
                Video phim
              </Checkbox>
            )}
          </DivCheckUpdate>
        )}
      {
        <Form
          form={props.form}
          name={type + 'Form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          {type !== 'film-for-series' && (
            <ItemForm
              label={
                type === 'movies' || type === 'series'
                  ? 'Tên phim'
                  : type === 'Tên thể loại'
              }
              name={(type === 'category' && 'name') || 'title'}
              message={`Vui lòng nhập nội dung!`}
              input={<Input />}
            />
          )}

          {(type === 'series' || type === 'movies') && (
            <>
              <ItemForm
                label="Mô tả phim"
                name="description"
                message="Vui lòng nhập mô tả của bạn!"
                input={<Input />}
              />

              {dataRecord ? (
                props.checkImageFilm && (
                  <ItemForm
                    label={`Hình ảnh phim`}
                    name="imageUrl"
                    message="Vui lòng chọn hình ảnh phim!"
                    input={
                      <Upload
                        maxCount={1}
                        beforeUpload={(file) => {
                          if (
                            file.type !== 'image/jpeg' &&
                            file.type !== 'image/jpg' &&
                            file.type !== 'image/png'
                          ) {
                            return Upload.LIST_IGNORE;
                          }
                          return false;
                        }}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    }
                  />
                )
              ) : (
                <ItemForm
                  label={`Hình ảnh phim`}
                  name="imageUrl"
                  message="Vui lòng chọn hình ảnh phim!"
                  input={
                    <Upload
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (
                          file.type !== 'image/jpeg' &&
                          file.type !== 'image/jpg' &&
                          file.type !== 'image/png'
                        ) {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )}

              {dataRecord ? (
                props.checkVideoTrailer && (
                  <ItemForm
                    label={`Video giới thiệu phim`}
                    name="videoTrailerUrl"
                    message="Vui lòng chọn video giới thiệu phim!"
                    input={
                      <Upload
                        showUploadList={true}
                        maxCount={1}
                        beforeUpload={(file) => {
                          if (file.type !== 'video/mp4') {
                            return Upload.LIST_IGNORE;
                          }
                          return false;
                        }}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    }
                  />
                )
              ) : (
                <ItemForm
                  label={`Video giới thiệu phim`}
                  name="videoTrailerUrl"
                  message="Vui lòng chọn video giới thiệu phim!"
                  input={
                    <Upload
                      showUploadList={true}
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (file.type !== 'video/mp4') {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )}
            </>
          )}

          {(type === 'movies' || type === 'film-for-series') &&
            (dataRecord ? (
              props.checkVideoFilm && (
                <ItemForm
                  label="Video phim"
                  name="videoUrl"
                  message="Vui lòng chọn video phim!"
                  input={
                    <Upload
                      showUploadList={true}
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (file.type !== 'video/mp4') {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )
            ) : (
              <ItemForm
                label="Video phim"
                name="videoUrl"
                message="Vui lòng chọn video phim!"
                input={
                  <Upload
                    showUploadList={true}
                    maxCount={1}
                    beforeUpload={(file) => {
                      if (file.type !== 'video/mp4') {
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                }
              />
            ))}

          {type === 'film-for-series' && (
            <>
              <ItemForm
                label="Tập phim (Số)"
                name="filmSerialNumber"
                message="Vui lòng nhập số cho tập phim!"
                input={<InputNumber min={1} type="number" />}
              />
              <ItemForm
                label="Năm sản xuất"
                name="releaseDate"
                message="Vui lòng chọn năm sản xuất phim!"
                input={<DatePicker picker="year" />}
              />
              <ItemForm
                label={'Thuộc tập phim'}
                name="listSeries"
                message={`Vui lòng chọn phim chứa tập phim này!`}
                input={
                  <Select
                    showSearch
                    placeholder="Chọn 1 phim bộ"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={options}
                  />
                }
              />
            </>
          )}

          {(type === 'movies' || type === 'series') && (
            <>
              <ItemForm
                label="Năm sản xuất"
                name="releaseDate"
                message="Vui lòng chọn năm sản xuất!"
                input={<DatePicker picker="year" />}
              />

              <ItemForm
                label="Đạo diễn"
                name="director"
                message="Vui lòng nhập tên đạo diễn!"
                input={<Input />}
              />

              <ItemForm
                label="Diễn viên"
                name="cast"
                message="Vui lòng nhập tên các diễn viên (cách nhau dấu phẩy)!"
                initialValue={dataRecord !== undefined ? dataRecord.cast : ''}
                input={<Input />}
              />

              <ItemForm
                label="Quốc gia"
                name="country"
                message="Vui lòng chọn quốc gia!"
                input={
                  <Select
                    showSearch
                    mode="multiple"
                    onChange={(value) => {
                      props.setValueCountries(value);
                    }}
                    value={props.valueCountries}
                    placeholder={'Chọn quốc gia'}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.countriesData}
                  />
                }
              />

              <ItemForm
                label={'Thể loại phim'}
                name="listCategoryId"
                message={`Vui lòng chọn thể loại phim!`}
                input={
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Chọn thể loại phim"
                    options={props.options}
                  />
                }
              />

              <Form.Item
                label={'Gói phim không được phép truy cập (không được xem)'}
                name="listPackageIdBand"
                required={false}
                rules={[
                  {
                    required: false,
                    message: `Vui lòng chọn gói phim!`,
                  },
                ]}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Vui lòng chọn"
                  options={props.options2}
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
            className="add-film-button">
            <Button htmlType="submit">
              {dataRecord === undefined ? 'Thêm mới' : 'Cập nhật'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}

export default FormAddModal;
