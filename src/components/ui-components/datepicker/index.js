// @flow
import React from 'react';
import { DatePicker, Form } from 'antd';
import { Moment } from 'moment';

const FormItem = Form.Item;
type Props = {
  name: string,
  label: string,
  required?: boolean,
  getFieldDecorator: Function,
  disabled?: boolean,
  defaultValue?: Moment,
  disabledDate?: any,
  format?: string,
};

function CustomDatePicker(props: Props) {
  const {
    required,
    getFieldDecorator,
    format,
    label,
    name,
    defaultValue,
    disabled,
    disabledDate,
  } = props;

  return (
    <FormItem label={label}>
      {getFieldDecorator(name, {
        initialValue: defaultValue,
        rules: [{ required, message: 'This field is Required' }],
      })(<DatePicker format={format} disabled={disabled} disabledDate={disabledDate} />)}
    </FormItem>
  );
}
CustomDatePicker.defaultProps = {
  required: false,
  disabled: false,
};
export default CustomDatePicker;
