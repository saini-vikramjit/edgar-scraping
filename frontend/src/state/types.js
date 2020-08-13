const prefix = '@@edgar/';

export default {

    // Compute
    GET_COMPUTE: `${prefix}get-compute`,
    SAVE_REQUEST_PAYLOAD: `${prefix}save-request-payload`,
    INIT_RESPONSE_ARR: `${prefix}init-response-arr`,
    INPROGRESS_RESPONSE_ARR: `${prefix}inprogress-response-arr`,
    SUCCESS_RESPONSE_ARR: `${prefix}success-response-arr`,
    FAIL_RESPONSE_ARR: `${prefix}fail-response-arr`,
    RESET_COMPUTE_DATA: `${prefix}reset-compute-data`,
    SHOW_COMPUTE_RESULTS: `${prefix}show-compute-results`,
    RETRY_RESPONSE_ARR: `${prefix}retry-response-arr`,
    UPDATE_COMPUTING_FLAG: `${prefix}update-computing-flag`,

    // Release
    UPDATE_RELEASE: `${prefix}update-release`,

    // Progress bar
    SHOW_PROGRESS_BAR: `${prefix}show-progress-bar`,
    RESET_PROGRESS_BAR: `${prefix}reset-progress-bar`,
    SET_PROGRESS: `${prefix}set-progress`,
};
