import { DivLoading } from './styles';
import { LoadingOutlined } from '@ant-design/icons';

function LoadingComponent() {
  return (
    <DivLoading className="loading-container">
      <div>
        <LoadingOutlined />
      </div>
    </DivLoading>
  );
}

export default LoadingComponent;
