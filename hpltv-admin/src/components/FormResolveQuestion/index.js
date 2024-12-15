import { Button, Form, Input, message } from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';
import { Title, Description } from './styles';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext } from 'react';
import { resolveCustomerQuestions } from '../../redux/Action/Setting/customerQuestion';

function FormResolveQuestion(props) {
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã gửi trả lời thành công.',
      duration: 1.5,
    });
  };

  const onFinish = async (values) => {
    let dataBody;

    dataBody = {
      explanation: values.explanation,
      explainId: dataRecord._id,
    };
    success();
    props.handleCancel();
    setTimeout(async () => {
      await dispatch(resolveCustomerQuestions(dataBody));
    }, 1500);
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      {contextHolder}
      <Title>
        Tiêu đề câu hỏi khách hàng: {dataRecord && dataRecord.title}
      </Title>
      <Description>
        Câu hỏi chi tiết mô tả: {dataRecord && dataRecord.description}
      </Description>
      <Form
        form={props.form}
        name={'Explanation form'}
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
          label="Giải thích phản hồi"
          name="explanation"
          message="Vui lòng nhập lời giải thích phản hồi!"
          input={<Input />}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="add-film-button">
          <Button htmlType="submit">{'Gửi'}</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormResolveQuestion;
