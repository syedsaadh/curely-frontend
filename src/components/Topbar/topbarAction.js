// @flow
import React from 'react';
import { Popover } from 'antd';

type Props = {
  placement?: 'bottom' | 'bottomRight' | 'bottomLeft',
  icon: string,
};
type ItemProps = {
  onClick: Function,
};
function ActionBtnItem(props: ItemProps) {
  return (
    <div onClick={props.onClick} className="topbar-action-btn__item">
      {props.children}
    </div>
  );
}

function ActionBtn(props: Props) {
  return (
    <Popover
      overlayClassName="topbar-popover"
      placement={props.placement}
      content={<div className="topbar-dropdown">{props.children}</div>}
      trigger="click"
    >
      <div className="topbar-action-btn">
        <i className={props.icon} />
      </div>
    </Popover>
  );
}

ActionBtn.defaultProps = {
  placement: 'bottomRight',
};
ActionBtn.Item = ActionBtnItem;
export default ActionBtn;
