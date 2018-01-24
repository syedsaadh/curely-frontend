import React from 'react';
import { Input } from 'antd';
import moment, { Moment } from 'moment';
import './style.less';

type Props = {
  dobValues: object,
  onChangeDOB: Function,
};
class DOBInput extends React.Component<Props> {
  state = {};

  onChange = (e) => {
    if (e.target.value.length === 2) {
      switch (e.target.name) {
        case 'dobDay': {
          this.monthInput.focus();
          break;
        }
        case 'dobMonth': {
          this.yearInput.focus();
          break;
        }
        default:
      }
    }
    this.props.onChangeDOB(e.target.name, e.target.value);
  };

  render() {
    const { dobValues } = this.props;
    const { dobDay, dobMonth, dobYear } = dobValues;
    return (
      <div className="dob_input">
        <input
          ref={(input) => {
            this.dayInput = input;
          }}
          maxLength={2}
          value={dobDay}
          name="dobDay"
          placeholder="DD"
          onChange={this.onChange}
        />
        <span>/</span>
        <input
          ref={(input) => {
            this.monthInput = input;
          }}
          maxLength={2}
          value={dobMonth}
          name="dobMonth"
          placeholder="MM"
          onChange={this.onChange}
        />
        <span>/</span>
        <input
          ref={(input) => {
            this.yearInput = input;
          }}
          maxLength={4}
          value={dobYear}
          name="dobYear"
          placeholder="YYYY"
          onChange={this.onChange}
        />
        <Input hidden name="dob" />
      </div>
    );
  }
}

export default DOBInput;
