// @flow
import React from 'react';
import { Form, Radio } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
type raValue = {
  value: string,
  label: string,
};
type Props = {
  name: string,
  values: Array<raValue>,
  className: string,
  label: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  validatorMessage?: string,
};

function CustomInput(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    disabled,
    className,
    validatorMessage,
    values,
  } = props;
  const crules = [{ required, message: validatorMessage }];
  return (
    <FormItem label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
        })(<RadioGroup disabled={disabled}>
          {values.map((item, index) => (
            <Radio key={index} value={item.value}>
              {item.label}
            </Radio>
            ))}
           </RadioGroup>)}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  size: 'default',
  required: false,
  getFieldDecorator: null,
  disabled: false,
  validatorMessage: 'This field is required',
};
export default CustomInput;
