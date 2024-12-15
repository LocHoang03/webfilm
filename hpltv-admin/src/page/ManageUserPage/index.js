import { Button, Modal, Form, Input, message } from 'antd';
import {
  DivManage,
  DivAction,
  DivError,
  TextError,
  DivData,
  DivPagination,
  DivAddAndLook,
} from './styles';
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/UserContext';
import FormModalContext from '../../contexts/FormModalContext';
import ModalAdd from '../../components/ModalAdd';
import LoadingComponent from '../../components/LoadingComponent';
import TableAssetsUser from '../../components/TableAssetsUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  fetchAllUser,
  fetchAllUserLook,
  resetPasswordUser,
} from '../../redux/Action/Manage/user';
import {
  deleteSubscriber,
  fetchAllSubscriber,
  resetPasswordSubscriber,
  postBannedSubscriber,
  fetchAllSubscriberLook,
} from '../../redux/Action/Manage/subscriber';
import PaginationComponent from '../../components/Common/Pagination';
import {
  fetchAllSubscriberBanned,
  fetchAllSubscriberBannedLook,
  postRecoverSubscriber,
} from '../../redux/Action/Manage/bannedAccount';
import { useLocation, useNavigate } from 'react-router-dom';
import LookInfo from '../../components/Common/LookComponent';
import { API_GET_ALL_SUBSCRIBER, API_GET_ALL_USER } from '../../configs/apis';
import ItemForm from '../../components/Common/ItemFormAdd';

