import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { startCase } from 'lodash';
import { Procedure } from '../_types';

type Props = {
  data: Array<Procedure>,
};
class TreatmentPlansDetail extends React.Component<Props> {
  state = {};
  columns = [
    {
      title: 'PROCEDURE',
      dataIndex: 'procedure_name',
      key: 'procedure_name',
    },
    {
      title: 'COST(₹)',
      dataIndex: 'procedure_cost',
      key: 'procedure_cost',
      render: (text, record) => (
        <span>{(record.procedure_cost * record.procedure_units).toFixed(2)}</span>
      ),
    },
    {
      title: 'DISCOUNT(₹)',
      dataIndex: 'procedure_discount',
      key: 'procedure_discount',
      render: text => <span>{text.toFixed(2)}</span>,
    },
    {
      title: 'TOTAL(₹)',
      key: 'total',
      render: (text, record) => {
        const cost = record.procedure_cost;
        const units = record.procedure_units;
        const discount = record.procedure_discount;
        const total = cost * units;
        const discounted = total - discount;
        return <span>{discounted.toFixed(2)}</span>;
      },
    },
  ];
  renderTable = () => {
    const { data } = this.props;
    return (
      <Table
        pagination={false}
        className="jalebi-table jalebi-table--small"
        columns={this.columns}
        dataSource={data}
        rowKey="id"
      />
    );
  };
  render() {
    const { data } = this.props;
    return (
      <div className="card-record-details card-record-details--treatment-plans">
        <div className="header">
          <div className="title">Treatment Plans</div>
          <div className="actions">
            <div className="action-item" onClick={this.props.onEditClicked}>
              <i className="ion-edit" />
            </div>
          </div>
        </div>
        <div className="body">{this.renderTable()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TreatmentPlansDetail);
