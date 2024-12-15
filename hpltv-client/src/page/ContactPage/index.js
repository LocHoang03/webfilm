import {
  DivContact,
  DivBanner,
  BannerContact,
  DivContent,
  DivTitle,
  Title,
  Title1,
  RowContent,
  ColContent,
  DivForm,
  Container,
  TitleLeft,
  TitleRight,
  DivListQuestion,
  InfoQuestion,
  TitleQuestion,
  DescriptionQuestion,
  ListCenter,
  ItemCenter,
  TitleCenter,
} from './styles';
import contactImage from '../../assets/images/contact_us.jpg';
import { Button, Form, Input, message } from 'antd';
import InputItem from '../../components/Common/InputItem';
import TextArea from 'antd/es/input/TextArea';
import { useContext, useEffect, useState } from 'react';
import { API_FETCH_ALL_COMMON_QUESTIONS } from '../../configs/apis';
import { API_CREATE_QUESTION_CUSTOMER } from '../../configs/apis';
import { CheckLoginContext } from '../../contexts/LoginContext';
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

function ContactPage() {
  const [questions, setQuestions] = useState();
  const [openQuestions, setOpenQuestions] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const { userInfo } = useContext(CheckLoginContext);

  const [form] = Form.useForm();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  useEffect(() => {
    const fetchAllCommonQuestions = async () => {
      const response = await fetch(API_FETCH_ALL_COMMON_QUESTIONS);
      const responseJson = await response.json();
      setQuestions(responseJson.data);
    };
    fetchAllCommonQuestions();
  }, []);

  const handleOpenDescription = (id) => {
    setOpenQuestions((prev) => {
      if (prev === id) {
        return '';
      } else {
        return id;
      }
    });
  };

  const onFinish = async (values) => {
    const response = await fetch(API_CREATE_QUESTION_CUSTOMER, {
      method: 'POST',
      body: JSON.stringify({
        title: values.title,
        description: values.comment,
        userId: userInfo.userId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenUser'),
      },
    });
    const responseJson = await response.json();
    if (responseJson.success) {
      form.setFieldsValue({
        title: '',
        comment: '',
      });
      success(
        'Cảm ơn bạn đã phản hồi của bạn. Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi qua email trong thời gian sớm nhất.',
      );
    } else {
      error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau!!');
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <DivContact>
      <Helmet>
        <title>Contact</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      {contextHolder}
      <DivBanner>
        <BannerContact src={contactImage} />
      </DivBanner>
      <Container>
        <DivContent>
          <DivTitle>
            <Title>Liên hệ với chúng tôi</Title>
            <Title1>
              Bạn có câu hỏi nào không? Chúng tôi muốn nghe ý kiến ​​từ bạn
            </Title1>
          </DivTitle>
          <RowContent>
            <ColContent span={8} lg={8} md={12} sm={12} xs={24}>
              <div>
                <div>
                  <TitleLeft>Một số câu hỏi thường gặp</TitleLeft>
                  <DivListQuestion>
                    {questions &&
                      questions.map((item, id) => {
                        return (
                          <InfoQuestion key={id}>
                            <TitleQuestion
                              onClick={() => handleOpenDescription(item._id)}>
                              {item.title}
                            </TitleQuestion>
                            {openQuestions === item._id && (
                              <DescriptionQuestion>
                                {item.description}
                              </DescriptionQuestion>
                            )}
                          </InfoQuestion>
                        );
                      })}
                  </DivListQuestion>
                </div>
              </div>
            </ColContent>
            <ColContent span={8} lg={8} md={12} sm={12} xs={24}>
              <div>
                <div>
                  <TitleCenter>Thông tin liên hệ</TitleCenter>
                  <ListCenter>
                    <ItemCenter>
                      <div>
                        <PhoneOutlined />
                      </div>
                      <div>
                        <p>Điện thoại</p>
                        <p>
                          <a href="tel:+84967936728">0967936728</a>
                        </p>
                      </div>
                    </ItemCenter>
                    <ItemCenter>
                      <div>
                        <MailOutlined />
                      </div>
                      <div>
                        <p>Email</p>
                        <p>
                          <a href="mailto:hoangphuocloc.phurieng@gmail.com">
                            hoangphuocloc.phurieng@gmail.com
                          </a>
                        </p>
                      </div>
                    </ItemCenter>
                    <ItemCenter>
                      <div>
                        <EnvironmentOutlined />
                      </div>
                      <div>
                        <p>Địa chỉ</p>
                        <p>
                          <address>
                            00 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú,
                            Thành phố Hồ Chí Minh
                          </address>
                        </p>
                      </div>
                    </ItemCenter>
                  </ListCenter>
                </div>
              </div>
            </ColContent>
            <ColContent span={8} lg={8} md={12} sm={24} xs={24}>
              <div>
                <TitleRight>Đặt câu hỏi</TitleRight>
                <DivForm>
                  <Form
                    form={form}
                    name={'contactForm'}
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
                      label="Tiêu đề"
                      name="title"
                      message="Vui lòng nhập tiêu đề của bạn!"
                      input={<Input />}
                    />
                    <InputItem
                      label="Bình luận"
                      name="comment"
                      message="Hãy nhập câu hỏi của bạn!"
                      input={
                        <TextArea
                          maxLength={200}
                          // onChange={onChange}
                          placeholder="Nhập bình luận"
                          style={{
                            height: 100,
                            resize: 'none',
                          }}
                        />
                      }
                    />
                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}>
                      <Button type="primary" htmlType="submit">
                        GỬI TIN NHẮN
                      </Button>
                    </Form.Item>
                  </Form>
                </DivForm>
              </div>
            </ColContent>
          </RowContent>
        </DivContent>
      </Container>
    </DivContact>
  );
}

export default ContactPage;
