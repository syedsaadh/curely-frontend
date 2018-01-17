import React from 'react';
import { Input } from 'antd';
import moment, { Moment } from 'moment';
import './style.less';

type Props = {
  initialValue: Moment,
};
class DOBInput extends React.Component<Props> {
  state = {
    dob_day: '',
    dob_month: '',
    dob_year: '',
  };
  componentWillMount() {
    const { setFields } = this.props;
    const { initialValue } = this.props;
    if (initialValue && initialValue.isValid()) {
      this.setState({
        dob_day: initialValue.format('DD').toString(),
        dob_month: initialValue.format('MM').toString(),
        dob_year: initialValue.format('YYYY').toString(),
      });
      setFields({
        dob: { value: initialValue.format('DD/MM/YYYY') },
      });
    }
  }
  validate = () => {
    const { setFields } = this.props;
    const { dob_day, dob_month, dob_year } = this.state;
    const date = moment(`${dob_day}/${dob_month}/${dob_year}`, 'DD/MM/YYYY', true);
    const errors = date.isValid() ? null : [new Error('Date Of Birth is Invalid')];
    const value = date.isValid() ? date.format('DD/MM/YYYY').toString() : null;
    setFields({
      dob: { value, errors },
    });
  };
  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.validate(),
    );
  };
  render() {
    const { dob_day, dob_month, dob_year } = this.state;
    return (
      <div className="dob_input">
        <input value={dob_day} name="dob_day" placeholder="DD" onChange={this.onChange} />
        <span>/</span>
        <input value={dob_month} name="dob_month" placeholder="MM" onChange={this.onChange} />
        <span>/</span>
        <input value={dob_year} name="dob_year" placeholder="YYYY" onChange={this.onChange} />
        <Input hidden name="dob" />
      </div>
    );
  }
}

export default DOBInput;
