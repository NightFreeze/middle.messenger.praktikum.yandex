import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import type { IBadRequest } from './models';

const authAPIInstance = new HTTP(`${API_HOST}/auth`);

interface LoginRequest {
    login: string;
    password: string;
}

type TLoginResponse = string | IBadRequest;

type TUserResponse =
    | {
          id: number;
          first_name: string;
          second_name: string;
          display_name: string;
          login: string;
          email: string;
          phone: string;
          avatar: string;
      }
    | IBadRequest;

interface ISignupRequest {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}
type TSignupResponse = { id: number } | IBadRequest;

export class AuthApi extends BaseAPI {
    public signin(data: LoginRequest) {
        return authAPIInstance
            .post<LoginRequest, TLoginResponse>('/signin', {
                data,
            })
            .then((res) => res);
    }

    public signup(data: ISignupRequest) {
        return authAPIInstance
            .post<ISignupRequest, TSignupResponse>('/signup', {
                data,
            })
            .then((res) => res);
    }

    public user() {
        return authAPIInstance
            .get<{}, TUserResponse>('/user')
            .then((res) => res);
    }

    public logout() {
        return authAPIInstance.post<{}, string>('/logout').then((res) => res);
    }
}
