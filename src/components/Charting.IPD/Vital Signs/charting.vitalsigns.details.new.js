import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, message } from 'antd';
import { startCase, each } from 'lodash';
import { FormComponentProps } from 'antd/lib/form/Form';
import { VitalSignField } from '../_types';
import { Input } from '../../ui-components';
import { updateVitalSigns, toggleDoneAction } from '../../../redux/IPD.Charting/actions';
import { fetchVisit } from '../../../redux/IPD.Admission/actions';

interface Props extends FormComponentProps {
  visitId: Number;
  onCancel: Function;
}
class VitalSignAdd extends React.Component<Props> {
  state = {};
  componentWillReceiveProps(nextProps) {
    if (nextProps.charts.doneAction === 'update') {
      message.success('Updated Values!');
      this.props.toggleDoneAction();
      this.props.fetchVisit(this.props.visitId);
      this.props.onCancel();
    }
  }

  onSave = () => {
    const { form, visitId } = this.props;
    const { getFieldsValue } = form;
    const formdata = {};
    const vitalSigns: Array<VitalSignField> = [];
    formdata.visitId = visitId;
    each(getFieldsValue(), (value, key) => {
      if (!value) return;
      vitalSigns.push({ name: key.substr(1), value });
    });
    formdata.vitalSigns = vitalSigns;
    formdata.vitalSignsId = null;
    this.props.updateVitalSigns(formdata);
  };
  render() {
    const { vitalSigns, form, charts } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="charting__item charting__item--vital-signs-container">
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
const Wrapped = Form.create()(VitalSignAdd);
const mapStateToProps = state => ({
  vitalSigns: state.VitalSigns,
  charts: state.IPDCharting,
});
const mapDispatchToProps = dispatch => ({
  updateVitalSigns: data => dispatch(updateVitalSigns(data)),
  fetchVisit: id => dispatch(fetchVisit(id)),
  toggleDoneAction: () => dispatch(toggleDoneAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wrapped);
