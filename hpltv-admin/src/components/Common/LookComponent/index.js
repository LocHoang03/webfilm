import { Input, Select } from 'antd';
import { memo } from 'react';
import { DivLook, BtnLook } from './styles';

function LookInfo(props) {
  return (
    props.type !== 'film-for-series' &&
    props.type !== 'trash-film-for-series' &&
    (props.type !== 'user' &&
    props.type !== 'subscriber' &&
    props.type !== 'banned-subscriber' ? (
      <DivLook>
        {props.type === 'payment' && (
          <Input
            placeholder={'Tìm kiếm theo tên'}
            allowClear
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
          />
        )}
        <Input
          placeholder={
            props.type === 'category'
              ? 'Tìm kiếm theo tên danh mục'
              : props.type === 'movies' || props.type === 'trash-movies'
              ? 'Tìm kiếm theo tên phim'
              : props.type === 'series' || props.type === 'trash-series'
              ? 'Tìm kiếm theo tên phim'
              : props.type === 'payment'
              ? 'Tìm kiếm theo họ'
              : 'Tìm theo tên gói'
          }
          allowClear
          value={props.textLook}
          onChange={(e) => props.setTextLook(e.target.value)}
        />
        {props.type !== 'category' && props.type !== 'subscription-price' && (
          <Select
            showSearch
            defaultValue={'All'}
            value={
              props.valueCountries ? props.valueCountries : props.valuePackage
            }
            placeholder={
              props.type !== 'payment' && props.type !== 'subscription-price'
                ? 'Chọn một quốc gia'
                : 'Chọn một gói'
            }
            optionFilterProp="children"
            onChange={(value) => {
              if (
                props.type !== 'payment' &&
                props.type !== 'subscription-price'
              ) {
                props.setValueCountries(value);
              } else {
                props.setValuePackage(value);
              }
            }}
            filterOption={props.filterOption}
            options={
              props.dataCountries ? props.dataCountries : props.dataPayment
            }
          />
        )}
        <BtnLook
          onClick={() => props.onChangeLook()}
          className={props.type === 'payment' ? 'btn-180' : ''}>
          Tìm kiếm
        </BtnLook>
      </DivLook>
    ) : (
      <>
        <DivLook>
          <Input
            placeholder={'Tìm kiếm theo tên'}
            allowClear
            value={props.textFirstName}
            onChange={(e) => props.setTextFirstName(e.target.value)}
          />
          <Input
            placeholder={'Tìm kiếm theo họ'}
            allowClear
            value={props.textLastName}
            onChange={(e) => props.setTextLastName(e.target.value)}
          />
          <Select
            className="select-email"
            showSearch
            defaultValue={'All'}
            value={props.valueEmail}
            placeholder={'Chọn một email'}
            optionFilterProp="children"
            onChange={(value) => {
              props.setValueEmail(value);
            }}
            filterOption={props.filterOption}
            options={props?.dataEmail}
          />
          <Select
            defaultValue={'All'}
            value={props.valueGender}
            placeholder={'Chọn giới tính'}
            onChange={(value) => {
              props.setValueGender(value);
            }}
            options={[
              { label: 'Tất cả', value: 'All' },
              { label: 'Nam', value: 'Nam' },
              { label: 'Nữ', value: 'Nữ' },
            ]}
          />
          <BtnLook
            onClick={() => props.onChangeLook()}
            className={
              props.type === 'user' ||
              props.type === 'subscriber' ||
              props.type === 'banned-subscriber'
                ? 'btn-180'
                : ''
            }>
            Tìm kiếm
          </BtnLook>
        </DivLook>
      </>
    ))
  );
}

export default memo(LookInfo);
