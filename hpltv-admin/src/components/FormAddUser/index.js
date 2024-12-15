import { Button, Form, Input, Select, notification, message } from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';

import FormModalContext from '../../contexts/FormModalContext';
import { useContext, useState } from 'react';
import { createPayment } from '../../redux/Action/Payment';
import { createUser, updateUser } from '../../redux/Action/Manage/user';
import { API_POST_CREATE_USER, API_POST_UPDATE_USER } from '../../configs/apis';

function FormAddUser(props) {
  const [options, setOptions] = useState([
    {
      value: 'Nam',
      label: 'Nam',
    },
    {
      value: 'Nữ',
      label: 'Nữ',
    },
  ]);
  const [optionsAccount, setOptionsAccount] = useState([
    {
      label: 'Nhân viên chăm sóc khách hàng',
      value: 'adminCustom',
    },
    {
      label: 'Nhân viên quản lý phim',
      value: 'adminFilm',
    },
  ]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const success = (text) => {
    messageApi.open({
      type: 'success',
      content: text,
      duration: 2,
    });
  };
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
      duration: 2,
    });
  };

  const { dataRecord } = useContext(FormModalContext);

  const onFinish = async (values) => {
    let dataBody;
    dataBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      sex: values.sex,
      typeAccount: values.typeAccount,
    };

    try {
      if (dataRecord !== undefined) {
        const response = await fetch(
          API_POST_UPDATE_USER + '/' + dataRecord._id,
          {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          success('Cập nhật thành công.');
          dispatch(updateUser({ userId: dataRecord._id, data: dataBody }));
          props.handleCancel();
        } else {
          error(data.message);
          return;
        }
      } else {
        const response = await fetch(API_POST_CREATE_USER, {
          method: 'POST',
          body: JSON.stringify(dataBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        });
        const data = await response.json();
        if (data.success) {
          success('Tạo mới tài khoản nhân viên thành công.');
          dispatch(createUser(data.user));
          props.handleCancel();
        } else {
          error(data.message);
          return;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      {contextHolder}
      {
        <Form
          form={props.form}
          name={'User form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <>
            <ItemForm
              label={'Họ'}
              name="firstName"
              message={`Vui lòng nhập họ!`}
              input={<Input />}
            />
            <ItemForm
              label={'Tên'}
              name="lastName"
              message={`Vui lòng nhập tên!`}
              input={<Input />}
            />
            <ItemForm
              label={'Email'}
              name="email"
              message={`Vui lòng nhập email!`}
              input={<Input />}
            />
            <ItemForm
              label={'Số điện thoại'}
              name="phoneNumber"
              message={`Vui lòng nhập số điện thoại!`}
              input={<Input />}
            />
            <ItemForm
              label={'Giới tính'}
              name="sex"
              message={`Chọn giới tính!`}
              input={
                <Select
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  allowClear
                  options={options}
                />
              }
            />
            <ItemForm
              label={'Loại tài khoản'}
              name="typeAccount"
              message={`Chọn loại tài khoản!`}
              input={
                <Select
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  allowClear
                  options={optionsAccount}
                />
              }
            />
          </>
          <Form.Item
            wrapperCol={{
              span: 48,
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

export default FormAddUser;
