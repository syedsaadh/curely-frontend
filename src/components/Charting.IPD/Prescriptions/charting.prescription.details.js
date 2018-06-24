import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { Prescription } from '../_types';

type Props = {
  data: Array<Prescription>,
};
class PrescriptionDetail extends React.Component<Props> {
  state = {};
  columns = [
    {
      title: 'DRUG',
      dataIndex: 'drug_name',
      key: 'drug_name',
      render: (text, row: Prescription) => (
        <span> {row.drug ? `${row.drug.name} (${row.drug.drug_type})` : null}</span>
      ),
    },
    {
      title: 'DOSAGE & FREQUENCY',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'duration',
      render: (text, row: Prescription) => <span> {`${row.duration} ${row.duration_unit}`}</span>,
    },
    {
      title: 'INSTRUCTIONS',
      dataIndex: 'instruction',
      key: 'instruction',
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
    return (
      <div className="card-record-details card-record-details--prescription">
        <div className="header">
          <div className="title">Prescriptions</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionDetail);
