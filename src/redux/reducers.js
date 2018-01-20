import Auth from './Authentication/reducer';
import App from './App/reducer';
import Departments from './Departments/reducer';
import LabTests from './LabTests/reducer';
import Procedures from './Procedures/reducer';
import PracticeStaff from './PracticeStaff/reducer';
import Roles from './Roles/reducer';
import Patients from './Patients/reducer';
import Appointments from './Appointments/reducer';

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
};
export default rootReducer;
