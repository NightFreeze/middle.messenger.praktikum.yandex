import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import type { IBadRequest } from './models';

const userAPIInstance = new HTTP(`${API_HOST}/user`);

interface IProfile {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

interface IProfileRequest {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

type TProfileResponse = IProfile | IBadRequest;

type IProfileAvatarRequest = FormData;

interface ISearchRequest {
    login: string;
}

type TSearchResponse = IProfile[] | IBadRequest;

export interface IPasswordRequest {
    oldPassword: string;
    newPassword: string;
}

type TPasswordResponse = string | IBadRequest;

export class UserApi extends BaseAPI {
    public profile(user: IProfileRequest) {
        return userAPIInstance
            .put<IProfileRequest, TProfileResponse>('/profile', {
                data: user,
            })
            .then((res) => res);
    }

    public avatar(avatar: IProfileAvatarRequest) {
        return userAPIInstance
            .put<IProfileAvatarRequest, TProfileResponse>('/profile/avatar', {
                data: avatar,
                // undefined для корректной подстановки boundary в заголовок content-type
                // @ts-ignore
                headers: { 'content-type': undefined },
            })
            .then((res) => res);
    }

    public search(data: ISearchRequest) {
        return userAPIInstance
            .post<ISearchRequest, TSearchResponse>('/search', {
                data,
            })
            .then((res) => res);
    }

    public password(data: IPasswordRequest) {
        return userAPIInstance
            .put<IPasswordRequest, TPasswordResponse>('/password', {
                data,
            })
            .then((res) => res);
    }
}
