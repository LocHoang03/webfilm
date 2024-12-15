import React from 'react';
import { Form } from 'antd';

function ItemForm(props) {
  return (
    <Form.Item
      className="item-form-input"
      label={props.label}
      name={props.name}
      rules={[
        {
          required: true,
          message: `${props.message}`,
        },
      ]}>
      {props.input}
    </Form.Item>
  );
}

export default ItemForm;
