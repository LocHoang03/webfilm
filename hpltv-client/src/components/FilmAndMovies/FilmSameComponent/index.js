import {
  DivContent,
  DivTitle,
  TextTitle,
  DivContentFilm,
  ButtonSlick,
} from './styles';
import Film from '../FilmComponent/index';
import { useEffect, useState, useRef } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function FilmSameComponent(props) {
  const [films, setFilms] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [slide, setSlide] = useState(4);

  const refContent = useRef();

  useEffect(() => {
    if (props.listFilm) {
      let isExist = false;
      for (let item of props.listFilm) {
        if (item._id === props.filmId) {
          isExist = true;
          break;
        }
      }

      if (isExist) {
        const updatedFilms = props.listFilm.filter(
          (film) => film._id !== props.filmId,
        );
        setFilms(updatedFilms);
      } else {
        setFilms(props.listFilm);
      }
    }
  }, [props.listFilm, props.filmId]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    if (width > 1149) {
      setSlide(4);
    }
    if (width <= 1149 && width > 576) {
      setSlide(props.slide);
    }
    if (width < 576) {
      setSlide(2);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <DivContent>
      <DivTitle>
        <TextTitle>Bạn có thể muốn xem thử</TextTitle>
      </DivTitle>
      <DivContentFilm className="container-data-slider">
        <ButtonSlick
          onClick={() => refContent.current.prev()}
          className="btn-slider-left">
          <LeftOutlined />
        </ButtonSlick>
        <Carousel
          dots={false}
          autoplay={true}
          ref={refContent}
          slidesToShow={slide}>
          {films &&
            films.map((film, id) => {
              return (
                <Film
                  key={id}
                  title={film.title}
                  image={film.imageUrl.url}
                  idFilm={film._id}
                  type={props.type ? props.type : 'movies'}
                />
              );
            })}
        </Carousel>
        <ButtonSlick
          next="next"
          onClick={() => refContent.current.next()}
          className="btn-slider-right">
          <RightOutlined />
        </ButtonSlick>
      </DivContentFilm>
    </DivContent>
  );
}

export default FilmSameComponent;
