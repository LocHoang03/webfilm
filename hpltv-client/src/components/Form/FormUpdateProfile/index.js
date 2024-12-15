import { DivForm } from './styles';
import { Button, Form, Select, Input } from 'antd';
import InputItem from '../../Common/InputItem';
import validator from 'validator';
import { CheckLoginContext } from '../../../contexts/LoginContext';
import { useContext, useState } from 'react';
import LoadingComponent from '../../Common/LoadingComponent';
import { API_UPDATE_PROFILE, API_CHANGE_PASSWORD } from '../../../configs/apis';

function FormUpdateProfile(props) {
  const { updateUserInfo } = useContext(CheckLoginContext);
  const [loading, setLoading] = useState(false);

  // update info hoặc password
  const onFinish = async (values) => {
    if (props.type === 'edit') {
      if (!validator.isEmail(values.email)) {
        props.error('Định dạng email không chính xác!!');
        return;
      }
      if (!validator.isMobilePhone(values.phoneNumber)) {
        props.error('Định dạng số điện thoại không chính xác!!');
        return;
      }
      const response = await fetch(API_UPDATE_PROFILE, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setLoading(true);
        setTimeout(() => {
          props.success('Cập nhật hồ sơ thành công');
          updateUserInfo(json.token);
          setLoading(false);
        }, 1000);
      } else {
        props.error(json.message);
      }
    } else {
      const response = await fetch(API_CHANGE_PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setLoading(true);
        setTimeout(() => {
          props.success('Đổi mật khẩu thành công');
          updateUserInfo(json.token);
          setLoading(false);
        }, 1000);
      } else {
        props.error(json.message);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {};

  if (loading) {
    return (
      <DivForm>
        <LoadingComponent />
      </DivForm>
    );
  }

  return (
    <>
      <DivForm>
        {props.type === 'edit' ? (
          <Form
            form={props.form}
            name={'profileUpdateUser'}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              textAlign: 'center',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off">
            <InputItem
              label="Họ"
              name="lastName"
              message="Vui lòng nhập họ của bạn!"
              input={<Input />}
            />
            <InputItem
              label="Tên"
              name="firstName"
              message="Vui lòng nhập tên của bạn!"
              input={<Input />}
            />

            <InputItem
              label="E-mail"
              name="email"
              message="Vui lòng nhập email của bạn!"
              input={<Input />}
            />
            <InputItem
              label="Số điện thoại"
              name="phoneNumber"
              message="Vui lòng nhập số điện thoại của bạn!"
              input={<Input />}
            />
            <InputItem
              label="Giới tính"
              name="sex"
              message="Vui lòng nhập giới tính của bạn!"
              input={
                <Select
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  allowClear
                  options={props.options}
                />
              }
            />
            <Form.Item
              wrapperCol={{
                span: 24,
              }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name={'profileChangePasswordUser'}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              textAlign: 'center',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off">
            <InputItem
              label="Mật khẩu hiện tại"
              name="currentPassword"
              message="Vui lòng nhập mật khẩu hiện tại của bạn!"
              input={<Input.Password />}
            />
            <InputItem
              label="Mật khẩu mới"
              name="newPassword"
              message="Vui lòng nhập mật khẩu mới của bạn!"
              input={<Input.Password />}
            />
            <InputItem
              label="Xác nhận mật khẩu mới"
              name="confirmNewPassword"
              message="Vui lòng nhập xác nhận mật khẩu mới của bạn!"
              input={<Input.Password />}
            />
            <Form.Item
              wrapperCol={{
                span: 24,
              }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </DivForm>
    </>
  );
}

export default FormUpdateProfile;
