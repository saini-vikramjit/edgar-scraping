// CONSTANTS
import types from '../types';

export const showResults = () => ({
    type: types.SHOW_COMPUTE_RESULTS,
});

export const saveRequestPayload = (data) => ({
    type: types.SAVE_REQUEST_PAYLOAD,
    payload: {
        data,
    },
});

export const initResponseArr = (data) => ({
    type: types.INIT_RESPONSE_ARR,
    payload: {
        data,
    },
});

export const inprogressResponseArr = (id, status) => ({
    type: types.INPROGRESS_RESPONSE_ARR,
    payload: {
        id, status,
    },
});

export const successResponseArr = (id, data, status) => ({
    type: types.SUCCESS_RESPONSE_ARR,
    payload: {
        id, data, status,
    },
});

export const failResponseArr = (id, error, status) => ({
    type: types.FAIL_RESPONSE_ARR,
    payload: {
        id, error, status,
    },
});

export const resetComputeData = () => ({
    type: types.RESET_COMPUTE_DATA,
});

// Release
export const updateRelease = (data) => ({
    type: types.UPDATE_RELEASE,
    payload: {
        data,
    },
});

export const updateComputingFlag = (data) => ({
    type: types.UPDATE_COMPUTING_FLAG,
    payload: {
        data,
    },
});
