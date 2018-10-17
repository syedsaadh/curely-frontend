// @flow
import React from 'react';
import { InputNumber, Form } from 'antd';
import moment from 'moment';
import DOBInput from './dob_input';

const FormItem = Form.Item;
type Props = {
  className: string,
  getFieldDecorator: Function,
  size?: 'small' | 'middle' | 'large',
  setFields: Function,
  active: 'dob' | 'age',
  dobValue: moment.Moment,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any,
  noAge?: boolean,
};
type State = {
  dob: boolean,
  dobValues: {
    dobDay: string,
    dobMonth: string,
    dobYear: string,
  },
};
class CustomInput extends React.Component<Props, State> {
  state = {
    dob: true,
    dobValues: {
      dobDay: '',
      dobMonth: '',
      dobYear: '',
    },
  };
  componentWillMount() {
    const { dobValue } = this.props;
    if (this.props.active === 'age') {
      this.setState({
        dob: false,
      });
    }
    if (dobValue) this.setDobValues(dobValue);
  }
  componentWillReceiveProps(nextProps) {
    const { dobValue } = nextProps;

    if (dobValue && this.props.dobValue !== dobValue) {
      this.setDobValues(dobValue);
    }
  }
  onDOBChange = (name, val) => {
    const dobValues = { ...this.state.dobValues };
    dobValues[name] = val;
    this.setState(
      {
        dobValues,
      },
      () => this.validate(),
    );
  };
  onToggle = () => {
    this.setState({ dob: !this.state.dob });
  };
  setDobValues = (dobValue) => {
    this.setState({
      dobValues: {
        dobDay: dobValue.format('DD'),
        dobMonth: dobValue.format('MM'),
        dobYear: dobValue.format('YYYY'),
      },
    });
  };
  validate = () => {
    const { dobValues } = this.state;
    const { dobDay, dobMonth, dobYear } = dobValues;
    const date = moment(`${dobDay}/${dobMonth}/${dobYear}`, 'DD/MM/YYYY', true);
    const errors = date.isValid() ? null : [new Error('Date Of Birth is Invalid')];
    const value = date.isValid() ? date : null;
    this.props.setFields({
      dob: { value, touched: true, errors },
    });
  };
  render() {
    const {
      getFieldDecorator,
      className,
      size,
      horizontalLayout,
      labelCol,
      wrapperCol,
      noAge,
    } = this.props;
    const layout = horizontalLayout
      ? {
        labelCol: labelCol || { span: 10, style: { textAlign: 'left' } },
        wrapperCol: wrapperCol || { span: 14 },
      }
      : {};
    return (
      <div className="dob-age-input-wrapper">
        <FormItem
          {...layout}
          label={
            <span>
              <button className="text-btn" onClick={!noAge ? this.onToggle : null}>
                DOB
              </button>
              {!noAge ? (
                <span>
                  Or
                  <button className="text-btn" onClick={this.onToggle}>
                    Age
                  </button>
                </span>
              ) : null}
            </span>
          }
        >
          {this.state.dob
            ? getFieldDecorator('dob', {
                rules: [
                  {
                    message: 'Date of Birth is Invalid',
                    type: 'string',
                    transform: val => (val ? moment(val).format('DD/MM/YYYY') : val),
                    pattern: '[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}',
                  },
                ],
              })(<DOBInput dobValues={this.state.dobValues} onChangeDOB={this.onDOBChange} />)
            : getFieldDecorator('age', {
                rules: [
                  {
                    message: 'Age is Invalid',
                    type: 'number',
                    min: 0,
                    max: 150,
                  },
                ],
              })(<InputNumber
                style={{ width: '100%' }}
                placeholder="Age"
                size={size}
                className={className}
              />)}
        </FormItem>
      </div>
    );
  }
}
export default CustomInput;
