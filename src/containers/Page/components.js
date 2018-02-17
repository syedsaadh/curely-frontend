import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { DOBInput, Input } from '../../components/ui-components';

class CustomComponents extends React.Component {
  state = {};
  render() {
    const {
      setFields, getFieldDecorator, getFieldsValue, getFieldValue,
    } = this.props.form;
    return (
      <div>
        <h3> Custom Components</h3>
        <div style={{ margin: 8, padding: 16, background: 'white' }}>
          <DOBInput
            dobValue={getFieldValue('dob')}
            setFields={setFields}
            getFieldDecorator={getFieldDecorator}
          />
          <button
            onClick={() =>
              setFields({
                dob: {
                  value: moment().add(20, 'days'),
                },
              })
            }
          >
            Click
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(CustomComponents));
