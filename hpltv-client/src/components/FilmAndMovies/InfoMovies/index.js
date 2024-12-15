import { Title, TextFilm, TagCategory } from './styles';

function InfoMovies({ data }) {
  return (
    <>
      <Title>{data?.film?.title}</Title>
      <TextFilm>
        Năm phát hành:&nbsp;
        {data?.film?.releaseDate}
      </TextFilm>
      <TextFilm>Đạo diễn: {data?.film?.director}</TextFilm>
      <TextFilm>Diễn viên: {data?.film?.cast}</TextFilm>
      <TextFilm>Thời lượng: {data?.film?.duration} phút</TextFilm>
      <TextFilm>
        <span>Đánh giá:&nbsp;</span>
        <span>
          {data?.film?.rating}/5 ({data?.film?.totalRating} đánh giá)
        </span>
      </TextFilm>
      <TextFilm>
        Quốc gia:{' '}
        {data?.film?.country.map((item, id) => {
          return <TagCategory key={id}>{item}</TagCategory>;
        })}
      </TextFilm>
      <TextFilm style={{ lineHeight: 2.3 }}>
        Thể loại:{' '}
        {data?.category?.map((item, id) => {
          return <TagCategory key={id}>{item}</TagCategory>;
        })}
      </TextFilm>
    </>
  );
}

export default InfoMovies;
