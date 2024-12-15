import { Pagination } from 'antd';

function PaginationComponent(props) {
  return (
    <Pagination
      current={props.page}
      total={props.count}
      showSizeChanger={false}
      showQuickJumper
      defaultPageSize={process.env.REACT_APP_SIZE_PAGE}
      onChange={props.handleOnChangePage}
    />
  );
}

export default PaginationComponent;
