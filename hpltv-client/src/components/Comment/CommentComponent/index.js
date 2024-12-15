import {
  DivComment,
  DivTitle,
  TitleComment,
  DivInput,
  ButtonSend,
} from './styles';
import { MessageOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState, useEffect, useContext } from 'react';
import {
  createComment,
  fetchAllComment,
} from '../../../redux/action/comment/comment';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListComment from '../ListComment';
import { CheckLoginContext } from '../../../contexts/LoginContext';
const { TextArea } = Input;

function CommentComponent(props) {
  const [value, setValue] = useState();
  const [dataComment, setDataComment] = useState();

  const { userInfo } = useContext(CheckLoginContext);

  const dispatch = useDispatch();

  const comment = useSelector((state) => state.commentSlice);
  const { filmId, seriesId } = useParams();

  useEffect(() => {
    Promise.all([dispatch(fetchAllComment())]);
  }, [dispatch]);

  //get all comment user
  useEffect(() => {
    if (comment) {
      let data = [];
      for (let item of comment.data) {
        if (item.moviesId === filmId || item.moviesId === seriesId) {
          data.push(item);
        }
      }
      setDataComment(data);
    }
  }, [comment, filmId, seriesId]);

  //  thực hiện binh fluan
  const handleSendComment = async () => {
    let type = window.location.pathname.startsWith('/film/watching-movies')
      ? 'Movies'
      : 'Series';
    if (!value) {
      return;
    }
    const data = {
      data: {
        userId: userInfo.userId,
        content: value,
        moviesId: props.type === 'movies' ? filmId : seriesId,
        type: type,
      },
      userInfo: userInfo,
    };
    await dispatch(createComment(data));

    setValue('');
  };

  return (
    <>
      <DivComment>
        <DivTitle>
          <TitleComment>
            Bình luận <MessageOutlined />
          </TitleComment>
        </DivTitle>
        <DivInput>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Hãy cùng thảo luận, vui lòng không spam, chia sẻ link kiếm tiền, không lành mạnh,... để tránh bị khóa tài khoản"
          />
          <ButtonSend onClick={handleSendComment}>Gửi</ButtonSend>
        </DivInput>
      </DivComment>
      <ListComment dataComment={dataComment} />
    </>
  );
}

export default CommentComponent;
