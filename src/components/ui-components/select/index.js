// @flow
import React from 'react';
import { Form, Select } from 'antd';

const Option = Select.Option;
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
  placeholder?: string,
  defaultValue?: string,
  onSelect?: Function,
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
    placeholder,
    defaultValue,
    onSelect,
  } = props;
  const crules = [{ required, message: validatorMessage }];
  return (
    <FormItem label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue,
        })(<Select onSelect={onSelect} placeholder={placeholder} style={{ width: '100%' }}>
          {values.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
            ))}
           </Select>)}
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
