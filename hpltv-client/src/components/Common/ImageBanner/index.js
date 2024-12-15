import { ImageLogo } from './styles';

function LogoImage(props) {
  return (
    <ImageLogo
      src={process.env.REACT_APP_IMAGE_BANNER}
      height={props.height}
      width={props.width}
    />
  );
}

export default LogoImage;
