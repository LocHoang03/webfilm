import React, { useContext, useEffect, useState } from 'react';
import { ButtonAction, TagAction } from './styles';
import { Table, Space } from 'antd';
import ModalDetailAssets from '../ModalDetailAssets';
import { RoleContext } from '../../contexts/UserContext';

function TableAssets(props) {
  const [dataTable, setDataTable] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [asset, setAsset] = useState();

  const { userInfo } = useContext(RoleContext);

  const handleDetail = (record) => {
    setAsset(record);
    setIsModalDetail(true);
  };

  const handleRecover = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    if (props.type === 'trash-film-for-series') {
      props.setSeriesId(record.seriesId);
    }
    props.setTextModal('Bạn có chắc chắn muốn khôi phục dữ liệu này không?');
    props.setIsModalOpen(true);
  };

  const handleDelete = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    if (props.type === 'film-for-series') {
      props.setSeriesId(record.seriesId);
    }
    props.setTextModal('Bạn có chắc chắn muốn xóa dữ liệu này?');
    props.setIsModalOpen(true);
  };
  const handleDestroy = (record, type) => {
    props.setDataId(record._id);
    props.setTypeModal(type);
    if (props.type === 'trash-film-for-series') {
      props.setSeriesId(record.seriesId);
    }
    props.setTextModal('Bạn có chắc chắn muốn loại bỏ dữ liệu này không?');
    props.setIsModalOpen(true);
  };

  useEffect(() => {
    setDataTable(undefined);
    let dataSource = [
      {
        title: 'Hành động',
        key: 'action',
        onCell: () => ({
          style: { TextAlign: 'center' },
        }),
        render: (_, record) => (
          <Space size="large">
            <ButtonAction onClick={() => handleDetail(record)}>
              <TagAction color="processing">Chi tiết</TagAction>
            </ButtonAction>
            {props.type !== 'payment' && (
              <>
                {props.type !== 'trash-movies' &&
                props.type !== 'trash-series' &&
                props.type !== 'trash-film-for-series' ? (
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
                ) : (
                  <ButtonAction>
                    <TagAction
                      color="warning"
                      onClick={() => handleRecover(record, 'recover')}>
                      Khôi phục
                    </TagAction>
                  </ButtonAction>
                )}
                {props.type !== 'payment' &&
                  props.type !== 'subscription-price' &&
                  (props.type !== 'trash-movies' &&
                  props.type !== 'trash-series' &&
                  props.type !== 'trash-film-for-series' ? (
                    <ButtonAction
                      onClick={() => handleDelete(record, 'delete')}>
                      <TagAction color="error">Xóa</TagAction>
                    </ButtonAction>
                  ) : (
                    <ButtonAction
                      onClick={() => handleDestroy(record, 'destroy')}>
                      <TagAction color="error">Loại bỏ</TagAction>
                    </ButtonAction>
                  ))}
              </>
            )}
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
        <ModalDetailAssets
          isModalDetail={isModalDetail}
          setIsModalDetail={setIsModalDetail}
          asset={asset}
          type={props.type}
        />
      )}
    </>
  );
}

export default TableAssets;
