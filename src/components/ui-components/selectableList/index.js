import React from 'react';
import './style.less';

type listNode = {
  id: string,
  label: string,
  value: object | string,
};
type Props = {
  list: Array<listNode>,
  onItemClick: Function,
  active: string,
};
function SelectableList(props: Props) {
  const { list, onItemClick, active } = props;
  const values = list.length > 0 ? list : [];
  return (
    <div className="selectable-list-wrapper">
      <ul className="selectable-list">
        {values.map((item, index) => (
          <li
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

SelectableList.defaultProps = {
  list: [],
};
export default SelectableList;
