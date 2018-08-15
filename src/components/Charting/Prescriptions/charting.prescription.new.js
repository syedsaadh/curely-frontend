import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Row, Col, Button, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { DrugsSearchInput } from '../../SearchBar';
import { Input, Divider, Space, Select } from '../../ui-components';
import { Prescription } from '../_types';
import {
  updatePrescriptions,
  toggleDoneAction,
  deletePrescriptions,
} from '../../../redux/Charting/actions';
import { fetch as fetchAppointment } from '../../../redux/Appointments/actions';

message.config({
  top: 50,
  duration: 2,
});

type prescriptionformdata = {
  id: number | null,
  drug_id: number,
  drug_name: string,
  intake: number,
  frequency: string,
  display_frequency: string,
  food_precedence: string,
  duration: number,
  duration_unit: string,
  instruction: string,
  delete: boolean,
};
type FormData = {
  appointmentId: number,
  procedures: Array<prescriptionformdata>,
};
type State = {
  newdata: Array<prescriptionformdata>,
};
interface Props extends FormComponentProps {
  data: Array<Prescription>;
  appointmentId: Number;
}
class LabTestsNew extends React.Component<Props, State> {
  componentWillMount() {
    const formData: Array<prescriptionformdata> = [];
    
    formData.push({
      id: null,
      drug_id: null,
      drug_name: null,
      intake: null,
      frequency: null,
      display_frequency: null,
      food_precedence: null,
      duration: null,
      duration_unit: null,
      delete: true,
      instruction: null,
    });
    this.setState({ newdata: formData });
  }
  componentWillReceiveProps(nextProps: Props) {
    const { form } = nextProps;
    const { getFieldValue } = form;
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
    const IIntake = getFieldValue('IIntake');
    const IFrequency = getFieldValue('IFrequency');
    const IFoodPrecedence = getFieldValue('IFoodPrecedence');
    const IDuration = getFieldValue('IDuration');
    const IDurationUnit = getFieldValue('IDurationUnit');
    const IInstruction = getFieldValue('IInstruction');
    const deleted = form.getFieldValue('deleted');
    const changed = newdata.map((it, index) => {
      const item = { ...it };
      item.intake = IIntake[index];
      item.frequency = IFrequency[index];
      item.display_frequency = IFrequency[index];
      item.food_precedence = IFoodPrecedence[index];
      item.duration = IDuration[index];
      item.duration_unit = IDurationUnit[index];
      item.delete = deleted[index] === 'true';
      item.instruction = IInstruction[index];
      return item;
    });
    this.setState({ newdata: changed });
  }
  onSave = () => {
    const { newdata } = this.state;
    const { validateFields } = this.props.form;
    const { appointmentId } = this.props;
    const Fields = ['IIntake', 'IFrequency', 'IDuration', 'IDurationUnit', 'IInstruction', 'index'];
    validateFields(Fields, {}, (err) => {
      if (!err) {
        const formdata: FormData = {};
        formdata.appointmentId = appointmentId;
        formdata.prescriptions = filter(
          newdata,
          o => o.id !== null || (o.id === null && o.delete === false),
        );
        this.props.updatePrescriptions(formdata);
      }
    });
  };
  onDelete = () => {
    const { appointmentId } = this.props;
    this.props.deletePrescriptions(appointmentId);
  };
  onDeleteDrug = (index) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    const deletedVals = getFieldValue('deleted');
    deletedVals[index] = 'true';
    setFieldsValue({
      deleted: deletedVals,
    });
  };
  onNewDrug = (val) => {
    const { newdata } = this.state;
    const { form } = this.props;
    const { setFieldsValue, getFieldValue } = form;
    const IIntake = getFieldValue('IIntake');
    const IFrequency = getFieldValue('IFrequency');
    const IFoodPrecedence = getFieldValue('IFoodPrecedence');
    const IDuration = getFieldValue('IDuration');
    const IDurationUnit = getFieldValue('IDurationUnit');
    const IInstruction = getFieldValue('IInstruction');

    IIntake[newdata.length] = 1;
    IFrequency[newdata.length] = '';
    IFoodPrecedence[newdata.length] = 'before food';
    IDuration[newdata.length] = '';
    IDurationUnit[newdata.length] = 'day(s)';
    IInstruction[newdata.length] = '';
    newdata.push({
      drug_id: val.id,
      drug_name: val.name,
      intake: 1,
      frequency: '',
      display_frequency: '',
      food_precedence: 'before food',
      duration: '',
      duration_unit: 'day(s)',
      instruction: '',
      id: null,
      delete: false,
    });
    this.setState({ newdata }, () => {
      setFieldsValue({
        IIntake,
        IFrequency,
        IFoodPrecedence,
        IDuration,
        IInstruction,
        IDurationUnit,
        ISearchDrug: '',
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
          key={index}
          type="flex"
          align="top"
          gutter={16}
          className="fields fields--edit fields--table-edit"
        >
          <Col md={5}>{item.drug_name}</Col>
          <Col md={2}>
            <Input
              placeholder="Dosage"
              required
              name={`IIntake[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={3}>
            <Input
              placeholder="1-0-1"
              required
              name={`IFrequency[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={4}>
            <Select
              required
              name={`IFoodPrecedence[${index}]`}
              defaultValue="before food"
              getFieldDecorator={getFieldDecorator}
              values={[
                { value: 'before food', label: 'Before Food' },
                { value: 'after food', label: 'After Food' },
              ]}
            />
          </Col>
          <Col md={6}>
            <Row gutter={16}>
              <Col md={12}>
                <Input
                  placeholder="Duration"
                  required
                  name={`IDuration[${index}]`}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
              <Col md={12}>
                <Select
                  required
                  name={`IDurationUnit[${index}]`}
                  defaultValue="day(s)"
                  getFieldDecorator={getFieldDecorator}
                  values={[
                    { value: 'day(s)', label: 'day(s)' },
                    { value: 'week(s)', label: 'week(s)' },
                    { value: 'month(s)', label: 'month(s)' },
                    { value: 'year(s)', label: 'year(s)' },
                  ]}
                />
              </Col>
              <Col md={24}>
                <Input
                  placeholder="Instruction"
                  name={`IInstruction[${index}]`}
                  getFieldDecorator={getFieldDecorator}
                />
              </Col>
            </Row>
          </Col>
          <Col md={2} />
          <Col md={2}>
            <div style={{ display: 'none' }}>
              <Input name={`deleted[${index}]`} getFieldDecorator={getFieldDecorator} />
            </div>
            <i
              onClick={() => this.onDeleteDrug(index)}
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
      <div className="charting__item charting__item--prescription-container">
        <div className="card-record-details card-record-details--prescription">
          <div className="header">
            <div className="title">Prescriptions</div>
          </div>
          <div className="body">
            <Row type="flex" className="fields fields--edit">
              <Col md={5}>DRUG</Col>
              <Col md={6}>DOSAGE & FREQUENCY</Col>
              <Col md={4}>INTAKE</Col>
              <Col md={4}>DURATION</Col>
            </Row>
            <Space h={4} />
            <Divider />
            {this.renderList()}
            <Divider />
            <Row type="flex" className="fields fields--edit">
              <Col md={8}>
                <DrugsSearchInput
                  placeholder="Enter Drug Name"
                  onSelect={this.onNewDrug}
                  name="ISearchDrug"
                  getFieldDecorator={getFieldDecorator}
                />
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
      </div>
    );
  }
}
const Wrapped = Form.create({
  mapPropsToFields() {
    const fields = {};
    fields.index = [];
    fields.deleted = [];
    fields.IId = [];
    fields.IDrugId = [];
    fields.IIntake = [];
    fields.IDrugName = [];
    fields.IFrequency = [];
    fields.IFoodPrecedence = [];
    fields.IDuration = [];
    fields.IDurationUnit = [];
    fields.IInstruction = [];
    fields.index[0] = Form.createFormField({ value: 0 });
    fields.IId[0] = Form.createFormField({ value: '1' });
    fields.IDrugId[0] = Form.createFormField({ value: 'a' });
    fields.IDrugName[0] = Form.createFormField({ value: 'a' });
    fields.IIntake[0] = Form.createFormField({ value: 'a' });
    fields.IFrequency[0] = Form.createFormField({ value: 'a' });
    fields.IFoodPrecedence[0] = Form.createFormField({ value: 'a' });
    fields.IDuration[0] = Form.createFormField({ value: 'a' });
    fields.IDurationUnit[0] = Form.createFormField({ value: 'a' });
    fields.IInstruction[0] = Form.createFormField({ value: 'a' });
    fields.deleted[0] = Form.createFormField({ value: 'true' });
    return fields;
  },
})(LabTestsNew);
const mapStateToProps = state => ({
  charts: state.Charts,
});
const mapDispatchToProps = dispatch => ({
  updatePrescriptions: data => dispatch(updatePrescriptions(data)),
  fetchAppointment: id => dispatch(fetchAppointment(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deletePrescriptions: appointmentId => dispatch(deletePrescriptions(appointmentId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
