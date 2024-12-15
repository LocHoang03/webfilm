import {
  DivVideo,
  TitleVideo,
  DivAction,
  ButtonAction,
  DivServer,
  DivContentVideo,
  RatingAction,
  DivListEpisode,
  PlayerWrapper,
  LoadingContainer,
} from './styles';
import { Tag, Rate } from 'antd';
import { FacebookShareButton } from 'react-share';
import ReactPlayer from 'react-player/lazy';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function VideoActionMovies({
  data,
  isLike,
  handleClickLikeSeries,
  handleClickLikeMovies,
  handleRatingSeries,
  handleRatingMovies,
  isRating,
  dataValueUserRating,
  type,
  listDataSeries,
  number,
  seriesId,
}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleLike = () => {
    if (type === 'movies') {
      handleClickLikeMovies();
    } else {
      handleClickLikeSeries();
    }
  };
  const handleChangeEpisode = (episode) => {
    navigate('/watching-series/' + seriesId + '/' + episode);
  };
  return (
    <>
      <TitleVideo>{data?.film?.title || data?.seriesId?.title}</TitleVideo>

      <DivVideo>
        {' '}
        <video
          id="videoPlayer"
          src={data?.film?.videoUrl?.url || data?.videoUrl?.url}
          controls
          crossOrigin="anonymous"
          width="100%"
          onLoadedData={() => setLoading(false)}
          height="100%"></video>{' '}
      </DivVideo>
      <DivContentVideo>
        <DivAction>
          <ButtonAction onClick={() => handleLike()}>
            {isLike ? (
              <Tag color="#FFD700">Đã thích</Tag>
            ) : (
              <Tag color="#3b5999">Thích</Tag>
            )}
          </ButtonAction>
          <ButtonAction>
            <Tag color="#3b5999">
              <FacebookShareButton url="facebook.com" hashtag="#showhub">
                Chia sẻ
              </FacebookShareButton>
            </Tag>
          </ButtonAction>
          <RatingAction>
            <label>Đánh giá:</label>&nbsp;&nbsp;
            <div>
              <Rate
                disabled={isRating ? true : false}
                value={dataValueUserRating}
                allowHalf
                onChange={(value) => {
                  if (type === 'movies') {
                    handleRatingMovies(value);
                  } else {
                    handleRatingSeries(value);
                  }
                }}
              />
            </div>
          </RatingAction>
        </DivAction>
        <DivServer>
          <label>Vietsub #1</label>: &nbsp;
          <Tag color="#fbc50c">Full</Tag>
        </DivServer>
        {type === 'series' && (
          <DivListEpisode>
            <p>Danh sách tập: </p>
            <div>
              {listDataSeries &&
                listDataSeries.length &&
                listDataSeries.map((item, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => handleChangeEpisode(item.filmSerialNumber)}
                      className={
                        number.toString() ===
                          item.filmSerialNumber.toString() && 'episode-current'
                      }>
                      {item.filmSerialNumber}
                    </button>
                  );
                })}
            </div>
          </DivListEpisode>
        )}
      </DivContentVideo>
    </>
  );
}

export default VideoActionMovies;
