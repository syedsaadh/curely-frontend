import { findIndex } from 'lodash';
import { actions as types } from './actions';

type State = {
  lists: Array,
  availableBeds: Array,
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
};

type Action = {
  type: string,
  payload: any,
};

const initState = {
  lists: [],
  selectedDept: null,
  availableBeds: [],
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.VISIT_FETCH_REQUEST:
    case types.ADMISSION_ADD_REQUEST:
    case types.ADMISSION_EDIT_REQUEST:
    case types.ADMISSION_FETCH_BY_DEPT_REQUEST:
    case types.FETCH_AVAILABLE_BEDS_REQUEST:
    case types.ADMISSION_FETCH_ALL_REQUEST:
    case types.ADMISSION_CANCEL_REQUEST:
    case types.ADMISSION_DISCHARGE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.VISIT_FETCH_FAILED:
    case types.ADMISSION_ADD_FAILED:
    case types.ADMISSION_EDIT_FAILED:
    case types.ADMISSION_FETCH_BY_DEPT_FAILED:
    case types.FETCH_AVAILABLE_BEDS_FAILED:
    case types.ADMISSION_FETCH_ALL_FAILED:
    case types.ADMISSION_CANCEL_FAILED:
    case types.ADMISSION_DISCHARGE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.ADMISSION_FETCH_SUCCESS: {
      const admissions = [...state.lists];
      const fetchedData = action.payload;
      const index = findIndex(admissions, o => o.id === fetchedData.id);
      if (index) admissions[index] = fetchedData;
      else admissions.push(fetchedData);
      return {
        ...state,
        isFetching: false,
        lists: admissions,
        doneAction: 'fetch',
      };
    }
    case types.ADMISSION_FETCH_BY_DEPT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.FETCH_AVAILABLE_BEDS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        availableBeds: action.payload.beds,
        doneAction: 'fetch',
      };
    }
    case types.ADMISSION_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.ADMISSION_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.ADMISSION_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.ADMISSION_CANCEL_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'cancel' };
    }
    case types.ADMISSION_DISCHARGE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'discharged' };
    }
    case types.SELECT_IPD_DEPARTMENT: {
      return { ...state, selectedDept: action.payload };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
