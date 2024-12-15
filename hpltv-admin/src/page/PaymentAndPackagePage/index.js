import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/UserContext';
import {
  DivPayment,
  DivAddDataPayment,
  DivAction,
  DivTable,
  DivPagination,
} from './styles';
import { Button } from 'antd';
import LookInfo from '../../components/Common/LookComponent';
import TableAssets from '../../components/TableAssets';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrder, fetchAllOrderLook } from '../../redux/Action/Payment';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationComponent from '../../components/Common/Pagination';
import LoadingComponent from '../../components/LoadingComponent';
import { tableDataPackage, tableDataPayment } from '../../utils/dataTable';
import {
  fetchAllPackage,
  fetchAllPackageLook,
} from '../../redux/Action/Package';
import FormModalContext from '../../contexts/FormModalContext';
import ModalAdd from '../../components/ModalAdd';
import { API_GET_DATA_PACKAGE } from '../../configs/apis';

function PaymentAndPackagePage(props) {
  const [dataPayment, setDataPayment] = useState();
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [textLook, setTextLook] = useState('');
  const [firstName, setFirstName] = useState('');
  const [valuePackage, setValuePackage] = useState('All');
  const [isModal, setIsModal] = useState(false);

  const { userInfo } = useContext(RoleContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const look = searchParams.get('look');
  const pageCurrent = searchParams.get('page');
  const firstNameCurrent = searchParams.get('firstName');
  const lastNameCurrent = searchParams.get('lastName');
  const packageCurrent = searchParams.get('package');
  const namePackage = searchParams.get('name');

  let data, loading, error, count;
  const payment = useSelector((state) => state.paymentSlice);
  const packageSlice = useSelector((state) => state.packageSlice);
  if (props.type === 'payment') {
    data = payment.data;
    loading = payment.loading;
    error = payment.error;
    count = payment.count;
  } else {
    data = packageSlice.data;
    loading = packageSlice.loading;
    error = packageSlice.error;
    count = packageSlice.count;
  }

  useEffect(() => {
    const fetchDataPayment = async () => {
      const response = await fetch(API_GET_DATA_PACKAGE);
      const dataJson = await response.json();
      let data = [{ label: 'Tất cả', value: 'all' }];
      for (let i = 0; i < dataJson.data.length; i++) {
        data.push({
          label: dataJson.data[i].typePack,
          value: dataJson.data[i]._id,
        });
      }
      setDataPayment(data);
    };
    fetchDataPayment();
  }, []);

  useEffect(() => {
    if (props.type === 'payment') {
      setDataTable(tableDataPayment);
    } else {
      setDataTable(tableDataPackage);
    }
    setIsLoading(true);
    if (pageCurrent) setPage(pageCurrent);
    else setPage(1);
  }, [props.type, userInfo, packageCurrent]);

  useEffect(() => {
    let pageNum = getPage();
    setTextLook('');
    setFirstName('');
    setValuePackage('All');
    if (!look) {
      if (props.type === 'payment') {
        Promise.all([dispatch(fetchAllOrder(pageNum))]);
      } else {
        Promise.all([dispatch(fetchAllPackage(pageNum))]);
      }
    } else {
      if (props.type === 'payment') {
        Promise.all([
          dispatch(
            fetchAllOrderLook({
              pageNum: pageNum,
              valuePackage: packageCurrent,
              firstName: firstNameCurrent,
              lastName: lastNameCurrent,
            }),
          ),
        ]);
      } else {
        Promise.all([
          dispatch(
            fetchAllPackageLook({
              pageNum: pageNum,
              textLook: namePackage,
            }),
          ),
        ]);
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [location.search, props.type, dispatch, page]);

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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

  const handleOnChangePage = (page, size) => {
    setPage(page);
    if (look) {
      if (props.type === 'payment') {
        navigate(
          '/' +
            props.type +
            '?look=true&page=' +
            page +
            '&firstName=' +
            firstNameCurrent +
            '&lastName=' +
            lastNameCurrent +
            '&package=' +
            packageCurrent,
        );
      } else {
        navigate(
          '/' + props.type + '?look=true&page=' + page + '&name=' + namePackage,
        );
      }
    } else navigate('/' + props.type + '?page=' + page);
  };

  const onChangeLook = () => {
    setPage(1);
    if (props.type === 'payment') {
      navigate(
        '/' +
          props.type +
          '?look=true&page=1&firstName=' +
          firstName +
          '&lastName=' +
          textLook +
          '&package=' +
          valuePackage,
      );
    } else {
      navigate('/' + props.type + '?look=true&page=1&name=' + textLook);
    }
  };
  const showModal = (type) => {
    setIsModal(true);
  };

  if (loading || !dataPayment) {
    return (
      <DivPayment>
        <LoadingComponent />
      </DivPayment>
    );
  }

  return (
    <DivPayment>
      <DivAddDataPayment>
        <FormModalContext.Provider
          value={{
            type: props.type,
            dataRecord: dataRecord,
          }}>
          <ModalAdd
            isModal={isModal}
            setIsModal={setIsModal}
            setDataRecord={setDataRecord}
          />
        </FormModalContext.Provider>
        <DivAction width={props.type !== 'payment' && true}>
          {props.type !== 'subscription-price' && (
            <div>
              <Button type="primary" onClick={showModal}>
                Thêm
              </Button>
            </div>
          )}

          <div>
            <LookInfo
              onChangeLook={onChangeLook}
              dataPayment={dataPayment}
              filterOption={filterOption}
              setValuePackage={setValuePackage}
              setTextLook={setTextLook}
              firstName={firstName}
              setFirstName={setFirstName}
              textLook={textLook}
              valuePackage={valuePackage}
              type={props.type}
            />
          </div>
        </DivAction>
      </DivAddDataPayment>
      <DivTable>
        <TableAssets
          data={data}
          dataTable={dataTable}
          type={props.type}
          setIsModal={setIsModal}
          setDataRecord={setDataRecord}
        />
      </DivTable>
      {data.length > 0 && (
        <DivPagination>
          <PaginationComponent
            count={count}
            page={page}
            handleOnChangePage={handleOnChangePage}
          />
        </DivPagination>
      )}
    </DivPayment>
  );
}

export default PaymentAndPackagePage;
