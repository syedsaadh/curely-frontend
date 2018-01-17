// @flow
import React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;
type Props = {
  name: string,
  className: string,
  type?: string,
  label: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  placeholder: string,
  size?: 'small' | 'middle' | 'large',
  rules: any,
  validatorMessage?: string,
  onPressEnter?: Function,
};

function CustomInput(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    type,
    disabled,
    className,
    placeholder,
    size,
    rules,
    validatorMessage,
    onPressEnter,
  } = props;
  const crules = [{ required, message: validatorMessage, ...rules }];
  return (
    <FormItem label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
        })(<Input
          size={size}
          placeholder={placeholder}
          className={className}
          type={type}
          disabled={disabled}
          onPressEnter={onPressEnter}
        />)}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  size: 'default',
  onPressEnter: null,
  required: false,
  type: 'text',
  getFieldDecorator: null,
  disabled: false,
  validatorMessage: 'This field is required',
};
export default CustomInput;
