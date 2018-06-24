import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { startCase } from 'lodash';
import { VitalSignField } from '../_types';

type Props = {
  data: Array<VitalSignField>,
};
class VitalSignsDetail extends React.Component<Props> {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div className="card-record-details card-record-details--vital-signs">
        <div className="header">
          <div className="title">Vital Signs</div>
          <div className="actions">
            <div className="action-item" onClick={this.props.onEditClicked}>
              <i className="ion-edit" />
            </div>
          </div>
        </div>
        <div className="body">
          {data.map((item, index) => (
            <Row key={index} type="flex" className="fields">
              <Col md={6}>
                {startCase(item.name)} {item.unit ? `(${item.unit})` : null}
              </Col>
              <Col md={8}>{item.value}</Col>
            </Row>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VitalSignsDetail);
