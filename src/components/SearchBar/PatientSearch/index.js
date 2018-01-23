import React from 'react';
import { AutoComplete, Form, Icon } from 'antd';
import { Input } from '../../ui-components';
import { FormComponentProps } from 'antd/lib/form/Form';
import moment from 'moment';
import { debounce } from 'lodash';
import { checkResponseCode, checkStatus } from '../../../utils/ApiUtils';
import PatientService from '../../../services/patient';

import './style.less';

const { Option } = AutoComplete;
interface Props extends FormComponentProps {
  placeholder: string;
  onSelect: Function;
  onSearch: Function;
  required: boolean;
}

class PatientSearch extends React.Component<Props> {
  constructor() {
    super();
    this.onSearch = this.onSearch.bind(this);
  }
  state = {
    dataSource: [],
    loading: false,
  };

  componentDidMount() {
    this.apiSearch = debounce((val) => {
      PatientService.searchPatient(val)
        .then(checkStatus)
        .then(checkResponseCode)
        .then((response) => {
          this.setState({
            dataSource: response.Payload,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            dataSource: [],
            loading: false,
          });
        });
    }, 500);
  }
  onSearch(val) {
    if (this.props.onSearch) this.props.onSearch(val);
    if (val.length < 2) return;
    this.setState({ loading: true });
    this.apiSearch(val);
  }
  renderOptions = () => {
    const { dataSource } = this.state;
    return dataSource.map(item => (
      <Option key={`${item.id}`} value={item.name} valObj={item}>
        {item.name}
        <span> | P{item.id} </span>
        <br />
        <span>{item.dob ? moment(item.dob).format('DD MMM YYYY') : 'No Date Of Birth'}</span>
      </Option>
    ));
  };
  render() {
    const {
      placeholder, onSelect, required, label, getFieldDecorator, name,
    } = this.props;
    const { loading } = this.state;
    return (
      <AutoComplete
        style={{ width: '100%' }}
        className="autocomplete-search-bar"
        dropdownClassName="autocomplete-search-dropdown"
        dataSource={this.renderOptions()}
        onSelect={(val, opt) => {
          onSelect(opt.props.valObj);
        }}
        optionLabelProp="value"
      >
        <Input
          autoComplete={false}
          label={label}
          required={required}
          placeholder={placeholder}
          name={name}
          getFieldDecorator={getFieldDecorator}
          suffix={loading ? <Icon type="loading" /> : null}
          onValueChange={this.onSearch}
        />
      </AutoComplete>
    );
  }
}

export default PatientSearch;
