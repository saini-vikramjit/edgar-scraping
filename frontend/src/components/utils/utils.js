// LODASH
import {
    isEmpty, replace,
} from 'lodash';

// Url parsing
export function parseUrl(url) {
    const urlArr = url.split('?');
    if (url.indexOf('?') !== -1) {
        const tempArr = urlArr[urlArr.length - 1].startsWith('sid') ? urlArr[1].split('=')[1] : null;
        return replace(tempArr, '#charts', '');
    }
    return null;
}

// String wrapping
export function stringWrap(str, maxLength = 10) {
    if (isEmpty(str) || (str.length <= maxLength)) {
        return str;
    }

    return str.substring(0, maxLength).concat('...');
}

// Index to color mapping
export const handleIndexToStyleMapping = (index, property) => {
    const colorCode = [
        'rgba(167, 167, 167, 0.22)',
        'rgb(245, 223, 210)',
        'rgb(187, 207, 228)',
        'rgb(204, 245, 201)',
        'rgb(243, 181, 181)',
        'rgb(244, 245, 201)',
        'rgb(210, 201, 245)',
        'rgb(217, 243, 243)',
        'rgb(245, 201, 236)',
        'rgb(218, 228, 228)',
    ];
    return { [property]: colorCode[index] };
};

// Status to color mapping
export const handleStatusToStyleMapping = (status, property) => {
    const colorCode = {
        PENDING: 'rgb(204, 189, 12)',
        'IN PROGRESS': 'rgb(234, 123, 9)',
        SUCCESS: 'rgb(52, 204, 33)',
        FAILURE: 'rgb(224, 33, 33)',
    };
    return { [property]: colorCode[status] };
};
