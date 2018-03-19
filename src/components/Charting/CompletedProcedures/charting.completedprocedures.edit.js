import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Row, Col, Button, Form, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { ProcedureSearchInput } from '../../SearchBar';
import { Input, Divider, Space } from '../../ui-components';
import { Procedure } from '../_types';
import {
  updateCompletedProcedures,
  toggleDoneAction,
  deleteCompletedProcedures,
} from '../../../redux/Charting/actions';
import { fetch as fetchAppointment } from '../../../redux/Appointments/actions';

message.config({
  top: 50,
  duration: 2,
});

type procedureformdata = {
  procedure_id: number,
  name: string,
  units: number,
  cost: number,
  discount: number,
  notes: string,
  id: number,
  delete: boolean,
};
type FormData = {
  appointmentId: number,
  procedures: Array<procedureformdata>,
};
type State = {
  newdata: Array<procedureformdata>,
};
interface Props extends FormComponentProps {
  data: Array<Procedure>;
  appointmentId: Number;
}
class CompletedProceduresEdit extends React.Component<Props, State> {
  componentWillMount() {
    const { data, charts } = this.props;
    const { doneAction } = charts;
    const formDataProcedures: Array<procedureformdata> = [];

    if (doneAction === 'update' || doneAction === 'delete') {
      message.success('Updated!');
      this.props.toggleDoneAction();
      this.props.fetchAppointment(this.props.appointmentId);
      this.props.onCancel();
      return;
    }

    data.forEach((item) => {
      formDataProcedures.push({
        name: item.procedure_name,
        id: item.id,
        procedure_id: item.procedure_id,
        delete: false,
        units: item.procedure_units,
        cost: item.procedure_cost,
        discount: item.procedure_discount,
        notes: '',
      });
    });
    this.setState({ newdata: formDataProcedures });
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
    const units = form.getFieldValue('Iunits');
    const deleted = form.getFieldValue('deleted');
    const costs = form.getFieldValue('Icost');
    const discounts = form.getFieldValue('Idiscount');
    const changed = newdata.map((it, index) => {
      const item = { ...it };
      item.cost = parseFloat(costs[index]);
      item.discount = parseFloat(discounts[index]);
      item.units = parseFloat(units[index]);
      item.delete = deleted[index] === 'true';
      item.notes = '';
      return item;
    });
    this.setState({ newdata: changed });
  }
  onSave = () => {
    const { newdata } = this.state;
    const { validateFields, getFieldsValue } = this.props.form;
    const { appointmentId, data } = this.props;
    const Fields = ['Icost', 'Idiscount', 'Iunits', 'index'];
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const formdata: FormData = {};
        formdata.appointmentId = appointmentId;
        formdata.procedures = filter(
          newdata,
          o => o.id !== null || (o.id === null && o.delete === false),
        );
        this.props.updateCompletedProcedures(formdata);
      }
    });
  };
  onDelete = () => {
    const { appointmentId } = this.props;
    this.props.deleteCompletedProcedures(appointmentId);
  };
  onDeleteProcedure = (index) => {
    const { setFieldsValue, getFieldValue } = this.props.form;
    const deletedVals = getFieldValue('deleted');
    deletedVals[index] = 'true';
    setFieldsValue({
      deleted: deletedVals,
    });
  };
  onNewProcedureSelect = (val) => {
    const { newdata } = this.state;
    const { form } = this.props;
    const { setFieldsValue, getFieldValue } = form;
    const IUnits = getFieldValue('Iunits');
    const ICosts = getFieldValue('Icost');
    const IDiscounts = getFieldValue('Idiscount');
    IUnits[newdata.length] = 1;
    ICosts[newdata.length] = val.cost;
    IDiscounts[newdata.length] = 0;
    newdata.push({
      procedure_id: val.id,
      name: val.name,
      units: 1,
      cost: val.cost,
      discount: 0,
      notes: '',
      id: null,
      delete: false,
    });
    this.setState({ newdata }, () => {
      setFieldsValue({
        Iunits: IUnits,
        Icost: ICosts,
        Idiscount: IDiscounts,
        ISearchProcedure: '',
      });
    });
  };
  renderProcedures = () => {
    const { newdata } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    return newdata.map((item, index) => {
      const total = getFieldValue(`Iunits[${index}]`) * getFieldValue(`Icost[${index}]`);
      const discounted = total - getFieldValue(`Idiscount[${index}]`);
      const deleted = getFieldValue(`deleted[${index}]`);
      return (
        <Row
          style={{ display: deleted === 'true' ? 'none' : 'flex' }}
          key={index}
          type="flex"
          align="middle"
          className="fields fields--edit fields--table-edit"
        >
          <Col md={8}>{item.name}</Col>
          <Col md={6}>
            <Input
              className="chart-inputs--small"
              name={`Iunits[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
            <Input
              className="chart-inputs--small"
              name={`Icost[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={6}>
            <Input
              rules={{
                type: 'number',
                transform: value => parseFloat(value),
                min: 0,
                max: total,
                message: `Discount should be in range 0 to ${total}`,
              }}
              className="chart-inputs--small"
              name={`Idiscount[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={3}>{discounted}</Col>
          <Col md={1}>
            <div style={{ display: 'none' }}>
              <Input name={`deleted[${index}]`} getFieldDecorator={getFieldDecorator} />
            </div>
            <i
              onClick={() => this.onDeleteProcedure(index)}
              style={{ color: 'red', cursor: 'pointer' }}
              className="ion-close"
            />
          </Col>
        </Row>
      );
    });
  };
  render() {
    const { charts, data, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <div className="card-record-details card-record-details--completed-procedures">
        <div className="header">
          <div className="title">Completed Procedures</div>
        </div>
        <div className="body">
          <Row type="flex" className="fields fields--edit">
            <Col md={8}>PROCEDURE</Col>
            <Col md={6}>UNIT * COST(₹)</Col>
            <Col md={6}>DISCOUNT(₹)</Col>
            <Col md={4}>TOTAL(₹)</Col>
          </Row>
          <Space h={4} />
          <Divider />
          {this.renderProcedures()}
          <Divider />
          <Row type="flex" className="fields fields--edit">
            <Col md={8}>
              <ProcedureSearchInput
                placeholder="Enter Procedure Name"
                onSelect={this.onNewProcedureSelect}
                name="ISearchProcedure"
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
    );
  }
}
const Wrapped = Form.create({
  mapPropsToFields(props: Props) {
    const { data } = props;
    const fields = {};
    fields.index = [];
    fields.Iunits = [];
    fields.Icost = [];
    fields.Idiscount = [];
    fields.deleted = [];
    fields.IId = [];
    fields.IProcedureId = [];
    fields.IProcedureName = [];

    data.forEach((item, index) => {
      fields.index[index] = Form.createFormField({ value: index });
      fields.IId[index] = Form.createFormField({ value: item.id });
      fields.IProcedureId[index] = Form.createFormField({ value: item.procedure_id });
      fields.IProcedureName[index] = Form.createFormField({ value: item.procedure_name });

      fields.Iunits[index] = Form.createFormField({ value: item.procedure_units });
      fields.Icost[index] = Form.createFormField({ value: item.procedure_cost });
      fields.Idiscount[index] = Form.createFormField({ value: item.procedure_discount });
      fields.deleted[index] = Form.createFormField({ value: 'false' });
    });
    return fields;
  },
})(CompletedProceduresEdit);
const mapStateToProps = state => ({
  charts: state.Charts,
});
const mapDispatchToProps = dispatch => ({
  updateCompletedProcedures: data => dispatch(updateCompletedProcedures(data)),
  fetchAppointment: id => dispatch(fetchAppointment(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  deleteCompletedProcedures: appointmentId => dispatch(deleteCompletedProcedures(appointmentId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
