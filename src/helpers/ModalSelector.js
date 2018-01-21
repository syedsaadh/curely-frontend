import React from 'react';
import TestModal from '../containers/Modals/Test';
import * as Modals from '../containers/Modals/';

type Props = {
  modalName: string,
  modalProps: Object,
};

function ModalRoot(props: Props) {
  if (!props.modalName) return null;
  const SpecificModal = Modals[props.modalName];
  return <SpecificModal {...props.modalProps} />;
}

export default ModalRoot;
