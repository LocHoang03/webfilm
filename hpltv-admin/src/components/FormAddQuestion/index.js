import { Button, Form, Input } from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';

import FormModalContext from '../../contexts/FormModalContext';
import { useContext } from 'react';
import {
  createCommonQuestions,
  updateCommonQuestions,
} from '../../redux/Action/Setting/commonQuestion';

function FormAddQuestion(props) {
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);

  const onFinish = async (values) => {
    let dataBody;
    switch (type) {
      case 'common-questions':
        dataBody = {
          title: values.title,
          description: values.description,
        };
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        switch (type) {
          case 'common-questions':
            let dataPost = {
              Id: dataRecord._id,
              dataBody: dataBody,
            };
            dispatch(updateCommonQuestions(dataPost));
            props.handleCancel();
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'common-questions':
            dispatch(createCommonQuestions(dataBody));
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

  return (
    <>
      {
        <Form
          form={props.form}
          name={'Question form'}
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
            label="Tiêu đề"
            name="title"
            message="Vui lòng nhập tiêu đề!"
            input={<Input />}
          />

          <ItemForm
            label="Mô tả chi tiết"
            name="description"
            message="Vui lòng nhập mô tả chi tiết!!"
            input={<Input />}
          />

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

export default FormAddQuestion;
