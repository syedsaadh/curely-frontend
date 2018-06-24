import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { startCase } from 'lodash';
import { ClinicalNotes } from '../_types';

type Props = {
  data: ClinicalNotes,
};
class ClinicalNotesDetail extends React.Component<Props> {
  state = {};
  renderList = (name, list: Array<String>) => (
    <Row type="flex" className="fields">
      <Col md={4}>{startCase(name)}</Col>
      <Col md={16}>
        <ul className="without-bullets">
          {list.map((item, index) => <li key={index}>- {item}</li>)}
        </ul>
      </Col>
    </Row>
  );
  render() {
    const { data } = this.props;
    return (
      <div className="card-record-details card-record-details--clinical-notes">
        <div className="header">
          <div className="title">Clinical Notes</div>
          <div className="actions">
            <div className="action-item" onClick={this.props.onEditClicked}>
              <i className="ion-edit" />
            </div>
          </div>
        </div>
        <div className="body">
          {data.complaints_list.length > 0
            ? this.renderList('Complaints', data.complaints_list)
            : null}
          {data.observations_list.length > 0
            ? this.renderList('Observations', data.observations_list)
            : null}
          {data.diagnosis_list.length > 0
            ? this.renderList('Diagnoses', data.diagnosis_list)
            : null}
          {data.notes_list.length > 0 ? this.renderList('Notes', data.notes_list) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ClinicalNotesDetail);
