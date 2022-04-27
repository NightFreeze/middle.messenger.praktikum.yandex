import { UserApi } from '~src/api/user.api';
import { ChatsApi } from '~src/api/chats.api';
import { ChatUsersApi } from '~src/api/chatUsers.api';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import singleModal from '~src/components/single-modal/single-modal';
import { getQuery } from '~src/utils/get-query';
import { PagesPath } from '~src/utils/constants';
import { Router } from '~src/utils/router';

const userApi = new UserApi();
const chatUsersApi = new ChatUsersApi();
const chatsApi = new ChatsApi();

export class ChatUsersFormController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async getUsers() {
        try {
            const chatId = getQuery('chat_id');

            store.set('getUsersInChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const chatsResponse = await chatsApi.getChatUsers({ id: chatId });

            store.set('getUsersInChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            store.set('chatUsers', chatsResponse.response);
        } catch (e) {
            console.error(e);
            store.set('getUsersInChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async addUser(data) {
        try {
            const validateLogin = validate(ValidationNames.MESSAGE, data.login);

            if (!validateLogin.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('addUserToChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const searchUserResponse = await userApi.search({
                login: data.login,
            });

            if (searchUserResponse.status !== 200) {
                throw new Error(
                    searchUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            if (!searchUserResponse.response.length) {
                throw new Error('Пользователь не найден');
            }

            const chatId = getQuery('chat_id');
            const addUserResponse = await chatUsersApi.addUsers({
                users: [searchUserResponse.response[0].id],
                chatId,
            });

            store.set('addUserToChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (addUserResponse.status !== 200) {
                throw new Error(
                    addUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            singleModal.hide();
        } catch (e) {
            store.set('addUserToChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async deleteUser(data) {
        try {
            const validateLogin = validate(ValidationNames.MESSAGE, data.login);

            if (!validateLogin.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('deleteUserToChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const searchUserResponse = await userApi.search({
                login: data.login,
            });

            if (searchUserResponse.status !== 200) {
                throw new Error(
                    searchUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            if (!searchUserResponse.response.length) {
                throw new Error('Пользователь не найден');
            }

            const chatId = getQuery('chat_id');
            const deleteUserResponse = await chatUsersApi.addUsers({
                users: [searchUserResponse.response[0].id],
                chatId,
            });

            store.set('deleteUserToChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (deleteUserResponse.status !== 200) {
                throw new Error(
                    deleteUserResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            singleModal.hide();
        } catch (e) {
            store.set('deleteUserToChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async deleteChat() {
        try {
            const chatId = getQuery('chat_id');

            store.set('deleteChatsReq', { isLoading: true, errorMessage: '' });

            const chatsResponse = await chatsApi.deleteChat({ chatId });

            store.set('deleteChatsReq', { isLoading: false, errorMessage: '' });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            singleModal.hide();
            this.router.go(PagesPath.CHATS);
        } catch (e) {
            console.error(e);
            store.set('deleteChatsReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
