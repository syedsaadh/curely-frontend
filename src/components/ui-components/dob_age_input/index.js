// @flow
import React from 'react';
import { Input, InputNumber, Form } from 'antd';
import DOBInput from './dob_input';
import { Moment } from 'moment';

const FormItem = Form.Item;
type Props = {
  className: string,
  getFieldDecorator?: Function,
  size?: 'small' | 'middle' | 'large',
  setFields?: Function,
  active: 'dob' | 'age',
  defaultDOB: Moment,
};
type State = {
  dob: boolean,
};
class CustomInput extends React.Component<Props, State> {
  state = {
    dob: true,
    dobVal: null,
    ageVal: null
  };
  componentWillMount() {
    if (this.props.active === 'age') {
      this.setState({
        dob: false,
      });
    }
  }
  onToggle = () => {
    this.setState({ dob: !this.state.dob });
  };

  render() {
    const {
      getFieldDecorator, className, size, setFields, defaultDOB,
    } = this.props;

    const age =
      !getFieldDecorator ||
      getFieldDecorator('age', {
        rules: [
          {
            message: 'Age is Invalid',
            type: 'number',
            min: 0,
            max: 150,
          },
        ],
      })(<InputNumber placeholder="Age" size={size} className={className} />);

    const dob =
      !getFieldDecorator ||
      getFieldDecorator('dob', {
        rules: [
          {
            message: 'Date of Birth is Invalid',
            type: 'string',
            pattern: '[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}',
          },
        ],
      })(<DOBInput initialValue={defaultDOB} setFields={setFields} />);

    return (
      <div>
        <FormItem
          label={
            <span>
              <a onClick={this.onToggle}>DOB</a> Or <a onClick={this.onToggle}>Age</a>
            </span>
          }
        > 
          {this.state.dob ? dob : age}
        </FormItem>
      </div>
    );
  }
}
export default CustomInput;
