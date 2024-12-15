import { useNavigate } from 'react-router-dom';
import LayoutButton from '../../ButtonLayout';
import { DivFilm, ImageFilm, NameFilm } from './styles';

function Film(props) {
  const navigate = useNavigate();
  const handleWatching = () => {
    if (props.type === 'movies') {
      navigate('/film/' + props.idFilm);
    } else {
      navigate('/series/' + props.idFilm);
    }
  };

  return (
    <DivFilm>
      <ImageFilm src={props.image} alt={props.title} />
      <NameFilm>{props.title}</NameFilm>
      <LayoutButton
        text="Xem phim"
        handleWatching={handleWatching}
        idFilm={props.idFilm}
      />
    </DivFilm>
  );
}

export default Film;
