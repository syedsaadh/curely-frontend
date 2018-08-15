import React, { Component } from 'react';
import moment from 'moment';
import { filter } from 'lodash';
import { connect } from 'react-redux';
import { Button, Form, Row, Col, message } from 'antd';
import { DatePicker, Input } from '../../../../components/ui-components';
import { DrugsSearchInput } from '../../../../components/SearchBar';
import { FormComponentProps } from 'antd/lib/form';
import { toggleDoneAction, fetchAll } from '../../../../redux/Inventory/actions';

import './style.stock.add.less';

type Stock = {
  name: string,
  id: number,
  quantity: number,
  batch: string,
  unitCost: number,
};
type FormData = {
  addedOn: string,
  addedStocks: Array<Stock>,
};

interface Props extends FormComponentProps {}

class StockAdd extends Component<Props> {
  state = {
    newdata: [
      {
        name: null,
        id: null,
        quantity: null,
        batch: null,
        unitCost: null,
        delete: 'true',
      },
    ],
  };
  componentWillMount = () => {
    this.props.fetchAll();
  };

  componentWillReceiveProps = (nextProps) => {
    const { form } = nextProps;
    const { newdata } = this.state;
    const { Inventory } = nextProps;
    const { doneAction } = Inventory;
    if (doneAction === 'update' || doneAction === 'delete') {
      message.success('Updated!');
      this.props.toggleDoneAction();
      this.props.fetchAppointment(this.props.appointmentId);
      this.props.onCancel();
      return;
    }
    const quantity = form.getFieldValue('Iquantity');
    const batch = form.getFieldValue('Ibatch');
    const unitCost = form.getFieldValue('IunitCost');
    const deleted = form.getFieldValue('deleted');
    const changed = newdata.map((it, index) => {
      const item = { ...it };
      item.quantity = quantity[index];
      item.batch = batch[index];
      item.unitCost = unitCost[index];
      item.delete = deleted[index] === 'true';
      return item;
    });
    this.setState({ newdata: changed });
  };
  onSave = () => {
    const { newdata } = this.state;
    const { validateFields, getFieldsValue } = this.props.form;
    const { appointmentId, data } = this.props;
    const Fields = ['Iquantity', 'IunitCost', 'Ibatch', 'index', 'AddedOn'];
    validateFields(Fields, {}, (err, values) => {
      if (!err) {
        const formdata: FormData = {};
        formdata.addedOn = moment(values.AddedOn).format('YYYY-MM-DD');
        formdata.addedStocks = filter(newdata, o => o.id !== null && o.delete === false);
        console.log(formdata);
        // this.props.updateTreatmentPlans(formdata);
      }
    });
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
    const Iquantity = getFieldValue('Iquantity');
    const Ibatch = getFieldValue('Ibatch');
    const IunitCost = getFieldValue('IunitCost');
    Iquantity[newdata.length] = 1;
    Ibatch[newdata.length] = '';
    IunitCost[newdata.length] = '';
    newdata.push({
      id: val.id,
      name: val.drug.name,
      quantity: 1,
      batch: '',
      unitCost: '',
      delete: false,
    });
    this.setState({ newdata }, () => {
      setFieldsValue({
        Iquantity,
        Ibatch,
        IunitCost,
      });
    });
  };
  renderDrugLists = () => {
    const { Inventory } = this.props;
    const { lists } = Inventory;
    return lists.map((item, index) => (
      <div className="drug-lists__item" key={index}>
        <div className="content">
          <div className="h4">{item.drug.name}</div>
          <div className="body-2">0 in stock</div>
        </div>
        <div className="action">
          <Button onClick={() => this.onNewDrug(item)} icon="right" />
        </div>
      </div>
    ));
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
          gutter={16}
          type="flex"
          align="top"
          className="item-fields fields--edit fields--table-edit"
        >
          <Col md={5}>{item.name}</Col>
          <Col md={4}>
            <Input required name={`Iquantity[${index}]`} getFieldDecorator={getFieldDecorator} />
          </Col>
          <Col md={4}>
            <Input
              placeholder="Batch Number"
              name={`Ibatch[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={4}>
            <Input
              required
              prefix="₹"
              name={`IunitCost[${index}]`}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={6}>
            ₹ {getFieldValue(`Iquantity[${index}]`) * getFieldValue(`IunitCost[${index}]`) || 0.0}
          </Col>
          <Col md={1}>
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="inventory-page">
        <div className="inventory-page__header">
          <div className="left">
            <div className="heading">Add Stock</div>
          </div>
          <div className="center" />
          <div className="right actions">
            <div className="action-item">
              <Button onClick={this.onSave} type="primary">
                Update Stock
              </Button>
            </div>
            <div className="action-item">
              <Button onClick={this.onCancel} icon="close">
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="inventory-page__body stock-update-container">
          <div className="stock-items">
            <div className="search-drug-container">
              <DrugsSearchInput placeholder="Search Drug" />
            </div>
            <div className="drug-lists-container">{this.renderDrugLists()}</div>
          </div>
          <div className="stock-add-items-container">
            <div className="header">
              <div className="added-on">
                <div className="__label">Added On</div>
                <DatePicker
                  defaultValue={moment()}
                  format="DD/MM/YYYY"
                  getFieldDecorator={getFieldDecorator}
                  name="AddedOn"
                />
              </div>
              <div className="totals">
                <div className="__total-items">1 items</div>
                <div className="__grand-total">Grand Total ₹ 1.00</div>
              </div>
            </div>
            <div className="content">
              <div className="stock-add-items">
                <Row type="flex" align="middle" className="header" gutter={12}>
                  <Col md={5}>ITEM</Col>
                  <Col md={4}>QUANTITY</Col>
                  <Col md={4}>BATCH</Col>
                  <Col md={4}>UNIT COST</Col>
                  <Col md={6}>TOTAL COST</Col>
                  <Col md={1} />
                </Row>
                <div className="items">{this.renderList()}</div>
              </div>
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
    fields.Iquantity = [];
    fields.IunitCost = [];
    fields.Ibatch = [];
    fields.deleted = [];
    fields.index[0] = Form.createFormField({ value: 0 });

    fields.Iquantity[0] = Form.createFormField({ value: 1 });
    fields.IunitCost[0] = Form.createFormField({ value: 1 });
    fields.Ibatch[0] = Form.createFormField({ value: '' });
    fields.deleted[0] = Form.createFormField({ value: 'true' });
    return fields;
  },
})(StockAdd);
const mapStateToProps = (state) => {
  const { Inventory } = state;
  return {
    Inventory,
  };
};
const mapDispatchToProps = dispatch => ({
  toggleDoneAction: () => dispatch(toggleDoneAction()),
  fetchAll: () => dispatch(fetchAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
