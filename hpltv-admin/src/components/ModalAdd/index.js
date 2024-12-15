import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import FormAddModal from '../FormAddModal';
import FormModalContext from '../../contexts/FormModalContext';
import FormAddPackage from '../FormAddPackage';
import {
  fetchCategory,
  fetchPackage,
  fetchSubscriber,
} from '../../utils/fetchData';
import { countries } from '../../assets/country';
import FormAddQuestion from '../FormAddQuestion';
import FormResolveQuestion from '../FormResolveQuestion';
import FormAddUser from '../FormAddUser';

function ModalAdd(props) {
  const { type, dataRecord } = useContext(FormModalContext);
  const [valueCountries, setValueCountries] = useState();
  const [countriesData, setCountriesData] = useState(false);
  const [checkVideoTrailer, setCheckVideoTrailer] = useState(false);
  const [checkImageFilm, setCheckImageFilm] = useState(false);
  const [checkVideoFilm, setCheckVideoFilm] = useState(false);
  const [options, setOptions] = useState(undefined);
  const [options2, setOptions2] = useState(undefined);

  const [form] = Form.useForm();
  useEffect(() => {
    setCheckVideoTrailer(false);
    setCheckImageFilm(false);
    setCheckVideoFilm(false);
  }, [dataRecord]);

  useEffect(() => {
    const currentYear = new Date().getFullYear().toString();
    if (type === 'movies' || type === 'series' || type === 'film-for-series') {
      form.setFieldsValue({
        releaseDate:
          dataRecord !== undefined && dataRecord.releaseDate
            ? dayjs(dataRecord.releaseDate.toString(), 'YYYY')
            : dayjs(currentYear, 'YYYY'),
      });
    }
    switch (type) {
      case 'series':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
            director: dataRecord.director,
            cast: dataRecord.cast,
            country: dataRecord.country,
            listCategoryId: dataRecord.listCategoryId,
            listPackageIdBand: dataRecord.listPackageIdBand,
          });
        }
        break;
      case 'movies':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
            director: dataRecord.director,
            cast: dataRecord.cast,
            country: dataRecord.country,
            listCategoryId: dataRecord.listCategoryId,
            listPackageIdBand: dataRecord.listPackageIdBand,
          });
        }
        break;
      case 'category':
        if (dataRecord && dataRecord.name) {
          form.setFieldsValue({ name: dataRecord.name });
        }
        break;
      case 'film-for-series':
        if (dataRecord) {
          form.setFieldsValue({
            filmSerialNumber: dataRecord.filmSerialNumber,
            listSeries: dataRecord.seriesId._id || dataRecord.seriesId,
          });
        }
        break;
      case 'subscription-price':
        if (dataRecord) {
          form.setFieldsValue({
            typePack: dataRecord.typePack,
            monthlyPrice: dataRecord.monthlyPrice,
            qualityPicture: dataRecord.qualityPicture,
            resolution: dataRecord.resolution,
            deviceSupport: dataRecord.deviceSupport,
            quantityWatch: dataRecord.quantityWatch,
            quantityDownload: dataRecord.quantityDownload,
          });
        }
        break;
      case 'common-questions':
        if (dataRecord) {
          form.setFieldsValue({
            title: dataRecord.title,
            description: dataRecord.description,
          });
        }
        break;
      case 'user':
        if (dataRecord) {
          form.setFieldsValue({
            firstName: dataRecord.firstName,
            lastName: dataRecord.lastName,
            email: dataRecord.email,
            phoneNumber: dataRecord.phoneNumber,
            sex: dataRecord.sex,
            typeAccount: dataRecord.role,
          });
        }
        break;
      default:
        break;
    }

    if (type === 'series' || type === 'movies') {
      setCountriesData(countries.slice(1));
    }
  }, [dataRecord, type, props.isModal, form]);

  useEffect(() => {
    if (type === 'movies' || type === 'series') {
      fetchCategory(setOptions, setOptions2);
    } else if (type === 'payment') {
      fetchPackage(setOptions);
      fetchSubscriber(setOptions2);
    }
  }, [type]);

  const handleCancel = () => {
    props.setIsModal(false);
    props.setDataRecord(undefined);
    form.resetFields();
  };
  return (
    <Modal
      title={
        dataRecord === undefined
          ? `Thêm`
          : type !== 'customer-questions'
          ? 'Cập nhật'
          : 'Giải quyết'
      }
      open={props.isModal}
      onCancel={handleCancel}
      footer={null}>
      {type !== 'subscription-price' &&
      type !== 'payment' &&
      type !== 'common-questions' &&
      type !== 'customer-questions' &&
      type !== 'user' ? (
        <FormAddModal
          handleCancel={handleCancel}
          options={options}
          options2={options2}
          form={form}
          valueCountries={valueCountries}
          countriesData={countriesData}
          setValueCountries={setValueCountries}
          checkVideoTrailer={checkVideoTrailer}
          checkImageFilm={checkImageFilm}
          checkVideoFilm={checkVideoFilm}
          setCheckVideoTrailer={setCheckVideoTrailer}
          setCheckImageFilm={setCheckImageFilm}
          setCheckVideoFilm={setCheckVideoFilm}
        />
      ) : type !== 'common-questions' &&
        type !== 'customer-questions' &&
        type !== 'user' ? (
        <FormAddPackage
          handleCancel={handleCancel}
          form={form}
          options={options}
          options2={options2}
        />
      ) : type !== 'customer-questions' && type !== 'user' ? (
        <FormAddQuestion handleCancel={handleCancel} form={form} />
      ) : type !== 'user' ? (
        <FormResolveQuestion handleCancel={handleCancel} form={form} />
      ) : (
        <FormAddUser handleCancel={handleCancel} form={form} />
      )}
    </Modal>
  );
}

export default ModalAdd;
