import React from 'react';
import { Select, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { debounce } from 'lodash';
import { checkResponseCode, checkStatus } from '../../../utils/ApiUtils';
import DrugCatalogService from '../../../services/drugcatalog';

const { Option } = Select;

type DrugType = {
  default_dosage: null | string,
  default_dosage_unit: null | string,
  drug_type: string,
  instruction: null | string,
  name: string,
};

interface Props extends FormComponentProps {
  placeholder: string;
  onSelect: (val: DrugType) => void;
  onSearch: Function;
  disabled?: boolean;
}

class SearchInput extends React.Component<Props> {
  state = {
    dataSource: [],
    loading: false,
  };

  componentDidMount() {
    this.apiSearch = debounce((val) => {
      DrugCatalogService.searchDrugs(val)
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

  onSearch = (val) => {
    this.setState({ val });
    if (this.props.onSearch) this.props.onSearch(val);
    if (val.length < 2) return;
    this.setState({ loading: true });
    this.apiSearch(val);
  };
  renderOptions = () => {
    const { dataSource } = this.state;
    return dataSource.map((item: DrugType) => (
      <Option key={`${item.id}`} value={item.name} valObj={item}>
        {item.name} | {item.drug_type}
      </Option>
    ));
  };
  render() {
    const { placeholder, onSelect, disabled } = this.props;
    return (
      <Select
        disabled={disabled}
        mode="combobox"
        style={{ width: '100%' }}
        optionLabelProp="value"
        value={this.state.val}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={this.state.loading ? <Spin size="small" /> : null}
        onChange={this.onSearch}
        onSelect={(val, opt) => {
          onSelect(opt.props.valObj);
        }}
      >
        {this.renderOptions()}
      </Select>
    );
  }
}
export default SearchInput;
