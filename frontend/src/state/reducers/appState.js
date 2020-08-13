// LODASH
// import { has, toString } from 'lodash';

// CONSTANTS
import types from '../types';

// Utilies
const initialState = {
    release: '',
    requestPayload: null,
    responseArr: [],
    showResults: false,
    computingFlag: false,
};

export default function appStateReducer(state = initialState, action) {
    switch (action.type) {
        // Compute
        case types.SAVE_REQUEST_PAYLOAD:
            return {
                ...state,
                requestPayload: action.payload.data,
            };

        case types.SHOW_COMPUTE_RESULTS:
            return {
                ...state,
                showResults: true,
            };

        case types.RESET_COMPUTE_DATA:
            return {
                ...state,
                requestPayload: null,
                responseArr: [],
                showResults: false,
            };

        case types.UPDATE_COMPUTING_FLAG:
            return {
                ...state,
                computingFlag: action.payload.data,
            };

        // Release
        case types.UPDATE_RELEASE:
            return {
                ...state,
                release: action.payload.data,
            };

        default:
            return state;
    }
}
