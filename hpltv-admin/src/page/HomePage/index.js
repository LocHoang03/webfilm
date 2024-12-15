import React, { useEffect, useState } from 'react';
import {
  DivTotal,
  RowSummary,
  DivInfo,
  DivIcon,
  DivContainer,
  ColSummary,
  RowSummaryToday,
  ColSummaryToday,
  RowContent,
  ColContent,
  DivSummaryToday,
  Title,
  DataToday,
  RowTableUser,
  ColTableUser,
  DivTable,
  DivSelectAndTitle,
  DivExport,
  DivSelectAndExport,
} from './styles';
import Chart from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';
import LoadingComponent from '../../components/LoadingComponent';
import {
  EuroCircleFilled,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Select, Table } from 'antd';
import {
  options,
  columns,
  columns2,
  optionsSelect,
  optionsPur,
} from '../../utils/dataTable';
import {
  fetchDataSubscriberToday,
  fetchDataSubscriberOrderToday,
  fetchDataRegisterCurrentYear,
  fetchDataSummaryRegister,
  fetchDataSummaryPurchases,
  fetchDataSummaryTotalAmountEachPackage,
} from '../../utils/fetchData';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { CSVLink } from 'react-csv';

function HomePage(props) {
  const [label, setLabel] = useState();
  const [dataset, setDataset] = useState();
  const [labelPur, setLabelPur] = useState();
  const [datasetPur, setDatasetPur] = useState();
  const [labelPack, setLabelPack] = useState();
  const [datasetPack, setDatasetPack] = useState();
  const [dataSummary, setDataSummary] = useState();
  const [subscriber, setSubscriber] = useState();
  const [data, setData] = useState();
  const [maxCount, setMaxCount] = useState();
  const [maxTotal, setMaxTotal] = useState();
  const [dataExportRegister, setDataExportRegister] = useState();
  const [dataExportPurchase, setDataExportPurchase] = useState();

  useEffect(() => {
    Promise.all([
      fetchDataSummaryRegister(
        setLabel,
        setDataset,
        'day',
        setDataExportRegister,
        setMaxCount,
      ),
      fetchDataSummaryPurchases(
        setLabelPur,
        setDatasetPur,
        'day',
        setDataExportPurchase,
        setMaxTotal,
      ),
      fetchDataRegisterCurrentYear(setDataSummary),
      fetchDataSubscriberToday(setSubscriber),
      fetchDataSubscriberOrderToday(setData),
      fetchDataSummaryTotalAmountEachPackage(setLabelPack, setDatasetPack),
    ]);
  }, []);

  useEffect(() => {
    const plugin = {
      id: 'customTextInside',
      afterDraw: (chart) => {
        if (chart.config.type !== 'doughnut') {
          return;
        }
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((element, index) => {
            const dataValue = dataset.data[index];
            const text = `${dataValue}`;

            const position = element.tooltipPosition();

            ctx.fillStyle = 'white';

            ctx.fillText(text, position.x, position.y);
          });
        });
      },
    };

    Chart.register(plugin);

    return () => {
      Chart.unregister(plugin);
    };
  }, []);

  const onchangeSelect = async (value, type) => {
    if (type === 'subscribers') {
      await fetchDataSummaryRegister(
        setLabel,
        setDataset,
        value,
        setDataExportRegister,
        setMaxCount,
      );
    } else {
      await fetchDataSummaryPurchases(
        setLabelPur,
        setDatasetPur,
        value,
        setDataExportPurchase,
        setMaxTotal,
      );
    }
  };

  if (
    !label ||
    !labelPur ||
    !dataset ||
    !datasetPur ||
    !dataSummary ||
    !subscriber ||
    !data ||
    !labelPack ||
    !datasetPack
  ) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <DivContainer>
      <RowSummary>
        <ColSummary span={6}>
          <div className="margin-left-0">
            <DivInfo>
              <h4>DOANH THU (HÀNG THÁNG)</h4>
              <label>
                {dataSummary.totalPurMonth.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{' '}
                VND
              </label>
            </DivInfo>
            <DivIcon>
              <EuroCircleFilled />
            </DivIcon>
          </div>
        </ColSummary>
        <ColSummary span={6}>
          <div>
            <DivInfo>
              <h4>DOANH THU (HÀNG NĂM)</h4>
              <label>
                {dataSummary.totalPur.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{' '}
                VND
              </label>
            </DivInfo>
            <DivIcon>
              <EuroCircleFilled />
            </DivIcon>
          </div>
        </ColSummary>
        <ColSummary span={6} user={true}>
          <div>
            <DivInfo>
              <h4>NGƯỜI ĐĂNG KÝ (HÀNG THÁNG)</h4>
              <label>{dataSummary.countResMonth}</label>
            </DivInfo>
            <DivIcon>
              <UserOutlined />
            </DivIcon>
          </div>
        </ColSummary>
        <ColSummary span={6} user={true}>
          <div className="margin-right-0">
            <DivInfo>
              <h4>NGƯỜI ĐĂNG KÝ (HÀNG NĂM)</h4>
              <label>{dataSummary.countRes}</label>
            </DivInfo>
            <DivIcon>
              <UserOutlined />
            </DivIcon>
          </div>
        </ColSummary>
      </RowSummary>
      <RowContent>
        <ColContent span={16}>
          <DivTotal>
            <div>
              <DivSelectAndTitle>
                <h3>Số lượng người đăng ký</h3>
                <DivSelectAndExport>
                  <Select
                    options={optionsSelect}
                    defaultValue="day"
                    style={{
                      width: 120,
                    }}
                    onChange={(value) => onchangeSelect(value, 'subscribers')}
                  />
                  <DivExport>
                    <CSVLink
                      data={dataExportRegister}
                      filename="Quantity-Register.csv">
                      <ExportOutlined />
                      Xuất dữ liệu
                    </CSVLink>
                  </DivExport>
                </DivSelectAndExport>
              </DivSelectAndTitle>
              {label && dataset && (
                <Bar
                  plugins={[ChartDataLabels]}
                  data={{
                    labels: label,
                    datasets: dataset,
                  }}
                  options={options(maxCount)}
                />
              )}
            </div>
          </DivTotal>
          <DivTotal>
            <div>
              <DivSelectAndTitle>
                <h3>Tổng số tiền doanh thu</h3>
                <DivSelectAndExport>
                  <Select
                    options={optionsSelect}
                    defaultValue="day"
                    style={{
                      width: 120,
                    }}
                    onChange={(value) => onchangeSelect(value, 'purchases')}
                  />
                  <DivExport>
                    <CSVLink
                      data={dataExportPurchase}
                      filename="Total-purchases.csv">
                      <ExportOutlined />
                      Xuất dữ liệu
                    </CSVLink>
                  </DivExport>
                </DivSelectAndExport>
              </DivSelectAndTitle>
              {labelPur && datasetPur && (
                <Bar
                  plugins={[ChartDataLabels]}
                  data={{
                    labels: labelPur,
                    datasets: datasetPur,
                  }}
                  options={optionsPur(maxTotal)}
                />
              )}
            </div>
          </DivTotal>
        </ColContent>
        <ColContent span={8}>
          <RowSummaryToday>
            <ColSummaryToday>
              <DivSummaryToday>
                <Title>Tổng số tiền doanh thu từng gói phim trong năm</Title>
                <DataToday>
                  <div>
                    <Doughnut
                      data={{
                        labels: labelPack,
                        datasets: datasetPack,
                      }}
                    />
                  </div>
                </DataToday>
              </DivSummaryToday>
            </ColSummaryToday>
          </RowSummaryToday>
        </ColContent>
      </RowContent>
      <RowTableUser>
        <ColTableUser span={12}>
          <DivTable>
            <h3>Danh sách người dùng đăng ký gần đây nhất</h3>
            <Table
              columns={columns}
              dataSource={subscriber}
              pagination={false}
            />
          </DivTable>
        </ColTableUser>
        <ColTableUser span={12}>
          <DivTable right={'right'}>
            <h3>Danh sách người đăng ký gói phim gần đây</h3>
            <Table columns={columns2} dataSource={data} pagination={false} />
          </DivTable>
        </ColTableUser>
      </RowTableUser>
    </DivContainer>
  );
}

export default HomePage;
