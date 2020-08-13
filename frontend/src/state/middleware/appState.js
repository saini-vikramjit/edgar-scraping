// LODASH
import { toString, isNull } from 'lodash';

// AXIOS
import { instance as axios } from '../axios';

// ACTION CREATIONS
import {
    successResponseArr, inprogressResponseArr,
    failResponseArr, retryResponseArr,
} from '../actions/appState';

const makeAsyncCall = ((release, payload, token) => {
    return new Promise((resolve) => {
        const url = !isNull(token) ? `/${release}/api/compute?sid=${token}` : `/${release}/api/compute`;
        axios({
            method: 'POST',
            url,
            data: { profile_model: payload },
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            resolve(error);
        });
    });
});

// Preparing the request data as per range flag
const perpareRequestPayload = (obj, requestPayload) => {
    const { range } = obj;
    if (range) {
        const { rangeParam, rangeParamValue, rangeParamParent } = obj;

        let modifiedRequestPayload;
        if (rangeParam === 'cht') {
            modifiedRequestPayload = {
                ...requestPayload,
                call_mix_model: {
                    ...requestPayload.call_mix_model,
                    cht: rangeParamValue,
                },
            };
        } else if (rangeParam === 'bhcaSubscriber') {
            modifiedRequestPayload = {
                ...requestPayload,
                call_mix_model: {
                    ...requestPayload.call_mix_model,
                    bhca_per_sub: rangeParamValue,
                },
            };
        } else if (rangeParam === 'internalRegistration') {
            modifiedRequestPayload = {
                ...requestPayload,
                call_mix_model: {
                    ...requestPayload.call_mix_model,
                    registration_interval: rangeParamValue,
                },
            };
        } else if (rangeParam === 'externalRegistration') {
            modifiedRequestPayload = {
                ...requestPayload,
                call_mix_model: {
                    ...requestPayload.call_mix_model,
                    refresh_interval: rangeParamValue,
                },
            };
        } else if (rangeParam === 'numSessions') {
            modifiedRequestPayload = {
                ...requestPayload,
                deployment_model: {
                    ...requestPayload.deployment_model,
                    session: rangeParamValue,
                },
            };
        } else if (rangeParam === 'numSubscribers') {
            modifiedRequestPayload = {
                ...requestPayload,
                deployment_model: {
                    ...requestPayload.deployment_model,
                    subscriber: rangeParamValue,
                },
            };
        } else if (rangeParam === 'numCpus') {
            modifiedRequestPayload = {
                ...requestPayload,
                deployment_model: {
                    ...requestPayload.deployment_model,
                    [rangeParamParent]: {
                        ...requestPayload.deployment_model[rangeParamParent],
                        vcpus_per_vms: rangeParamValue,
                    },
                },
            };
        }
        return modifiedRequestPayload;
    }
    return requestPayload;
};

// Individual request to reload
export const retryRequest = (id) => (async (dispatch, getState) => {
    dispatch(retryResponseArr(id));

    const {
        release, responseArr, requestPayload, token,
    } = getState().appState;
    const filterRecord = responseArr.filter((arr) => arr.id === id);
    const obj = filterRecord[0];

    dispatch(inprogressResponseArr(obj.id, 'In Progress'));
    const payload = await perpareRequestPayload(obj, requestPayload);
    const response = await makeAsyncCall(release, payload, token);

    const { status, data } = response;
    if (status === 200) {
        dispatch(successResponseArr(obj.id, data, 'Success'));
    } else {
        const errorLog = { status: false, data: toString(response.message) };
        dispatch(failResponseArr(obj.id, errorLog, 'Failure'));
    }
});
