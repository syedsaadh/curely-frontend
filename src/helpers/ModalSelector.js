import React from 'react';
import TestModal from '../containers/Modals/Test';
import {
  DepartmentAdd,
  DepartmentEdit,
  LabTestAdd,
  LabTestEdit,
  ProcedureAdd,
  ProcedureEdit,
  PracticeStaffAdd,
  PracticeStaffEdit,
  PatientAdd,
  PatientEdit,
} from '../containers/Modals/';

const MODALS = {
  TestModal,
  DepartmentAdd,
  DepartmentEdit,
  LabTestAdd,
  LabTestEdit,
  ProcedureAdd,
  ProcedureEdit,
  PracticeStaffAdd,
  PracticeStaffEdit,
  PatientAdd,
  PatientEdit,
};

type Props = {
  modalName: string,
  modalProps: Object,
};

function ModalRoot(props: Props) {
  if (!props.modalName) return null;
  const SpecificModal = MODALS[props.modalName];
  return <SpecificModal {...props.modalProps} />;
}

export default ModalRoot;
