import { useContext, useEffect, useState } from 'react';
import {
  DivContainer,
  DivProfile,
  DivContent,
  RowContent,
  ColLeft,
  ColRight,
  DivImage,
  DivContentLeft,
  NameUser,
  DivNameUser,
  DivInfo,
  Text,
  DivContentRight,
  DivUpload,
} from './styles';
import LoadingComponent from '../../components/LoadingComponent';
import { Image, Upload, Button, Form, Tabs, notification, message } from 'antd';
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';
import FormUpdateProfile from '../../components/FormUpdateProfile';
import LoadingPage from '../LoadingPage';
import { RoleContext } from '../../contexts/UserContext';
import { API_CHANGE_AVATAR, API_DELETE_AVATAR } from '../../configs/apis';

function ProfilePage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const { userInfo, updateUserInfo } = useContext(RoleContext);

  const openNotification = (placement, message) => {
    notification.error({
      message: `Thông báo lỗi`,
      description: message,
      placement,
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
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

  const [form] = Form.useForm();
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

  const [items, setItems] = useState([
    {
      key: 'update',
      label: 'Cập nhật hồ sơ',
      children: (
        <FormUpdateProfile
          form={form}
          options={options}
          type="edit"
          error={error}
          success={success}
        />
      ),
    },
    {
      key: 'change',
      label: 'Thay đổi mật khẩu',
      children: (
        <FormUpdateProfile
          form={form}
          options={options}
          type="change"
          error={error}
          success={success}
        />
      ),
    },
  ]);
  // xu ly trc khi ra trang
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      form.setFieldsValue({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        sex: userInfo.sex,
      });
    }
  }, [userInfo, form]);

  const handleChangeAvatarUser = async (info) => {
    setLoading(true);
    if (
      info.file.type !== 'image/jpeg' &&
      info.file.type !== 'image/jpg' &&
      info.file.type !== 'image/png'
    ) {
      openNotification('top', 'Loại hình ảnh không hợp lệ!!');
      return;
    }

    const formData = new FormData();
    formData.append('imageAvatar', info.file);
    const response = await fetch(API_CHANGE_AVATAR, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const json = await response.json();
    if (json.success) {
      updateUserInfo(json.token);
      setLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (
      userInfo &&
      userInfo.avatarUser.imageId !== process.env.REACT_APP_IMAGE_ID_DEFAULT
    ) {
      setLoading(true);
      const data = {
        imageUser: userInfo.avatarUser,
      };
      const response = await fetch(API_DELETE_AVATAR, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.success) {
        updateUserInfo(json.token);
        setLoading(false);
      }
    } else {
      openNotification('topRight', 'Không thể xóa hình ảnh mặc định!!');
      return;
    }
  };

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <DivContainer>
      {contextHolder}
      <DivProfile>
        <DivContent>
          <RowContent>
            <ColLeft span={10}>
              <DivContentLeft>
                <DivNameUser>
                  <NameUser>
                    {user.lastName} {user.firstName}
                  </NameUser>
                </DivNameUser>
                {loading ? (
                  <DivImage className="content-mage">
                    <LoadingComponent />
                  </DivImage>
                ) : (
                  <DivImage className="content-mage">
                    <Image width={200} height={200} src={user.avatarUser.url} />
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={handleDeleteAvatar}
                    />
                  </DivImage>
                )}
                <DivUpload>
                  <Upload
                    showUploadList={false}
                    onChange={handleChangeAvatarUser}
                    beforeUpload={(file) => {
                      return false;
                    }}>
                    <Button icon={<CameraOutlined />}>Tải ảnh mới lên</Button>
                  </Upload>
                </DivUpload>
                <DivInfo>
                  <Text>Email: {user.email}</Text>
                  <Text>Số điện thoại: {user.phoneNumber}</Text>
                  <Text>Giới tính: {user.sex}</Text>
                </DivInfo>
              </DivContentLeft>
            </ColLeft>
            <ColRight span={14}>
              <DivContentRight>
                <Tabs defaultActiveKey="update" items={items} />
              </DivContentRight>
            </ColRight>
          </RowContent>
        </DivContent>
      </DivProfile>
    </DivContainer>
  );
}

export default ProfilePage;
