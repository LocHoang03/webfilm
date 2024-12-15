import React, { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import { RoleContext } from '../../contexts/UserContext';
import ModalDetailQuestion from '../ModalDetailQuestion';

function TableAssetsSetting(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    setAsset(record);
    setIsModalDetail(true);
  };

  const handleDelete = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    props.setTextModal('Bạn có chắc chắn muốn xóa dữ liệu này?');
    props.setIsModalOpen(true);
  };

  useEffect(() => {
    setDataTable(undefined);
    let dataSource = [
      {
        title: 'Hành động',
        key: 'action',
        width: props.type === 'customer-questions' ? '10%' : '20%',
        onCell: () => ({
          style: { TextAlign: 'center' },
        }),
        render: (_, record) => (
          <Space size="large">
            <ButtonAction onClick={() => handleDetail(record)}>
              <TagAction color="processing">Chi tiết</TagAction>
            </ButtonAction>
            {
              <>
                {props.type === 'common-questions' && (
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
                {props.type === 'customer-questions' && (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => {
                        props.setDataRecord(record);
                        props.setIsModal(true);
                      }}>
                      Giải quyết
                    </TagAction>
                  </ButtonAction>
                )}
                {props.type === 'common-questions' && (
                  <ButtonAction onClick={() => handleDelete(record, 'delete')}>
                    <TagAction color="error">Xóa</TagAction>
                  </ButtonAction>
                )}
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
      if (props.data.length >= 0) {
        if (props.data.length >= 0) {
          let dataSource = [];
          for (let data of props.data) {
            dataSource.push(data);
          }
          setDataTable(dataSource);
        }
      }
    }
  }, [props.data, props.dataTable, userInfo, props, props.type]);

  return (
    <>
      {dataTable && (
        <Table
          columns={dataColumn}
          dataSource={dataTable !== undefined && dataTable}
          pagination={false}
        />
      )}
      {asset && (
        <ModalDetailQuestion
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssetsSetting;
