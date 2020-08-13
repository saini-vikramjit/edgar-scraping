// CONSTANTS
import types from '../types';

const initialState = {
    showProgressBar: false,
    progress: 0,
    totalRequest: 0,
    failedRequestArr: [],
};

export default function progressReducer(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_PROGRESS_BAR:
            return {
                ...state,
                showProgressBar: action.payload.data,
            };

        case types.SET_PROGRESS:
            return {
                ...state,
                progress: action.payload.data,
            };

        case types.RESET_PROGRESS_BAR:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}
