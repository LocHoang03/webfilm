import { useEffect, useState } from 'react';
import {
  DivListFilm,
  TitleList,
  ListFilm,
  Item,
  RowItem,
  ColItem,
  ImageItem,
  TextFilm,
  TextCountry,
} from './styles';
import { Link } from 'react-router-dom';

function FilmMost(props) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    if (props.film) {
      let isExist = false;
      for (let item of props.film) {
        if (item._id === props.filmId) {
          isExist = true;
          break;
        }
      }

      if (isExist) {
        const updatedFilms = props.film.filter(
          (film) => film._id !== props.filmId,
        );
        setFilms(updatedFilms);
      } else {
        setFilms(props.film.slice(0, 5));
      }
    }
  }, [props.film, props.filmId]);

  return (
    <DivListFilm>
      <TitleList>{props.title}</TitleList>
      <ListFilm>
        {films &&
          films.map((item, id) => {
            return (
              <Item key={id}>
                <RowItem>
                  <ColItem span={5} lg={5} md={3} sm={4} xs={5}>
                    <Link
                      to={
                        props.type === 'series'
                          ? '/series/' + item._id
                          : '/film/' + item._id
                      }>
                      <ImageItem src={item.imageUrl.url} alt={item.title} />
                    </Link>
                  </ColItem>
                  <ColItem span={19}>
                    <Link
                      to={
                        props.type === 'series'
                          ? '/series/' + item._id
                          : '/film/' + item._id
                      }>
                      <TextFilm>{item.title}</TextFilm>
                    </Link>
                    <TextCountry>
                      {item.country.join('-')}-{item.releaseDate}
                    </TextCountry>
                  </ColItem>
                </RowItem>
              </Item>
            );
          })}
      </ListFilm>
    </DivListFilm>
  );
}

export default FilmMost;
