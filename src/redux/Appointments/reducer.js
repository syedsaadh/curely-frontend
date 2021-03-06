import { actions as types } from './actions';
import { findIndex } from 'lodash';

type State = {
  lists: Array,
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
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.APPOINTMENT_ADD_REQUEST:
    case types.APPOINTMENT_EDIT_REQUEST:
    case types.APPOINTMENT_FETCH_ALL_REQUEST:
    case types.APPOINTMENT_CANCEL_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.APPOINTMENT_ADD_FAILED:
    case types.APPOINTMENT_EDIT_FAILED:
    case types.APPOINTMENT_FETCH_ALL_FAILED:
    case types.APPOINTMENT_CANCEL_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.APPOINTMENT_FETCH_SUCCESS: {
      const appointments = [...state.lists];
      const fetchedData = action.payload;
      const index = findIndex(appointments, o => o.id === fetchedData.id);
      if (index) appointments[index] = fetchedData;
      else appointments.push(fetchedData);
      return {
        ...state,
        isFetching: false,
        lists: appointments,
        doneAction: 'fetch',
      };
    }
    case types.APPOINTMENT_FETCH_ALL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lists: action.payload,
        doneAction: 'fetch',
      };
    }
    case types.APPOINTMENT_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.APPOINTMENT_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.APPOINTMENT_CANCEL_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'cancel' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
