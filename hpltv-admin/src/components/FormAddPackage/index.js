import {
  Button,
  Form,
  Input,
  Select,
  notification,
  InputNumber,
  message,
} from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';
import {
  createCategory,
  updateCategory,
} from '../../redux/Action/Assets/category';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext } from 'react';
import { updatePackage } from '../../redux/Action/Package';
import { createPayment } from '../../redux/Action/Payment';

function FormAddPackage(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);
  const openNotification = (placement, message) => {
    notification.error({
      message: `Thông báo lỗi`,
      description: message,
      placement,
    });
  };

  const onFinish = async (values) => {
    let dataBody;
    switch (type) {
      case 'subscription-price':
        dataBody = {
          typePack: values.typePack,
          qualityPicture: values.qualityPicture,
          resolution: values.resolution,
          deviceSupport: values.deviceSupport,
          quantityWatch: values.quantityWatch,
          quantityDownload: values.quantityDownload,
        };
        break;
      case 'payment':
        dataBody = {
          userId: values.emailSubscriber,
          packageId: values.typePackage,
        };
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        switch (type) {
          case 'subscription-price':
            let dataPost = {
              Id: dataRecord._id,
              dataBody: dataBody,
            };
            dispatch(updatePackage(dataPost));
            props.handleCancel();
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'payment':
            dispatch(createPayment(dataBody));
            props.handleCancel();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {contextHolder}
      {
        <Form
          form={props.form}
          name={'Package form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          {type !== 'payment' ? (
            <>
              <ItemForm
                label="Loại gói"
                name="typePack"
                message="Vui lòng nhập tên loại gói!"
                input={<Input />}
              />

              <ItemForm
                label="Chất lượng hình ảnh"
                name="qualityPicture"
                message="Vui lòng nhập chất lượng hình ảnh!"
                input={<Input />}
              />

              <ItemForm
                label="Độ phân giải"
                name="resolution"
                message="Vui lòng nhập độ phân giải!"
                input={<Input />}
              />

              <ItemForm
                label="Thiết bị hỗ trợ"
                name="deviceSupport"
                message="Vui lòng nhập tên các thiết bị hỗ trợ!"
                input={<Input />}
              />
              <ItemForm
                label="Số lượng thiết bị cho phép"
                name="quantityWatch"
                message="Vui lòng nhập số lượng thiết bị cho phép!"
                input={<InputNumber />}
              />

              <ItemForm
                label="Số lượng tải xuống"
                name="quantityDownload"
                message="Vui lòng nhập số lượng thiết bị có thể tải xuống!"
                input={<InputNumber />}
              />
            </>
          ) : (
            <>
              <ItemForm
                label={'Email người đăng ký'}
                name="emailSubscriber"
                message={`Vui lòng nhập email người đăng ký!`}
                input={
                  <Select
                    showSearch
                    placeholder="Chọn 1 email người đăng ký"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.options2}
                  />
                }
              />
              <ItemForm
                label={'Loại gói đăng ký'}
                name="typePackage"
                message={`Vui lòng chọn loại gói đăng ký!`}
                input={
                  <Select
                    showSearch
                    placeholder="Chọn 1 gói đăng ký"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.options}
                  />
                }
              />
            </>
          )}
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
            className="add-film-button">
            <Button htmlType="submit">
              {dataRecord === undefined ? 'Thêm' : 'Cập nhật'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}

export default FormAddPackage;
