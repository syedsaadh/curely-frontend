import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Form, message } from 'antd';
import { Divider, Input, Select, DOBInput, RadioGroup } from '../../../../components/ui-components';
import { FormComponentProps } from 'antd/lib/form/Form';
import { updateProfile, toggleDoneAction, getProfile } from '../../../../redux/Profile/actions';
import { each } from 'lodash';
import moment from 'moment';

interface Props extends FormComponentProps {}
export class MyAccount extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'update') {
      this.props.toggleDoneAction();
      message.success('Updated!');
      this.props.getProfile();
    }
  }
  onUpdate = () => {
    const Fields = [
      'name',
      'email',
      'mobile',
      'registrationNumber',
      'bloodGroup',
      'dob',
      'gender',
      'streetAddress',
      'city',
      'pincode',
    ];
    this.props.form.validateFieldsAndScroll(Fields, {}, (err, values) => {
      if (!err) {
        const result = { ...values };
        each(result, (value, key) => (values[key] = !value ? null : value));
        result.dob = moment(values.dob, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
        this.props.updateProfile(result);
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue, setFields } = this.props.form;
    const { Profile, loading } = this.props;
    return (
      <div className="my-account-container">
        <div className="main-header">
          <div className="left">
            <div className="title">My Profile</div>
          </div>
          <div className="middle" />
          <div className="right" />
        </div>
        <Divider />
        <div className="pad-24">
          <Row type="flex" gutter={16}>
            <Col md={12}>
              <Input
                horizontalLayout
                disabled
                name="name"
                label="Name"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Input
                horizontalLayout
                disabled
                name="email"
                label="Email"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Input
                horizontalLayout
                disabled
                name="mobile"
                label="Mobile Number"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Input
                horizontalLayout
                name="registrationNumber"
                label="Registration Number"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Select
                horizontalLayout
                name="bloodGroup"
                label="Blood Group"
                getFieldDecorator={getFieldDecorator}
                values={[
                  { value: 'o+', label: 'O+' },
                  { value: 'o-', label: 'O-' },
                  { value: 'a+', label: 'A+' },
                  { value: 'a-', label: 'A-' },
                  { value: 'b+', label: 'B+' },
                  { value: 'b-', label: 'B-' },
                  { value: 'ab+', label: 'AB+' },
                  { value: 'ab-', label: 'AB-' },
                ]}
              />
            </Col>
            <Col md={12}>
              <DOBInput
                noAge
                horizontalLayout
                dobValue={getFieldValue('dob')}
                active="dob"
                setFields={setFields}
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <RadioGroup
                horizontalLayout
                name="gender"
                label="Gender"
                getFieldDecorator={getFieldDecorator}
                values={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={12}>
            <Col md={24}>
              <Input
                horizontalLayout
                labelCol={{ span: 5, style: { textAlign: 'left' } }}
                wrapperCol={{ span: 19 }}
                label="Street Address"
                name="streetAddress"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Input
                horizontalLayout
                label="City"
                name="city"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12}>
              <Input
                label="Pincode"
                horizontalLayout
                rules={Input.rules.pincode}
                name="pincode"
                validatorMessage="Pincode is Incorrect"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={12}>
            <Col md={12}>
              <Button onClick={this.onUpdate} loading={loading} type="primary">
                Update
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const Wrapped = Form.create({
  mapPropsToFields(props) {
    const { Profile } = props;
    if (!Profile) {
      return {};
    }
    const fields = {};
    fields.name = Profile.name;
    fields.email = Profile.email;
    fields.mobile = Profile.mobile;
    fields.registrationNumber = Profile.registration_number;
    fields.bloodGroup = Profile.blood_group;
    fields.dob = Profile.dob ? moment(Profile.dob): null;
    fields.gender = Profile.gender;
    fields.streetAddress = Profile.street_address;
    fields.city = Profile.city;
    fields.pincode = Profile.pincode;
    each(fields, (value, key) => {
      fields[key] = Form.createFormField({ value });
    });
    return fields;
  },
})(MyAccount);

const mapStateToProps = (state) => {
  const { Profile } = state;
  return {
    doneAction: Profile.doneAction,
    loading: Profile.isFetching,
    Profile: Profile.current,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  updateProfile: data => dispatch(updateProfile(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
