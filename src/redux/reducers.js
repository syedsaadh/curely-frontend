import Auth from './Authentication/reducer';
import App from './App/reducer';
import Departments from './Departments/reducer';
import LabTests from './LabTests/reducer';
import Procedures from './Procedures/reducer';
import PracticeStaff from './PracticeStaff/reducer';
import Roles from './Roles/reducer';
import Patients from './Patients/reducer';
import Appointments from './Appointments/reducer';
import VitalSigns from './VitalSigns/reducer';
import Charts from './Charting/reducer';
import Inventory from './Inventory/reducer';
import DrugCatalog from './DrugCatalog/reducer';
import IPDAdmission from './IPD.Admission/reducer';
import IPDCharting from './IPD.Charting/reducer';

const rootReducer = {
  App,
  Auth,
  Departments,
  LabTests,
  Procedures,
  PracticeStaff,
  Roles,
  Patients,
  Appointments,
  VitalSigns,
  Charts,
  Inventory,
  DrugCatalog,
  IPDAdmission,
  IPDCharting,
};
export default rootReducer;
