import { actions as types } from './actions';
import { each, filter, sortBy } from 'lodash';
import moment from 'moment-timezone';

type State = {
  all: Array,
  today: Array,
  recent: Array,
  selected: object,
  doneAction: string | null,
  isFetching: boolean,
  error: string | null,
};

type Action = {
  type: string,
  payload: any,
};

const initState = {
  all: [],
  today: [],
  recent: [],
  selected: null,
  doneAction: null,
  isFetching: false,
  error: null,
};

export default function reducer(state: State = initState, action: Action) {
  switch (action.type) {
    case types.PATIENT_ADD_REQUEST:
    case types.PATIENT_EDIT_REQUEST:
    case types.PATIENT_FETCH_ALL_REQUEST:
    case types.PATIENT_FETCH_REQUEST:
    case types.PATIENT_DELETE_REQUEST: {
      return { ...state, isFetching: true, error: null };
    }
    case types.PATIENT_ADD_FAILED:
    case types.PATIENT_EDIT_FAILED:
    case types.PATIENT_FETCH_ALL_FAILED:
    case types.PATIENT_FETCH_FAILED:
    case types.PATIENT_DELETE_FAILED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case types.PATIENT_FETCH_ALL_SUCCESS: {
      const allPatients = sortBy([...action.payload], ['name']);
      const recent = [];
      const today = [];
      const timezone = moment.tz.guess();
      each(allPatients, (patient) => {
        const createdDate = moment.utc(patient.created_at).local();
        if (createdDate.isValid()) {
          if (createdDate.diff(moment(), 'days') <= 0 && createdDate.diff(moment(), 'days') > -3) {
            recent.push(patient);
          }
          if (createdDate.isSame(new Date(), 'day')) {
            today.push(patient);
          }
        }
      });
      return {
        ...state,
        isFetching: false,
        all: allPatients,
        recent,
        today,
        doneAction: 'fetch',
      };
    }
    case types.PATIENT_FETCH_SUCCESS: {
      return {
        ...state,
        selected: action.payload,
        isFetching: false,
        doneAction: 'fetch',
      };
    }
    case types.PATIENT_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        doneAction: 'add',
      };
    }
    case types.SELECT_PATIENT: {
      return { ...state, selected: action.payload };
    }
    case types.PATIENT_EDIT_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'edit' };
    }
    case types.PATIENT_DELETE_SUCCESS: {
      return { ...state, isFetching: false, doneAction: 'delete' };
    }
    default:
      return state;
  }
}
