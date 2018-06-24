import React from 'react';
import scrollIntoView from 'scroll-into-view';
import './style.less';

type listNode = {
  id: string,
  label: string,
  value: Object | string,
};
type Props = {
  list: Array<listNode>,
  onItemClick: Function,
  active: string,
  onRef: any,
};
class SelectableList extends React.Component<Props> {
  state = {};
  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef) this.props.onRef(undefined);
  }
  scrollToSelected = () => {
    if (this.selected) {
      scrollIntoView(this.selected, {
        time: 500,
      });
    }
  };
  render() {
    const { list, onItemClick, active } = this.props;
    const values = list.length > 0 ? list : [];
    return (
      <div className="selectable-list-wrapper">
        <ul className="selectable-list">
          {values.map((item, index) => (
            <li
              ref={(el) => {
                active == item.id ? (this.selected = el) : null;
              }}
              key={index}
              className={active == item.id ? 'active' : ''}
              onClick={() => onItemClick(item.value)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SelectableList.defaultProps = {
  list: [],
};
export default SelectableList;
