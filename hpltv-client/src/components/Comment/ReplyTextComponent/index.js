import { DivInput, ButtonSend } from './styles';
import { Input } from 'antd';
import { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { createCommentReply } from '../../../redux/action/comment/comment';
import { useDispatch } from 'react-redux';
import { CheckLoginContext } from '../../../contexts/LoginContext';
const { TextArea } = Input;

function ReplyTextComponent(props) {
  const [text, setText] = useState();

  const { userInfo } = useContext(CheckLoginContext);

  const { filmId, seriesId } = useParams();
  const dispatch = useDispatch();

  const handleSendComment = async () => {
    if (text) {
      let type = window.location.pathname.startsWith('/film/watching-movies')
        ? 'Movies'
        : 'Series';
      const data = {
        data: {
          userId: userInfo.userId,
          content: text,
          moviesId: type === 'Movies' ? filmId : seriesId,
          parentCommentId: props.item._id,
          parentUserId: props.item.userId._id,
          rootCommentId: props.rootId,
          type: type,
        },
        userInfo: userInfo,
        parentUserId: props.item.userId,
      };
      await dispatch(createCommentReply(data));
      props.setOpen((prev) => ({
        ...prev,
        [props.item._id]: !prev[props.item._id],
      }));
    }
  };

  return (
    <DivInput>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Viết phản hồi"
      />
      <ButtonSend onClick={handleSendComment}>Gửi</ButtonSend>
    </DivInput>
  );
}

export default ReplyTextComponent;
