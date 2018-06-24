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
  optionLabelProp?: string,
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
    optionLabelProp,
  } = props;
  const crules = [{ required, message: validatorMessage }];
  if (!getFieldDecorator) {
    return (
      <Select
        defaultValue={defaultValue}
        disabled={disabled}
        onSelect={onSelect}
        optionLabelProp={optionLabelProp}
        placeholder={placeholder}
        style={{ width: 'auto' }}
      >
        {values.map((item, index) => (
          <Option key={index} label={item.label} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }
  return (
    <FormItem label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue,
        })(<Select
          disabled={disabled}
          onSelect={onSelect}
          optionLabelProp={optionLabelProp}
          placeholder={placeholder}
          style={{ width: '100%' }}
        >
          {values.map((item, index) => (
            <Option key={index} label={item.label} value={item.value}>
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
  optionLabelProp: 'label',
  validatorMessage: 'This field is required',
};
export default CustomInput;
