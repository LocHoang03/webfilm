import { useContext, useEffect, useRef, useState } from 'react';
import {
  DivSetting,
  DivAction,
  DivData,
  DivError,
  TextError,
  DivAddData,
  DivPagination,
} from './styles';
import { RoleContext } from '../../contexts/UserContext';
import { Button, Modal } from 'antd';
import PaginationComponent from '../../components/Common/Pagination';
import TableAssetsSetting from '../../components/TableAssetsSetting';
import LoadingComponent from '../../components/LoadingComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCommonQuestions,
  fetchAllCommonQuestions,
} from '../../redux/Action/Setting/commonQuestion';
import { fetchAllCustomerQuestions } from '../../redux/Action/Setting/customerQuestion';
import FormModalContext from '../../contexts/FormModalContext';
import ModalAdd from '../../components/ModalAdd';
import {
  tableCommonQuestions,
  tableCustomerQuestions,
} from '../../utils/dataTable';

function SettingPage(props) {
  const [isModal, setIsModal] = useState(false);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(undefined);
  const [typeModal, setTypeModal] = useState(false);
  const [textModal, setTextModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataId, setDataId] = useState();

  const { userInfo } = useContext(RoleContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { look, textSearch } = location.state || false;

  const dispatch = useDispatch();
  let data, loading, error, count;
  const commonQuestion = useSelector((state) => state.commonQuestionsSlice);
  const customerQuestion = useSelector((state) => state.customerQuestionsSlice);
  if (props.type === 'common-questions') {
    data = commonQuestion.data;
    loading = commonQuestion.loading;
    error = commonQuestion.error;
    count = commonQuestion.count;
  }
  if (props.type === 'customer-questions') {
    data = customerQuestion.data;
    loading = customerQuestion.loading;
    error = customerQuestion.error;
    count = customerQuestion.count;
  }

  useEffect(() => {
    if (props.type === 'common-questions') {
      setDataTable(tableCommonQuestions);
    } else {
      setDataTable(tableCustomerQuestions);
    }
    setPage(1);
  }, [props.type, userInfo]);

  useEffect(() => {
    let pageNum = getPage();

    //  phan trang
    if (look === undefined) {
      if (props.type === 'common-questions') {
        Promise.all([dispatch(fetchAllCommonQuestions(pageNum))]);
      } else if (props.type === 'customer-questions') {
        Promise.all([dispatch(fetchAllCustomerQuestions(pageNum))]);
      }
    } else {
      switch (props.type) {
        case 'common-questions':
          Promise.all([
            dispatch(
              fetchAllCommonQuestions({
                pageNum: 1,
                textLook: textSearch,
              }),
            ),
          ]);
          break;
        case 'customer-questions':
          Promise.all([
            dispatch(
              fetchAllCustomerQuestions({
                pageNum: 1,
                textLook: textSearch,
              }),
            ),
          ]);
          break;

        default:
          break;
      }
    }
  }, [location.search, props.type, dispatch, page]);

  const showModal = () => {
    setIsModal(true);
  };
  const handleOk = () => {
    let pageNum = getPage();
    if (props.type === 'common-questions') {
      dispatch(deleteCommonQuestions(dataId));
      Promise.all([dispatch(fetchAllCommonQuestions(pageNum))]);
    }
    setTypeModal(undefined);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // lay trang hien tai
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
    navigate('/' + props.type + '?page=' + page);
  };

  if (error) {
    return (
      <DivSetting>
        {loading ? (
          <LoadingComponent />
        ) : (
          <DivError>
            <TextError>
              Server đang gặp sự cố, vui lòng thử lại sau!!!
            </TextError>
          </DivError>
        )}
      </DivSetting>
    );
  }
  if (loading) {
    return (
      <DivSetting>
        <LoadingComponent />
      </DivSetting>
    );
  }
  return (
    <DivSetting>
      <DivAddData>
        <div>
          {(props.type === 'common-questions' ||
            props.type === 'customer-questions') && (
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
          )}
          {userInfo.role === 'superAdmin' &&
            props.type === 'common-questions' && (
              <DivAction>
                <Button type="primary" onClick={showModal}>
                  Thêm
                </Button>
              </DivAction>
            )}
        </div>
      </DivAddData>

      <Modal
        title={'Xóa dữ liệu'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>{textModal}</p>
      </Modal>

      <DivData>
        <TableAssetsSetting
          data={data}
          setDataRecord={setDataRecord}
          type={props.type}
          setIsModal={setIsModal}
          dataTable={dataTable}
          setDataId={setDataId}
          setIsModalOpen={setIsModalOpen}
          setTypeModal={setTypeModal}
          setTextModal={setTextModal}
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
      </DivData>
    </DivSetting>
  );
}

export default SettingPage;
