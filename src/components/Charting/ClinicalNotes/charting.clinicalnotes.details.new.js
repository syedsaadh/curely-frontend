import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Input } from '../../ui-components';
import { ClinicalNotes } from '../_types';
import {
  updateClinicalNotes,
  toggleDoneAction,
  deleteClinicalNotes,
} from '../../../redux/Charting/actions';
import { fetch as fetchAppointment } from '../../../redux/Appointments/actions';

message.config({
  top: 50,
  duration: 2,
});
interface Props extends FormComponentProps {
  data: ClinicalNotes;
  appointmentId: Number;
  onCancel: Function;
}
class ClinicalNotesAdd extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    const { charts } = nextProps;
    const { doneAction } = charts;
    if (doneAction === 'update' || doneAction === 'delete') {
      message.success('Updated!');
      this.props.toggleDoneAction();
      this.props.fetchAppointment(this.props.appointmentId);
      this.props.onCancel();
    }
  }

  onSave = () => {
    const { validateFields } = this.props.form;
    const { appointmentId } = this.props;
    const Fields = ['IComplaints', 'IObservations', 'IDiagnoses', 'INotes'];
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const formdata = {};
        formdata.complaints = values.IComplaints ? [values.IComplaints] : [];
        formdata.observations = values.IObservations ? [values.IObservations] : [];
        formdata.notes = values.INotes ? [values.INotes] : [];
        formdata.diagnoses = values.IDiagnoses ? [values.IDiagnoses] : [];
        formdata.appointmentId = appointmentId;
        formdata.id = null;
        this.props.updateClinicalNotes(formdata);
      }
    });
  };
  onDelete = () => {
    const { appointmentId } = this.props;
    this.props.deleteClinicalNotes(appointmentId);
  };
  render() {
    const { form, charts } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="charting__item charting__item--clinical-notes-container">
        <div className="card-record-details card-record-details--clinical-notes">
          <div className="header">
            <div className="title">Clinical Notes</div>
          </div>
          <div className="body">
            <Row type="flex" className="fields fields--edit">
              <Col md={6}>Complaints</Col>
              <Col md={16}>
                <Input name="IComplaints" getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row>
            <Row type="flex" className="fields fields--edit">
              <Col md={6}>Observations</Col>
              <Col md={16}>
                <Input name="IObservations" getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row>
            <Row type="flex" className="fields fields--edit">
              <Col md={6}>Diagnoses</Col>
              <Col md={16}>
                <Input name="IDiagnoses" getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row>
            <Row type="flex" className="fields fields--edit">
              <Col md={6}>Notes</Col>
              <Col md={16}>
                <Input name="INotes" getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row>
          </div>
          <div className="footer">
            <div className="left" />
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
const Wrapped = Form.create()(ClinicalNotesAdd);
const mapStateToProps = state => ({
  charts: state.Charts,
});
const mapDispatchToProps = dispatch => ({
  updateClinicalNotes: data => dispatch(updateClinicalNotes(data)),
  fetchAppointment: id => dispatch(fetchAppointment(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deleteClinicalNotes: appointmentId => dispatch(deleteClinicalNotes(appointmentId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
