import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Modal, Input } from '../../components/ui-components';
import { addDepartment, toggleDoneAction, fetchAll } from '../../redux/Departments/actions';
import { closeModal } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addDepartment: addDepartment;
  doneAction: string;
}

class DepartmentModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }

  onSave = () => {
    const Fields = ['name', 'desc', 'bedCount'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addDepartment(values);
      }
    });
  };

  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Add Department"
        onSave={this.onSave}
        height="240px"
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Input label="Description" name="desc" required getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input
              label="Beds"
              type="number"
              name="bedCount"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(DepartmentModal);

const mapStateToProps = (state) => {
  const { Departments } = state;
  return {
    ...Departments,
  };
};
const mapDispatchToProps = dispatch => ({
  addDepartment: data => dispatch(addDepartment(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
