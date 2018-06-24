import React from 'react';
import { connect } from 'react-redux';
import CompletedProceduresDetail from './charting.completedprocedures.details';
import CompletedProceduresEdit from './charting.completedprocedures.edit';
import { Procedure } from '../_types';
import './style.completedprocedures.less';

type Props = {
  data: Array<Procedure>,
};
class CompletedProceduresSection extends React.Component<Props> {
  state = {
    edit: false,
  };
  onEditClicked = () => {
    this.setState({
      edit: true,
    });
  };
  onCancel = () => {
    this.setState({
      edit: false,
    });
  };
  render() {
    const { edit } = this.state;
    const { data } = this.props;
    return (
      <div className="charting__item charting__item--treatment-plans-container">
        {edit ? (
          <CompletedProceduresEdit
            visitId={data[0].ipd_admission_visit_id} // To Revisit this code **
            data={data}
            onCancel={this.onCancel}
          />
        ) : (
          <CompletedProceduresDetail data={data} onEditClicked={this.onEditClicked} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CompletedProceduresSection);
