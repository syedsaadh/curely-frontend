import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Form, message, Alert } from 'antd';
import { Divider, Input, Select, DOBInput, RadioGroup } from '../../../../components/ui-components';
import { FormComponentProps } from 'antd/lib/form/Form';
import { changePassword, toggleDoneAction, getProfile } from '../../../../redux/Profile/actions';

import { each } from 'lodash';
import moment from 'moment';

interface Props extends FormComponentProps {}
export class MyAccount extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'update') {
      this.props.toggleDoneAction();
      nextProps.form.resetFields();
      message.success('Updated!');
    }
  }
  onChangePassword = () => {
    const Fields = ['password', 'newPassword', 'confirmPassword'];
    this.props.form.validateFieldsAndScroll(Fields, {}, (err, values) => {
      if (!err) {
        const result = { ...values };
        this.props.changePassword(result);
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue, setFields } = this.props.form;
    const { Profile, loading, error } = this.props;
    const errors = error ? error.errors : [];
    const showError = errors.length > 0 ? errors.join(' | ') : null;
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
        {showError ? <Alert type="error" message="Error" description={showError} banner /> : null}
        <div className="pad-24">
          <Row type="flex" gutter={16}>
            <Col md={12}>
              <Input
                required
                type="password"
                horizontalLayout
                name="password"
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
                name="newPassword"
                rules={{
                  validator: (rule, value, callback) => {
                    const { getFieldValue, setFieldsValue } = this.props.form;
                    if (getFieldValue('confirmPassword') !== '') {
                      setFieldsValue({ confirmPassword: '' });
                    }
                    callback();
                  },
                }}
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
                name="confirmPassword"
                label="Confirm Password"
                rules={{
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    const errors = [];
                    if (value && value !== getFieldValue('newPassword')) {
                      errors.push(new Error("Two inputs don't match!"));
                      callback(errors);
                    }
                    callback();
                  },
                }}
                onPressEnter={this.onChangePassword}
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={12}>
            <Col md={12}>
              <Button loading={loading} onClick={this.onChangePassword} type="primary">
                Change Password
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const Wrapped = Form.create()(MyAccount);

const mapStateToProps = (state) => {
  const { Profile } = state;
  return {
    error: Profile.error,
    doneAction: Profile.doneAction,
    loading: Profile.isFetching,
    Profile: Profile.current,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  changePassword: data => dispatch(changePassword(data)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
