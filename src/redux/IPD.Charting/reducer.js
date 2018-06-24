import { actions as types } from './actions';

type State = {
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
};

type Action = {
  type: string,
  payload: any,
};

const initState = {
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.ADD_VISIT_REQUEST:
    case types.EDIT_VISIT_REQUEST:
    case types.DELETE_VISIT_REQUEST:
    case types.ADMISSION_VITAL_SIGNS_UPDATE_REQUEST:
    case types.ADMISSION_VITAL_SIGNS_DELETE_REQUEST:
    case types.ADMISSION_CLINICAL_NOTES_UPDATE_REQUEST:
    case types.ADMISSION_CLINICAL_NOTES_DELETE_REQUEST:
    case types.ADMISSION_PRESCRIPTIONS_UPDATE_REQUEST:
    case types.ADMISSION_PRESCRIPTIONS_DELETE_REQUEST:
    case types.ADMISSION_LAB_ORDERS_UPDATE_REQUEST:
    case types.ADMISSION_LAB_ORDERS_DELETE_REQUEST:
    case types.ADMISSION_TREATMENT_PLANS_UPDATE_REQUEST:
    case types.ADMISSION_TREATMENT_PLANS_DELETE_REQUEST:
    case types.ADMISSION_COMPLETED_PROCEDURES_UPDATE_REQUEST:
    case types.ADMISSION_COMPLETED_PROCEDURES_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.ADD_VISIT_FAILED:
    case types.EDIT_VISIT_FAILED:
    case types.DELETE_VISIT_FAILED:
    case types.ADMISSION_VITAL_SIGNS_UPDATE_FAILED:
    case types.ADMISSION_VITAL_SIGNS_DELETE_FAILED:
    case types.ADMISSION_CLINICAL_NOTES_UPDATE_FAILED:
    case types.ADMISSION_CLINICAL_NOTES_DELETE_FAILED:
    case types.ADMISSION_PRESCRIPTIONS_UPDATE_FAILED:
    case types.ADMISSION_PRESCRIPTIONS_DELETE_FAILED:
    case types.ADMISSION_LAB_ORDERS_UPDATE_FAILED:
    case types.ADMISSION_LAB_ORDERS_DELETE_FAILED:
    case types.ADMISSION_TREATMENT_PLANS_UPDATE_FAILED:
    case types.ADMISSION_TREATMENT_PLANS_DELETE_FAILED:
    case types.ADMISSION_COMPLETED_PROCEDURES_UPDATE_FAILED:
    case types.ADMISSION_COMPLETED_PROCEDURES_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.ADD_VISIT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'addVisit',
      };
    }
    case types.EDIT_VISIT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'editVisit',
      };
    }
    case types.DELETE_VISIT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'deleteVisit',
      };
    }
    case types.ADMISSION_VITAL_SIGNS_UPDATE_SUCCESS:
    case types.ADMISSION_CLINICAL_NOTES_UPDATE_SUCCESS:
    case types.ADMISSION_PRESCRIPTIONS_UPDATE_SUCCESS:
    case types.ADMISSION_LAB_ORDERS_UPDATE_SUCCESS:
    case types.ADMISSION_TREATMENT_PLANS_UPDATE_SUCCESS:
    case types.ADMISSION_COMPLETED_PROCEDURES_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'update',
      };
    }
    case types.ADMISSION_VITAL_SIGNS_DELETE_SUCCESS:
    case types.ADMISSION_CLINICAL_NOTES_DELETE_SUCCESS:
    case types.ADMISSION_PRESCRIPTIONS_DELETE_SUCCESS:
    case types.ADMISSION_LAB_ORDERS_DELETE_SUCCESS:
    case types.ADMISSION_TREATMENT_PLANS_DELETE_SUCCESS:
    case types.ADMISSION_COMPLETED_PROCEDURES_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
