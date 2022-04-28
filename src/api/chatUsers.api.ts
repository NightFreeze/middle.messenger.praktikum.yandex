import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import { BaseAPI } from '~src/utils/base-api';
import type { IBadRequest } from './models';

export interface IChatUsersRequest {
    users: number[];
    chatId: number;
}
type TChatUsersResponse = string | IBadRequest;

const chatUsersAPIInstance = new HTTP(`${API_HOST}/chats/users`);

export class ChatUsersApi extends BaseAPI {
    public addUsers(data: IChatUsersRequest) {
        return chatUsersAPIInstance
            .put<IChatUsersRequest, TChatUsersResponse>('', {
                data,
            })
            .then((res) => res);
    }

    public deleteUsers(data: IChatUsersRequest) {
        return chatUsersAPIInstance
            .delete<IChatUsersRequest, TChatUsersResponse>('', {
                data,
            })
            .then((res) => res);
    }
}
