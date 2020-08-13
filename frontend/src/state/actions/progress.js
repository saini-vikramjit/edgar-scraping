// CONSTANTS
import types from '../types';

export const showProgressBar = (data) => ({
    type: types.SHOW_PROGRESS_BAR,
    payload: {
        data,
    },
});

export const resetProgressBar = () => ({
    type: types.RESET_PROGRESS_BAR,
});

export const setProgress = (data) => ({
    type: types.SET_PROGRESS,
    payload: {
        data,
    },
});
