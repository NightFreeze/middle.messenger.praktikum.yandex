import { BaseAPI } from '~src/utils/base-api';
import { HTTPTransport as HTTP } from '~src/utils/request';
import { API_HOST } from '~src/utils/constants';
import type { IBadRequest } from './models';

const chatsAPIInstance = new HTTP(`${API_HOST}/chats`);

interface IGetChatsRequest {
    offset?: number;
    limit?: number;
    title?: string;
}
interface IGetChatsResponse {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}
export interface ICreateChatsRequest {
    title: string;
}
interface IDeleteChatsRequest {
    chatId: number;
}
interface IDeleteChatsResponse {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    };
}
interface IGetChatUsersRequest {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}
interface IGetChatUsersResponse {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
}

export class ChatsApi extends BaseAPI {
    public getChats(data?: IGetChatsRequest) {
        return chatsAPIInstance
            .get<IGetChatsRequest, IGetChatsResponse[]>('', {
                data,
            })
            .then((res) => res);
    }

    public createChat(data: ICreateChatsRequest) {
        return chatsAPIInstance
            .post<ICreateChatsRequest, string | IBadRequest>('', {
                data,
            })
            .then((res) => res);
    }

    public deleteChat(data: IDeleteChatsRequest) {
        return chatsAPIInstance
            .delete<IDeleteChatsRequest, IDeleteChatsResponse>('', {
                data,
            })
            .then((res) => res);
    }

    public getChatCommon(data: { id: number }) {
        return chatsAPIInstance
            .get<{ id: number }, IGetChatsResponse>(`/${data.id}/common`)
            .then((res) => res);
    }

    public getChatUsers(data: IGetChatUsersRequest) {
        return chatsAPIInstance
            .get<IGetChatUsersRequest, IGetChatUsersResponse[]>(
                `/${data.id}/users`
            )
            .then((res) => res);
    }

    public getToken(data: { id: number }) {
        return chatsAPIInstance
            .post<{ id: number }, { token: string }>(`/token/${data.id}`)
            .then((res) => res);
    }
}
