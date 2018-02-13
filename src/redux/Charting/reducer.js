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
    case types.APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST:
    case types.APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED:
    case types.APPOINTMENT_VITAL_SIGNS_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'update',
      };
    }
    case types.APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
