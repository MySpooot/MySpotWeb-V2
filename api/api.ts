import axios, { AxiosRequestConfig } from 'axios';
import * as Sentry from '@sentry/react';

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://afijgf54ce.execute-api.ap-northeast-2.amazonaws.com/prod/'
            : 'https://jsyth59asa.execute-api.ap-northeast-2.amazonaws.com/dev/'
});

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await instance(config);

        if (data.code === 200) {
            return data.data;
        }

        throw new ApiError(data.code, data.message);
    } catch (err: any) {
        // console.error(err);
        // Sentry.captureException(err, { tags: { type: 'ApiError' } });
        // throw new Error(err);
        return new Promise(resolve => resolve(err));
    }
};

class ApiError extends Error {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super();
        this.code = code;
        this.message = message;
    }
}

export const setAccessToken = (token: string) => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const clearAccessToken = () => {
    instance.defaults.headers.common['Authorization'] = '';
};
