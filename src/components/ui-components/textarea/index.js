// @flow
import React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;
type Props = {
  name: string,
  className: string,
  label: string,
  rows?: number,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  placeholder: string,
  rules: any,
  validatorMessage?: string,
  onPressEnter?: Function,
};

function CustomInput(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    rows,
    name,
    disabled,
    className,
    placeholder,
    rules,
    validatorMessage,
    onPressEnter,
  } = props;
  const crules = [
    {
      required,
      message: validatorMessage,
    },
  ];
  if (rules) crules.push(rules);
  return (
    <FormItem label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
        })(<Input.TextArea
          rows={rows}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          onPressEnter={onPressEnter}
        />)}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  rows: 2,
  onPressEnter: null,
  required: false,
  getFieldDecorator: null,
  disabled: false,
  validatorMessage: 'This field is required',
};
export default CustomInput;
