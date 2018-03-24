import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { LabTest } from '../_types';

type Props = {
  data: Array<LabTest>,
};
class LabTestsDetail extends React.Component<Props> {
  state = {};
  columns = [
    {
      title: 'LAB TEST',
      dataIndex: 'lab_test_name',
      key: 'lab_test_name',
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
      <div className="card-record-details card-record-details--treatment-plans">
        <div className="header">
          <div className="title">Lab Orders</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(LabTestsDetail);
