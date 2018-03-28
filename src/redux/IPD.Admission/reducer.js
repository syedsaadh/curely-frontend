import { findIndex } from 'lodash';
import { actions as types } from './actions';

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
    case types.ADMISSION_ADD_REQUEST:
    case types.ADMISSION_EDIT_REQUEST:
    case types.ADMISSION_FETCH_ALL_REQUEST:
    case types.ADMISSION_CANCEL_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.ADMISSION_ADD_FAILED:
    case types.ADMISSION_EDIT_FAILED:
    case types.ADMISSION_FETCH_ALL_FAILED:
    case types.ADMISSION_CANCEL_FAILED: {
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
    case types.TOGGLE_DONE_ACTION: {
      return { ...state, doneAction: null };
    }
    default:
      return state;
  }
}
