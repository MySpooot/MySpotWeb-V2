import { request } from '../api';
import type {
    GetMeResponse,
    LogInBody,
    LogInResponse,
    UpdateUserNicknameParams,
    UpdateUserNicknameBody,
    UpdateUserNicknameResponse,
    UpdateUserNicknameMypageBody,
    UpdateUserImgBody
} from './types';

export const getMe = () => {
    return request<GetMeResponse>({ method: 'GET', url: '/auth/me' });
};

export const logIn = (data: LogInBody) => {
    return request<LogInResponse>({ method: 'POST', url: '/auth/login', data });
};

export const logOut = () => {
    return request({ method: 'POST', url: '/auth/logout' });
};

export const updateUserNickname = ({ userId }: UpdateUserNicknameParams, body: UpdateUserNicknameBody) => {
    return request<UpdateUserNicknameResponse>({ method: 'PUT', url: `/auth/user/${userId}`, data: body });
};
export const updateUserNicknameMypage = (body: UpdateUserNicknameMypageBody) => {
    return request<UpdateUserNicknameResponse>({ method: 'put', url: `/user`, data: body });
};

export const createUserImg = (body: UpdateUserImgBody) => {
    return request<string>({
        method: 'post',
        url: '/user/upload',
        data: body.file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
