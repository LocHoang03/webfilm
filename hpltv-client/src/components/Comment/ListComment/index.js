import { useEffect, useState } from 'react';
import { DivListComment, NoCommentTitle } from './styles';
import ReplyComment from '../ReplyCommentComponent';
import ListCommentComponent from '../ListCommentComponent';
import {
  deleteComment,
  updateComment,
} from '../../../redux/action/comment/comment';
import { useDispatch } from 'react-redux';
import LoadingComponent from '../../Common/LoadingComponent';

function ListComment({ dataComment }) {
  const [data, setData] = useState();
  const [dataReverse, setDataReverse] = useState();
  const [open, setOpen] = useState({});
  const [input, setInput] = useState({});

  const dispatch = useDispatch();

  //  lấy data comment từ cha
  useEffect(() => {
    if (dataComment) {
      const reversedData = [...dataComment].reverse();
      const newData = dataComment.slice(0);
      setData(newData);
      setDataReverse(reversedData);
    }
  }, [dataComment]);

  //  mở input để nhập trả lời bình luận
  const handleOpenReply = (commentId) => {
    if (commentId) {
      setOpen((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    }
  };

  //  edit or xóa comment
  const handleClickAction = (action, id) => {
    if (action === 'DELETE') {
      dispatch(deleteComment(id));
    } else {
      setInput((prev) => ({ ...prev, [id]: !prev[id] }));
      if (open[id]) {
        setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
      }
    }
  };

  // update comment
  const updateCommentClick = (value, id) => {
    if (!value) {
      return;
    }
    const data = {
      commentId: id,
      content: value,
    };
    dispatch(updateComment(data));
    setInput((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!dataComment) {
    return <LoadingComponent />;
  }

  return (
    <>
      {data && data.length > 0 ? (
        <DivListComment id="listComment">
          {data &&
            data.length &&
            data.map((item, id) => {
              if (!item.parentCommentId && !item.parentUserId) {
                console.log('item', id, item);
                return (
                  <>
                    <ListCommentComponent
                      key={id}
                      item={item}
                      open={open}
                      setOpen={setOpen}
                      handleOpenReply={handleOpenReply}
                      handleClickAction={handleClickAction}
                      input={input}
                      setInput={setInput}
                      updateCommentClick={updateCommentClick}
                    />

                    {dataReverse.map((itemChild, index) => {
                      if (
                        itemChild.rootCommentId &&
                        itemChild.rootCommentId === item._id
                      ) {
                        return (
                          <ReplyComment
                            key={index}
                            item={item}
                            itemChild={itemChild}
                            open={open}
                            setOpen={setOpen}
                            handleOpenReply={handleOpenReply}
                            handleClickAction={handleClickAction}
                            input={input}
                            setInput={setInput}
                            updateCommentClick={updateCommentClick}
                          />
                        );
                      }
                    })}
                  </>
                );
              }
            })}
        </DivListComment>
      ) : (
        <NoCommentTitle>Hãy là người đầu tiên bình luận!!</NoCommentTitle>
      )}
    </>
  );
}

export default ListComment;
