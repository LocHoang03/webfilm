import React from 'react';
import { Form } from 'antd';

function InputItem(props) {
  return (
    <Form.Item
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

export default InputItem;
