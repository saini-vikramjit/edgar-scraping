// AXIOS
import axios from 'axios';

// Setting base config
export const instance = axios.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        put: {
            'Content-Type': 'application/json',
        },
    },
});
