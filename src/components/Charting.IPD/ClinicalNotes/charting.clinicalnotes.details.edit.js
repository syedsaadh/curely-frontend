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
} from '../../../redux/IPD.Charting/actions';
import { fetchVisit } from '../../../redux/IPD.Admission/actions';

message.config({
  top: 50,
  duration: 2,
});
interface Props extends FormComponentProps {
  data: ClinicalNotes;
  visitId: Number;
  clinicalNotesId: Number;
}
class ClinicalNotesEdit extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    const { charts } = nextProps;
    const { doneAction } = charts;
    if (doneAction === 'update' || doneAction === 'delete') {
      message.success('Updated!');
      this.props.toggleDoneAction();
      this.props.fetchVisit(this.props.visitId);
      this.props.onCancel();
    }
  }

  onSave = () => {
    const { validateFields } = this.props.form;
    const { visitId, clinicalNotesId } = this.props;
    const Fields = ['IComplaints', 'IObservations', 'IDiagnoses', 'INotes'];
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const formdata = {};
        formdata.complaints = values.IComplaints ? [values.IComplaints] : [];
        formdata.observations = values.IObservations ? [values.IObservations] : [];
        formdata.notes = values.INotes ? [values.INotes] : [];
        formdata.diagnoses = values.IDiagnoses ? [values.IDiagnoses] : [];
        formdata.visitId = visitId;
        formdata.id = clinicalNotesId;
        this.props.updateClinicalNotes(formdata);
      }
    });
  };
  onDelete = () => {
    const { visitId } = this.props;
    this.props.deleteClinicalNotes(visitId);
  };
  render() {
    const { form, charts } = this.props;
    const { getFieldDecorator } = form;
    return (
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
          <div className="left">
            <Button onClick={this.onDelete}>Delete</Button>
          </div>
          <div className="right">
            <Button onClick={this.props.onCancel}>Cancel</Button>
            <Button loading={charts.isFetching} type="primary" onClick={this.onSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const Wrapped = Form.create({
  mapPropsToFields(props: Props) {
    const data = { ...props.data };
    const complaintStr = data.complaints_list.join(', ');
    const observationsStr = data.observations_list.join(', ');
    const diagnosesStr = data.diagnosis_list.join(', ');
    const notesStr = data.notes_list.join(', ');
    const fields = {};
    fields.IComplaints = Form.createFormField({ value: complaintStr });
    fields.IObservations = Form.createFormField({ value: observationsStr });
    fields.IDiagnoses = Form.createFormField({ value: diagnosesStr });
    fields.INotes = Form.createFormField({ value: notesStr });
    return fields;
  },
})(ClinicalNotesEdit);
const mapStateToProps = state => ({
  charts: state.IPDCharting,
});
const mapDispatchToProps = dispatch => ({
  updateClinicalNotes: data => dispatch(updateClinicalNotes(data)),
  fetchVisit: id => dispatch(fetchVisit(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deleteClinicalNotes: visitId => dispatch(deleteClinicalNotes(visitId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
