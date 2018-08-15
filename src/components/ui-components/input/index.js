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
  suffix?: any,
  prefix?: any,
  onValueChange: Function,
  autoComplete?: boolean,
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
    suffix,
    prefix,
    autoComplete,
    onValueChange,
  } = props;
  let onValChange: Function = onValueChange;
  if (!onValChange) onValChange = () => {};
  const crules = [
    {
      required,
      message: validatorMessage,
    },
  ];
  if (rules) crules.push(rules);
  return (
    <FormItem label={label}>
      {getFieldDecorator ? (
        getFieldDecorator(name, {
          rules: crules,
        })(<Input
          size={size}
          placeholder={placeholder}
          className={className}
          type={type}
          disabled={disabled}
          onPressEnter={onPressEnter}
          suffix={suffix}
          prefix={prefix}
          autoComplete={autoComplete ? 'on' : 'off'}
          onChange={e => onValChange(e.target.value)}
        />)
      ) : (
        <Input
          size={size}
          placeholder={placeholder}
          className={className}
          type={type}
          disabled={disabled}
          onPressEnter={onPressEnter}
          suffix={suffix}
          prefix={prefix}
          autoComplete={autoComplete ? 'on' : 'off'}
          onChange={e => onValChange(e.target.value)}
        />
      )}
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
  suffix: null,
  prefix: null,
  autoComplete: true,
};
export default CustomInput;
