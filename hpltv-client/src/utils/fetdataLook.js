import { API_CATEGORY, API_GET_ALL_COUNTRY } from '../configs/apis';

const fetchDataLook = async (setOptions, setOptions1, setOptions2) => {
  const response = await fetch(API_CATEGORY);
  const data = await response.json();
  let arr = [];
  for (const item of data.data) {
    arr.push({ label: item.name, value: item._id });
  }
  setOptions(arr);
  const response1 = await fetch(API_GET_ALL_COUNTRY);
  const data1 = await response1.json();

  setOptions1(data1.data);

  const year = new Date().getFullYear();
  const intYear = parseInt(year);
  let arrayYear = [];
  for (let i = intYear; i > 1984; i--) {
    arrayYear.push({ label: i, value: i });
  }
  setOptions2(arrayYear);
};

export default fetchDataLook;
