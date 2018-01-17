import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Modal, Input } from '../../components/ui-components';
import { addLabTest, toggleDoneAction, fetchAll } from '../../redux/LabTests/actions';
import { closeModal } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addLabTest: addLabTest;
  doneAction: string;
}

class LabTestModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }

  onSave = () => {
    const Fields = ['name', 'description'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addLabTest(values);
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
        title="Add Labs Test"
        onSave={this.onSave}
        height="150px"
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Input label="Description" name="description" getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(LabTestModal);

const mapStateToProps = (state) => {
  const { LabTests } = state;
  return {
    ...LabTests,
  };
};
const mapDispatchToProps = dispatch => ({
  addLabTest: data => dispatch(addLabTest(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
