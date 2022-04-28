import { ChatsApi, ICreateChatsRequest } from '~src/api/chats.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { queryString } from '~src/utils/query-string';
import { PagesPath } from '~src/utils/constants';

const chatsApi = new ChatsApi();

export class CreateChatFormController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async create(data: ICreateChatsRequest) {
        try {
            const validateTitle = validate(ValidationNames.MESSAGE, data.title);

            if (!validateTitle.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('createChatReq', { isLoading: true, errorMessage: '' });

            const createChatResponse = await chatsApi.createChat(data);

            store.set('createChatReq', { isLoading: false, errorMessage: '' });

            if (createChatResponse.status !== 200) {
                throw new Error(
                    createChatResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            this.router.go(
                `${PagesPath.CHATS}?${queryString({
                    chat_id: createChatResponse.response.id,
                })}`
            );
        } catch (e) {
            store.set('createChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
