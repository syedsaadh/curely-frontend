import service from '../../services/ipd.admission';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  VISIT_FETCH_REQUEST: 'VISIT_FETCH_REQUEST',
  VISIT_FETCH_SUCCESS: 'VISIT_FETCH_SUCCESS',
  VISIT_FETCH_FAILED: 'VISIT_FETCH_FAILED',

  ADMISSION_FETCH_ALL_REQUEST: 'ADMISSION_FETCH_ALL_REQUEST',
  ADMISSION_FETCH_ALL_SUCCESS: 'ADMISSION_FETCH_ALL_SUCCESS',
  ADMISSION_FETCH_ALL_FAILED: 'ADMISSION_FETCH_ALL_FAILED',

  ADMISSION_FETCH_BY_DEPT_REQUEST: 'ADMISSION_FETCH_BY_DEPT_REQUEST',
  ADMISSION_FETCH_BY_DEPT_SUCCESS: 'ADMISSION_FETCH_BY_DEPT_SUCCESS',
  ADMISSION_FETCH_BY_DEPT_FAILED: 'ADMISSION_FETCH_BY_DEPT_FAILED',

  ADMISSION_FETCH_REQUEST: 'ADMISSION_FETCH_REQUEST',
  ADMISSION_FETCH_SUCCESS: 'ADMISSION_FETCH_SUCCESS',
  ADMISSION_FETCH_FAILED: 'ADMISSION_FETCH_FAILED',

  FETCH_AVAILABLE_BEDS_REQUEST: 'FETCH_AVAILABLE_BEDS_REQUEST',
  FETCH_AVAILABLE_BEDS_SUCCESS: 'FETCH_AVAILABLE_BEDS_SUCCESS',
  FETCH_AVAILABLE_BEDS_FAILED: 'FETCH_AVAILABLE_BEDS_FAILED',

  ADMISSION_ADD_REQUEST: 'ADMISSION_ADD_REQUEST',
  ADMISSION_ADD_SUCCESS: 'ADMISSION_ADD_SUCCESS',
  ADMISSION_ADD_FAILED: 'ADMISSION_ADD_FAILED',

  ADMISSION_EDIT_REQUEST: 'ADMISSION_EDIT_REQUEST',
  ADMISSION_EDIT_SUCCESS: 'ADMISSION_EDIT_SUCCESS',
  ADMISSION_EDIT_FAILED: 'ADMISSION_EDIT_FAILED',

  ADMISSION_CANCEL_REQUEST: 'ADMISSION_CANCEL_REQUEST',
  ADMISSION_CANCEL_SUCCESS: 'ADMISSION_CANCEL_SUCCESS',
  ADMISSION_CANCEL_FAILED: 'ADMISSION_CANCEL_FAILED',

  ADMISSION_DISCHARGE_REQUEST: 'ADMISSION_DISCHARGE_REQUEST',
  ADMISSION_DISCHARGE_SUCCESS: 'ADMISSION_DISCHARGE_SUCCESS',
  ADMISSION_DISCHARGE_FAILED: 'ADMISSION_DISCHARGE_FAILED',

  SELECT_IPD_DEPARTMENT: 'SELECT_IPD_DEPARTMENT',

  SELECT_ADMISSION: 'SELECT_ADMISSION',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchVisitRequest = () => ({
  type: actions.VISIT_FETCH_REQUEST,
});
export const fetchVisitSuccess = data => ({
  type: actions.VISIT_FETCH_SUCCESS,
  payload: data,
});
export const fetchVisitFailed = error => ({
  type: actions.VISIT_FETCH_FAILED,
  payload: error,
});

export const fetchRequest = () => ({
  type: actions.ADMISSION_FETCH_REQUEST,
});
export const fetchSuccess = data => ({
  type: actions.ADMISSION_FETCH_SUCCESS,
  payload: data,
});
export const fetchFailed = error => ({
  type: actions.ADMISSION_FETCH_FAILED,
  payload: error,
});

export const fetchAllRequest = () => ({
  type: actions.ADMISSION_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.ADMISSION_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.ADMISSION_FETCH_ALL_FAILED,
  payload: error,
});

export const fetchByDeptRequest = () => ({
  type: actions.ADMISSION_FETCH_BY_DEPT_REQUEST,
});
export const fetchByDeptSuccess = data => ({
  type: actions.ADMISSION_FETCH_BY_DEPT_SUCCESS,
  payload: data,
});
export const fetchByDeptFailed = error => ({
  type: actions.ADMISSION_FETCH_BY_DEPT_FAILED,
  payload: error,
});

export const fetchAvailableBedsRequest = () => ({
  type: actions.FETCH_AVAILABLE_BEDS_REQUEST,
});
export const fetchAvailableBedsSuccess = data => ({
  type: actions.FETCH_AVAILABLE_BEDS_SUCCESS,
  payload: data,
});
export const fetchAvailableBedsFailed = error => ({
  type: actions.FETCH_AVAILABLE_BEDS_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.ADMISSION_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.ADMISSION_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.ADMISSION_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.ADMISSION_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.ADMISSION_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.ADMISSION_EDIT_FAILED,
  payload: error,
});

export const cancelRequest = () => ({
  type: actions.ADMISSION_CANCEL_REQUEST,
});
export const cancelSuccess = data => ({
  type: actions.ADMISSION_CANCEL_SUCCESS,
  payload: data,
});
export const cancelFailed = error => ({
  type: actions.ADMISSION_CANCEL_FAILED,
  payload: error,
});

export const dischargeRequest = () => ({
  type: actions.ADMISSION_DISCHARGE_REQUEST,
});
export const dischargeSuccess = data => ({
  type: actions.ADMISSION_DISCHARGE_SUCCESS,
  payload: data,
});
export const dischargeFailed = error => ({
  type: actions.ADMISSION_DISCHARGE_FAILED,
  payload: error,
});

export const selectDepartment = data => ({
  type: actions.SELECT_IPD_DEPARTMENT,
  payload: data,
});

export const selectAdmission = data => ({
  type: actions.SELECT_ADMISSION,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetchVisit = id => (dispatch) => {
  dispatch(fetchVisitRequest());
  service
    .getVisit(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchVisitSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchVisitFailed(error));
    });
};

export const fetch = appointmentId => (dispatch) => {
  dispatch(fetchRequest());
  service
    .getAdmission(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchFailed(error));
    });
};

export const fetchAll = (fromDate, toDate) => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllAdmissions(fromDate, toDate)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const fetchByDept = deptId => (dispatch) => {
  dispatch(fetchByDeptRequest());
  service
    .getAdmittedPatientsByDept(deptId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchByDeptSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchByDeptFailed(error));
    });
};

export const fetchAvailableBeds = deptId => (dispatch) => {
  dispatch(fetchAvailableBedsRequest());
  service
    .getAvailableBeds(deptId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAvailableBedsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAvailableBedsFailed(error));
    });
};

export const addAdmission = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editAdmission = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const cancel = data => (dispatch) => {
  dispatch(cancelRequest());
  service
    .cancelAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(cancelSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(cancelFailed(error));
    });
};

export const discharge = data => (dispatch) => {
  dispatch(dischargeRequest());
  service
    .dischargeAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(dischargeSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(dischargeFailed(error));
    });
};
