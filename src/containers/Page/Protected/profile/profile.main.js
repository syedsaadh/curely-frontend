import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Form } from 'antd';
import { Divider, Input, Select, DOBInput, RadioGroup } from '../../../../components/ui-components';
import { FormComponentProps } from 'antd/lib/form/Form';

interface Props extends FormComponentProps {}
export class MyAccount extends Component<Props> {
  render() {
    const { getFieldDecorator, getFieldValue, setFields } = this.props.form;
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
                name="registration_number"
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
              <Button type="primary">Update</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const Wrapped = Form.create()(MyAccount);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => {};
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
