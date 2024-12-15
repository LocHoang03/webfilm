import { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import { RoleContext } from '../../contexts/UserContext';
import ModalDetailUser from '../ModalDetailUser';

function TableAssetsUser(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    setAsset(record);
    setIsModalDetail(true);
  };

  const handleDelete = (id) => {
    props.setTextModal('Bạn có chắc chắn muốn xóa tài khoản này?');
    props.setUserIdReset(id);
    props.setIsOptions(1);
    props.setIsModalOpen(true);
  };
  const handleUpdate = (record) => {
    props.setUserIdReset(record._id);
    props.setIsOptions(2);
    props.setTextModal(
      'Bạn có chắc chắn muốn đặt lại mật khẩu của tài khoản này không?',
    );
    props.setIsModalOpen(true);
  };

  const handleBanned = (record) => {
    props.setUserIdReset(record._id);
    props.setIsOptions(3);
    props.setTextModal('Bạn có chắc chắn muốn cấm tài khoản này?');
    props.setIsModalOpen(true);
  };
  const handleRecover = (record) => {
    props.setUserIdReset(record._id);
    props.setIsOptions(4);
    props.setTextModal('Bạn có chắc chắn muốn khôi phục tài khoản này không?');
    props.setIsModalOpen(true);
  };

  useEffect(() => {
    let dataSource = [
      {
        title: 'Hành động',
        key: 'action',
        width: userInfo.role === 'superAdmin' ? '30%' : '5%',
        onCell: () => ({
          style: { TextAlign: 'center' },
        }),
        render: (_, record) => (
          <Space
            size="large"
            className={props.type !== 'banned-subscriber' && 'row-gap-space'}>
            <ButtonAction onClick={() => handleDetail(record)}>
              <TagAction color="processing">Chi tiết</TagAction>
            </ButtonAction>
            {
              <>
                {props.type !== 'banned-subscriber' ? (
                  <>
                    {props.type === 'user' && (
                      <ButtonAction>
                        <TagAction
                          color="warning"
                          onClick={() => {
                            props.setDataRecord(record);
                            props.setIsModal(true);
                          }}>
                          Cập nhật
                        </TagAction>
                      </ButtonAction>
                    )}

                    <ButtonAction>
                      <TagAction
                        color="warning"
                        onClick={() => handleUpdate(record)}>
                        Đặt lại mật khẩu
                      </TagAction>
                    </ButtonAction>
                    {props.type !== 'user' && (
                      <ButtonAction>
                        <TagAction
                          color="error"
                          onClick={() => handleBanned(record)}>
                          Khóa
                        </TagAction>
                      </ButtonAction>
                    )}
                  </>
                ) : (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => handleRecover(record)}>
                      Khôi phục
                    </TagAction>
                  </ButtonAction>
                )}
                <ButtonAction onClick={() => handleDelete(record._id)}>
                  <TagAction color="error">Xóa</TagAction>
                </ButtonAction>
              </>
            }
          </Space>
        ),
      },
    ];

    if (props.dataTable) {
      Object.keys(props.dataTable).forEach((key) => {
        dataSource.unshift(props.dataTable[key]);
      });
      setDataColumn(dataSource);
      if (props.data.length > 0) {
        if (props.data.length > 0) {
          let dataSource = [];
          for (let data of props.data) {
            dataSource.push(data);
          }
          setDataTable(dataSource);
        }
      }
    }
  }, [props.data, props.dataTable]);

  return (
    <>
      <Table
        columns={dataColumn}
        dataSource={dataTable !== undefined && dataTable}
        pagination={false}
      />
      {asset && (
        <ModalDetailUser
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssetsUser;
