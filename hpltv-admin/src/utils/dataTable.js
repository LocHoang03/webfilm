export const options = (max) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.ceil(max * 10), // Đảm bảo max là số nguyên
        ticks: {
          stepSize: 5,
          callback: (value) => Math.round(value), // Làm tròn số
        },
      },
    },
  };
  return options;
};

export const optionsPur = (max) => {
  const optionsPur = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.ceil(max + 1000000), // Đảm bảo max là số nguyên
        ticks: {
          stepSize: 100000,
          callback: (value) => Math.round(value), // Làm tròn số
        },
      },
    },
  };
  return optionsPur;
};

// table
export const columns = [
  {
    title: 'Họ',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },

  {
    title: 'Địa chỉ email',
    dataIndex: 'email',
    key: 'email',
    width: '36%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  // {
  //   title: 'Phone Number',
  //   dataIndex: 'phoneNumber',
  //   key: 'phoneNumber',
  //   width: '20%',
  //   onCell: () => ({
  //     style: { fontWeight: '500' },
  //   }),
  // },
  {
    title: 'Giới tính',
    dataIndex: 'sex',
    key: 'sex',
    width: '10%',
    render: (text) => (text ? text : 'Chưa cập nhật'),
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const columns2 = [
  {
    title: 'Họ',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },

  {
    title: 'Loại gói',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Giá',
    dataIndex: 'monthlyPrice',
    key: 'price',
    width: '25%',
    render: (text) =>
      `${text.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} VND`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const optionsSelect = [
  {
    value: 'day',
    label: 'Ngày',
  },
  {
    value: 'month',
    label: 'Tháng',
  },
  {
    value: 'year',
    label: 'Năm',
  },
];

export const tableDataPayment = {
  title5: {
    title: 'Giá gói (hàng tháng)',
    dataIndex: 'monthlyPrice',
    key: 'monthlyPrice',
    width: '20%',
    render: (text) =>
      `${text.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} VND`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title4: {
    title: 'Loại gói',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '20%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title3: {
    title: 'Địa chỉ email',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },

  title: {
    title: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title2: {
    title: 'Họ',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableDataPackage = {
  title2: {
    title: 'Giá hàng tháng',
    dataIndex: 'monthlyPrice',
    key: 'monthlyPrice',
    width: '60%',
    render: (text) =>
      `${text.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} VND`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title: {
    title: 'Loại gói',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '20%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableCommonQuestions = {
  title: {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    width: '70%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableCustomerQuestions = {
  title4: {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '15%',
    render: (text) => (text ? text : 'Chưa cập nhật'),
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title3: {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '30%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },

  title: {
    title: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title2: {
    title: 'Họ',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};
