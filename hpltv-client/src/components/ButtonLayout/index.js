import React from 'react';
import { ButtonLayout } from './styles';

function LayoutButton(props) {
  //  đi tới chi tiết phim
  const handleClickFilm = () => {
    props.handleWatching();
  };

  return <ButtonLayout onClick={handleClickFilm}>{props.text}</ButtonLayout>;
}

export default LayoutButton;
