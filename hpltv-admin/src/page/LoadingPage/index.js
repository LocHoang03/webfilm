import { Spin } from 'antd';

function LoadingPage() {
  return (
    <div className="loading-component">
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    </div>
  );
}

export default LoadingPage;
