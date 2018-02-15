import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { startCase, find, each, toLower } from 'lodash';
import { Input } from '../../ui-components';
import { VitalSignField } from '../_types';
import {
  updateVitalSigns,
  toggleDoneAction,
  deleteVitalSigns,
} from '../../../redux/Charting/actions';
import { fetch as fetchAppointment } from '../../../redux/Appointments/actions';

message.config({
  top: 50,
  duration: 2,
});
interface Props extends FormComponentProps {
  data: Array<VitalSignField>;
  appointmentId: Number;
  vitalSignId: Number;
}
class VitalSignEdit extends React.Component<Props> {
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
    const { form, appointmentId, vitalSignId } = this.props;
    const { getFieldsValue } = form;
    const formdata = {};
    const vitalSigns: Array<VitalSignField> = [];
    formdata.appointmentId = appointmentId;
    each(getFieldsValue(), (value, key) => {
      if (value === '') return;
      vitalSigns.push({ name: key.substr(1), value });
    });
    formdata.vitalSigns = vitalSigns;
    formdata.vitalSignsId = vitalSignId;
    this.props.updateVitalSigns(formdata);
  };
  onDelete = () => {
    const { appointmentId } = this.props;
    this.props.deleteVitalSigns(appointmentId);
  };
  render() {
    const { vitalSigns, form, charts } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="card-record-details card-record-details--vital-signs">
        <div className="header">
          <div className="title">Vital Signs</div>
        </div>
        <div className="body">
          {vitalSigns.lists.map((item, index) => (
            <Row key={index} type="flex" className="fields fields--edit">
              <Col md={6}>
                {startCase(item.name)} {item.unit ? `(${item.unit})` : null}
              </Col>
              <Col md={8}>
                <Input name={`I${item.name}`} getFieldDecorator={getFieldDecorator} />
              </Col>
            </Row>
          ))}
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
    const vitalSigns = { ...props.vitalSigns };
    let vitalSignsNames = [];
    if (vitalSigns.lists.length > 0) {
      vitalSignsNames = vitalSigns.lists.map(item => item.name);
    }
    if (!data) {
      return {};
    }
    const fields = {};
    each(vitalSignsNames, (name) => {
      const found = find(data, o => toLower(o.name) === toLower(name));
      const val = found ? found.value : '';
      fields[`I${name}`] = Form.createFormField({ value: val });
    });
    return fields;
  },
})(VitalSignEdit);
const mapStateToProps = state => ({
  vitalSigns: state.VitalSigns,
  charts: state.Charts,
});
const mapDispatchToProps = dispatch => ({
  updateVitalSigns: data => dispatch(updateVitalSigns(data)),
  fetchAppointment: id => dispatch(fetchAppointment(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deleteVitalSigns: appointmentId => dispatch(deleteVitalSigns(appointmentId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
