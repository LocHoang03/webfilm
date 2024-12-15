import React from 'react';
import { Form } from 'antd';

function ItemForm(props) {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={[
        {
          required: props.required ? props.required : true,
          message: `${props.message}`,
        },
      ]}>
      {props.input}
    </Form.Item>
  );
}

export default ItemForm;
