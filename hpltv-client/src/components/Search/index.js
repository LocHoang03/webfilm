import {
  DivLook,
  FormLook,
  ButtonSearch,
  DivLookContainer,
  RowLook,
  ColLook,
} from './styles';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchComponent({ options, options1, options2, type }) {
  console.log(type);
  const [valueCategory, setValueCategory] = useState(null);
  const [valueCountry, setValueCountry] = useState(null);
  const [valueYear, setValueYear] = useState(null);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/search?result=${value}&category=${
        valueCategory !== null ? valueCategory : ''
      }&country=${valueCountry !== null ? valueCountry : ''}&year=${
        valueYear !== null ? valueYear : ''
      }`,
      {
        state: {
          type:
            type === undefined
              ? undefined
              : type === 'series'
              ? 'series'
              : 'movies',
        },
      },
    );
    setValue('');
    setValueCategory(null);
    setValueCountry(null);
    setValueYear(null);
  };
  return (
    <DivLookContainer className="container-search">
      <DivLook>
        <FormLook onSubmit={handleSearch}>
          <RowLook>
            <ColLook span={6} sm={6} xs={12}>
              <Input
                placeholder="Tìm kiếm tên phim"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </ColLook>
            <ColLook span={6} sm={6} xs={12}>
              <Select
                showSearch
                defaultValue=""
                placeholder="Chọn danh mục"
                allowClear
                value={valueCategory}
                onChange={setValueCategory}
                options={options}
              />
            </ColLook>
            <ColLook span={6} sm={6} xs={12}>
              <Select
                showSearch
                defaultValue=""
                placeholder="Chọn quốc gia"
                allowClear
                value={valueCountry}
                onChange={setValueCountry}
                options={options1}
              />
            </ColLook>
            <ColLook span={6} sm={6} xs={12}>
              <Select
                showSearch
                defaultValue=""
                placeholder="Chọn năm"
                allowClear
                value={valueYear}
                onChange={setValueYear}
                options={options2}
              />
            </ColLook>
          </RowLook>
          <div>
            <ButtonSearch type="submit">
              <SearchOutlined />
              Tìm kiếm
            </ButtonSearch>
          </div>
        </FormLook>
      </DivLook>
    </DivLookContainer>
  );
}

export default SearchComponent;
