import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Row, Col, Button, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { LabTestSearchInput } from '../../SearchBar';
import { Input, Divider, Space } from '../../ui-components';
import { LabTest } from '../_types';
import {
  updateLabOrders,
  toggleDoneAction,
  deleteLabOrders,
} from '../../../redux/Charting/actions';
import { fetch as fetchAppointment } from '../../../redux/Appointments/actions';

message.config({
  top: 50,
  duration: 2,
});

type labtestformdata = {
  lab_test_id: number,
  name: string,
  instruction: string,
  id: number,
  delete: boolean,
};
type FormData = {
  appointmentId: number,
  procedures: Array<labtestformdata>,
};
type State = {
  newdata: Array<labtestformdata>,
};
interface Props extends FormComponentProps {
  data: Array<LabTest>;
  appointmentId: Number;
}
class LabTestsNew extends React.Component<Props, State> {
  state = {
    newdata: [{
      name: null,
      id: null,
      lab_test_id: null,
      delete: 'true',
      instruction: '',
    }]
  }
  componentWillReceiveProps(nextProps: Props) {
    const { form } = nextProps;
    const { newdata } = this.state;
    const { charts } = nextProps;
    const { doneAction } = charts;
    if (doneAction === 'update' || doneAction === 'delete') {
      message.success('Updated!');
      this.props.toggleDoneAction();
      this.props.fetchAppointment(this.props.appointmentId);
      this.props.onCancel();
      return;
    }
    const notes = form.getFieldValue('Inotes');
    const deleted = form.getFieldValue('deleted');
    const changed = newdata.map((it, index) => {
      const item = { ...it };
      item.delete = deleted[index] === 'true';
      item.instruction = notes[index];
      return item;
    });
    this.setState({ newdata: changed });
  }
  onSave = () => {
    const { newdata } = this.state;
    const { validateFields } = this.props.form;
    const { appointmentId } = this.props;
    const Fields = ['Inotes', 'index'];
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const formdata: FormData = {};
        formdata.appointmentId = appointmentId;
        formdata.lab_tests = filter(
          newdata,
          o => o.id !== null || (o.id === null && o.delete === false),
        );
        this.props.updateLabOrders(formdata);
      }
    });
  };
  onDelete = () => {
    const { appointmentId } = this.props;
    this.props.deleteLabOrders(appointmentId);
  };
  onDeleteLabTest = (index) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    const deletedVals = getFieldValue('deleted');
    deletedVals[index] = 'true';
    setFieldsValue({
      deleted: deletedVals,
    });
  };
  onNewLabTestSelect = (val) => {
    const { newdata } = this.state;
    const { form } = this.props;
    const { setFieldsValue, getFieldValue } = form;
    const INotes = getFieldValue('Inotes');
    INotes[newdata.length] = '';
    newdata.push({
      lab_test_id: val.id,
      name: val.name,
      instruction: '',
      id: null,
      delete: false,
    });
    this.setState({ newdata }, () => {
      setFieldsValue({
        Inotes: INotes,
        ISearchLabTest: '',
      });
    });
  };
  renderList = () => {
    const { newdata } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    return newdata.map((item, index) => {
      const deleted = getFieldValue(`deleted[${index}]`);
      return (
        <Row
          style={{ display: deleted === 'true' ? 'none' : 'flex' }}
          key={`index${index}`}
          type="flex"
          align="middle"
          className="fields fields--edit fields--table-edit"
        >
          <Col md={12}>{item.name}</Col>
          <Col md={11}>
            <Input name={`Inotes[${index}]`} getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={1}>
            <div style={{ display: 'none' }}>
              <Input name={`deleted[${index}]`} getFieldDecorator={getFieldDecorator} />
            </div>
            <i
              onClick={() => this.onDeleteLabTest(index)}
              style={{ color: 'red', cursor: 'pointer' }}
              className="ion-close"
            />
          </Col>
        </Row>
      );
    });
  };
  render() {
    const { charts, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="charting__item charting__item--treatment-plans-container">
        <div className="card-record-details card-record-details--treatment-plans">
          <div className="header">
            <div className="title">Lab Orders</div>
          </div>
          <div className="body">
            <Row type="flex" className="fields fields--edit">
              <Col md={12}>LAB TEST</Col>
              <Col md={11}>INSTRUCTION</Col>
            </Row>
            <Space h={4} />
            <Divider />
            {this.renderList()}
            <Divider />
            <Row type="flex" className="fields fields--edit">
              <Col md={8}>
                <LabTestSearchInput
                  placeholder="Enter Lab Test Name"
                  onSelect={this.onNewLabTestSelect}
                  name="ISearchLabTest"
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
            </Row>
          </div>
          <div className="footer">
            <div className="right">
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button loading={charts.isFetching} type="primary" onClick={this.onSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const Wrapped = Form.create({
  mapPropsToFields() {
    const fields = {};
    fields.index = [];
    fields.Inotes = [];
    fields.deleted = [];
    fields.index[0] = Form.createFormField({ value: 0 });

    fields.Inotes[0] = Form.createFormField({ value: '' });
    fields.deleted[0] = Form.createFormField({ value: 'true' });
    return fields;
  },
})(LabTestsNew);
const mapStateToProps = state => ({
  charts: state.Charts,
});
const mapDispatchToProps = dispatch => ({
  updateLabOrders: data => dispatch(updateLabOrders(data)),
  fetchAppointment: id => dispatch(fetchAppointment(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deleteLabOrders: appointmentId => dispatch(deleteLabOrders(appointmentId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
