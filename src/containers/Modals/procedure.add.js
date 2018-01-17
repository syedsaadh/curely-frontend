import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { Modal, Input } from '../../components/ui-components';
import { addProcedure, toggleDoneAction, fetchAll } from '../../redux/Procedures/actions';
import { closeModal } from '../../redux/App/actions';

interface Props extends FormComponentProps {
  closeModal: closeModal;
  fetchAll: fetchAll;
  toggleDoneAction: toggleDoneAction;
  addProcedure: addProcedure;
  doneAction: string;
}

class ProcedureModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === 'add') {
      this.props.closeModal();
      this.props.toggleDoneAction();
      this.props.fetchAll();
    }
  }

  onSave = () => {
    const Fields = ['name', 'cost', 'instruction'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.addProcedure(values);
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
        height="240px"
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input label="Name" name="name" required getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={12}>
            <Input
              label="Cost (₹)"
              required
              type="number"
              name="cost"
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input label="Instruction" name="instruction" getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create()(ProcedureModal);

const mapStateToProps = (state) => {
  const { Procedures } = state;
  return {
    ...Procedures,
  };
};
const mapDispatchToProps = dispatch => ({
  addProcedure: data => dispatch(addProcedure(data)),
  closeModal: () => dispatch(closeModal()),
  fetchAll: () => dispatch(fetchAll()),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
