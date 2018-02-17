import React from 'react';
import { Modal, Button, Alert } from 'antd';
import { isArray } from 'lodash';
import { closeModal } from '../../../redux/App/actions';
import { store } from '../../../config/store';

type Props = {
  title: string,
  onSave: Function,
  loading?: boolean,
  onSaveDisabled?: boolean,
  height?: string,
  errors?: Array | string | null,
  width?: number,
  cancelText?: string,
  okText?: string,
};
function CustomModal(props: Props) {
  const { errors, cancelText, okText } = props;
  let showError = null;
  if (isArray(errors)) {
    showError = errors.length > 0 ? errors.join(' | ') : null;
  }
  return (
    <Modal
      width={props.width}
      className="fl-modal"
      wrapClassName="fl-modal-wrapper"
      title={props.title}
      maskClosable={false}
      closable={false}
      visible
      bodyStyle={{ height: props.height }}
      maskStyle={{ background: '#38414df2' }}
      footer={[
        <Button key="cancel" onClick={() => store.dispatch(closeModal())}>
          {cancelText}
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={props.onSaveDisabled}
          loading={props.loading}
          onClick={props.onSave}
        >
          {okText}
        </Button>,
      ]}
    >
      {!showError || <Alert type="error" message="Error" description={showError} banner />}
      {!showError || <br />}
      {props.children}
    </Modal>
  );
}

CustomModal.defaultProps = {
  errors: null,
  loading: false,
  onSaveDisabled: false,
  height: '420px',
  width: 640,
  okText: 'Save',
  cancelText: 'Cancel',
};

export default CustomModal;
