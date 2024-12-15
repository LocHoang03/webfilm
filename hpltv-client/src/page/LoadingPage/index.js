import { Spin } from 'antd';
import { Helmet } from 'react-helmet-async';

function LoadingPage() {
  return (
    <div className="loading-component">
      <Helmet>
        <title>Đang tải</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    </div>
  );
}

export default LoadingPage;