function ManageUserPage(props) {
  const { userInfo } = useContext(RoleContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [dataRecord, setDataRecord] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdReset, setUserIdReset] = useState();
  const [textModal, setTextModal] = useState();
  const [isOptions, setIsOptions] = useState(false);
  const [page, setPage] = useState(undefined);
  const [textFirstName, setTextFirstName] = useState('');
  const [textLastName, setTextLastName] = useState('');
  const [valueEmail, setValueEmail] = useState('All');
  const [valueGender, setValueGender] = useState('All');
  const [dataEmail, setDataEmail] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const look = searchParams.get('look');
  const pageCurrent = searchParams.get('page');
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const gender = searchParams.get('gender');

  const dispatch = useDispatch();
  let data, loading, error, count;
  const user = useSelector((state) => state.userSlice);
  const subscriber = useSelector((state) => state.subscriberSlice);
  const bannedSubscriber = useSelector((state) => state.subscriberBannedSlice);
  if (props.type === 'user') {
    data = user.data;
    loading = user.loading;
    error = user.error;
    count = user.count;
  }
  if (props.type === 'subscriber') {
    data = subscriber.data;
    loading = subscriber.loading;
    error = subscriber.error;
    count = subscriber.count;
  }
  if (props.type === 'banned-subscriber') {
    data = bannedSubscriber.data;
    loading = bannedSubscriber.loading;
    error = bannedSubscriber.error;
    count = bannedSubscriber.count;
  }
  console.log(data);
  useEffect(() => {
    const tableData = {
      title4: {
        title: 'Địa chỉ email',
        dataIndex: 'email',
        key: 'email',
        width: userInfo.role === 'superAdmin' ? '30%' : '25%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title3: {
        title: 'Giới tính',
        dataIndex: 'sex',
        key: 'sex',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        render: (text) => (text ? text : 'Chưa cập nhật'),
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title: {
        title: 'Tên',
        dataIndex: 'firstName',
        key: 'firstName',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
      title2: {
        title: 'Họ',
        dataIndex: 'lastName',
        key: 'lastName',
        width: userInfo.role === 'superAdmin' ? '20%' : '15%',
        onCell: () => ({
          style: { fontWeight: '500' },
        }),
      },
    };
    setDataTable(tableData);
    if (pageCurrent) setPage(pageCurrent);
    else setPage(1);
  }, [props.type, userInfo, pageCurrent]);

  // dropdown email
  useEffect(() => {
    const fetchEmail = async () => {
      const API_EMAIL =
        props.type === 'user'
          ? API_GET_ALL_USER
          : props.type === 'subscriber'
          ? API_GET_ALL_SUBSCRIBER + '?banned=false'
          : API_GET_ALL_SUBSCRIBER + '?banned=true';
      const response = await fetch(API_EMAIL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const data = await response.json();
      let arr = [{ label: 'Tất cả', value: 'All' }];
      for (let i = 0; i < data.data.length; i++) {
        arr.push({ label: data.data[i].email, value: data.data[i].email });
      }

      setDataEmail(arr);
    };
    fetchEmail();
  }, [props.type]);

  useEffect(() => {
    setIsLoading(true);
    let pageNum = getPage();

    setTextFirstName('');
    setTextLastName('');
    setValueEmail('All');
    setValueGender('All');

    if (!look) {
      if (props.type === 'user') {
        Promise.all([dispatch(fetchAllUser(pageNum))]);
      } else if (props.type === 'subscriber') {
        Promise.all([dispatch(fetchAllSubscriber(pageNum))]);
      } else if (props.type === 'banned-subscriber') {
        Promise.all([dispatch(fetchAllSubscriberBanned(pageNum))]);
      }
    } else {
      switch (props.type) {
        case 'user':
          Promise.all([
            dispatch(
              fetchAllUserLook({
                pageNum: pageNum,
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
              }),
            ),
          ]);
          break;
        case 'subscriber':
          Promise.all([
            dispatch(
              fetchAllSubscriberLook({
                pageNum: pageNum,
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
              }),
            ),
          ]);
          break;
        case 'banned-subscriber':
          Promise.all([
            dispatch(
              fetchAllSubscriberBannedLook({
                pageNum: pageNum,
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
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
    setIsLoading(false);
  }, [user, subscriber, bannedSubscriber]);

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

  const handleOk = async () => {
    const dataUpdate = {
      userId: userIdReset,
      type: props.type,
    };
    if (isOptions === 1) {
      if (props.type === 'user') {
        Promise.all([dispatch(deleteUser(dataUpdate))]);
      } else {
        Promise.all([dispatch(deleteSubscriber(dataUpdate))]);
      }
    } else if (isOptions === 2) {
      if (props.type === 'user') {
        Promise.all([dispatch(resetPasswordUser(dataUpdate))]);
      } else {
        Promise.all([dispatch(resetPasswordSubscriber(dataUpdate))]);
      }
    } else if (isOptions === 3) {
      Promise.all([dispatch(postBannedSubscriber(dataUpdate))]);
    } else {
      Promise.all([dispatch(postRecoverSubscriber(dataUpdate))]);
    }

    setUserIdReset();
    setIsModalOpen(false);

    if (data.length - 1 === 0 && page > 1) {
      setPage((prev) => prev - 1);
      if (look) {
        navigate(
          '/' +
            props.type +
            '?look=true&page=' +
            (page - 1) +
            '&firstName=' +
            firstName +
            '&lastName=' +
            lastName +
            '&email=' +
            email +
            '&gender=' +
            gender,
        );
      } else navigate('/' + props.type + '?page=' + (page - 1));
    }
  };
  const handleCancel = () => {
    setUserIdReset();
    setIsModalOpen(false);
  };

  const showModal = (type) => {
    setIsModal(true);
  };

  const handleOnChangePage = (page, size) => {
    setPage(page);
    if (look) {
      navigate(
        '/' +
          props.type +
          '?look=true&page=' +
          page +
          '&firstName=' +
          firstName +
          '&lastName=' +
          lastName +
          '&email=' +
          email +
          '&gender=' +
          gender,
      );
    } else navigate('/' + props.type + '?page=' + page);
  };

  const onChangeLook = () => {
    setPage(1);
    navigate(
      '/' +
        props.type +
        '?look=true&page=1&firstName=' +
        textFirstName +
        '&lastName=' +
        textLastName +
        '&email=' +
        valueEmail +
        '&gender=' +
        valueGender,
    );
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    const dataUpdate = {
      userId: userIdReset,
      type: props.type,
      lockReason: values.lockReason,
    };
    console.log(dataUpdate);
    try {
      Promise.all([dispatch(postBannedSubscriber(dataUpdate))]);
      setUserIdReset();
      setIsModalOpen(false);

      // if (data.length - 1 === 0 && page > 1) {
      //   setPage((prev) => prev - 1);
      //   if (look) {
      //     navigate(
      //       '/' +
      //         props.type +
      //         '?look=true&page=' +
      //         (page - 1) +
      //         '&firstName=' +
      //         firstName +
      //         '&lastName=' +
      //         lastName +
      //         '&email=' +
      //         email +
      //         '&gender=' +
      //         gender,
      //     );
      //   } else navigate('/' + props.type + '?page=' + (page - 1));
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  if (isLoading || loading) {
    return (
      <DivManage>
        <LoadingComponent />
      </DivManage>
    );
  }

  if (error) {
    return (
      <DivManage>
        <DivError>
          <TextError>Server đang gặp sự cố, vui lòng thử lại sau!!!</TextError>
        </DivError>
      </DivManage>
    );
  }

  return (
    <>
      <DivManage>
        <DivAddAndLook user={props.type === 'user' ? true : false}>
          {props.type === 'user' && (
            <DivAction>
              <Button type="primary" onClick={showModal}>
                Thêm mới
              </Button>
            </DivAction>
          )}
          <div>
            <LookInfo
              setValueGender={setValueGender}
              setTextFirstName={setTextFirstName}
              textFirstName={textFirstName}
              setTextLastName={setTextLastName}
              textLastName={textLastName}
              valueEmail={valueEmail}
              setValueEmail={setValueEmail}
              valueGender={valueGender}
              dataEmail={dataEmail}
              type={props.type}
              filterOption={filterOption}
              onChangeLook={onChangeLook}
            />
          </div>
        </DivAddAndLook>

        <FormModalContext.Provider
          value={{ type: props.type, dataRecord: dataRecord }}>
          <ModalAdd
            isModal={isModal}
            setIsModal={setIsModal}
            setDataRecord={setDataRecord}
            dataFilm={null}
            dataCategory={null}
          />
        </FormModalContext.Provider>

        {loading ? (
          <LoadingComponent />
        ) : (
          <DivData>
            <TableAssetsUser
              data={data}
              setDataRecord={setDataRecord}
              type={props.type}
              setIsModal={setIsModal}
              dataTable={dataTable}
              setUserIdReset={setUserIdReset}
              setIsModalOpen={setIsModalOpen}
              setTextModal={setTextModal}
              setIsOptions={setIsOptions}
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
        )}
      </DivManage>
      <Modal
        title={
          isOptions === 1
            ? 'Xóa'
            : isOptions === 2
            ? 'Đặt lại mật khẩu'
            : isOptions === 3
            ? 'Khóa'
            : 'Khôi phục'
        }
        open={isModalOpen}
        onOk={handleOk}
        footer={isOptions === 3 ? null : undefined}
        onCancel={handleCancel}>
        {isOptions !== 3 ? (
          <p>{textModal}</p>
        ) : (
          <Form
            name="lockReasonForm"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <ItemForm
              label="Lý do khóa"
              name="lockReason"
              message="Vui lòng nhập lý do khóa tài khoản!"
              input={<Input />}
            />

            <Form.Item
              className="button-form"
              style={{
                marginTop: '35px',
                marginBottom: '20px',
                backgroundColor: '#22c5d4',
                borderRadius: '20px',
              }}
              wrapperCol={{
                span: 24,
              }}>
              <Button htmlType="submit" style={{ color: 'white' }}>
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default ManageUserPage;
