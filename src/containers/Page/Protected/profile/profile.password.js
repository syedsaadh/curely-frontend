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
            <div className="title">Change Password</div>
          </div>
          <div className="middle" />
          <div className="right" />
        </div>
        <Divider />
        <div className="pad-24">
          <Row type="flex" gutter={16}>
            <Col md={12}>
              <Input
                required
                type="password"
                horizontalLayout
                name="old_password"
                label="Old Password"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12} />
            <Col md={12}>
              <Input
                required
                type="password"
                horizontalLayout
                name="new_password"
                label="New Password"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col md={12} />
            <Col md={12}>
              <Input
                required
                type="password"
                horizontalLayout
                name="confirm_password"
                label="Confirm Password"
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={12}>
            <Col md={12}>
              <Button type="primary">Change Password</Button>
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
