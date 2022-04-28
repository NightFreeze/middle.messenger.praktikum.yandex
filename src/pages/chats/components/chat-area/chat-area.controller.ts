import store from '~src/utils/store';
import { API_WS_HOST } from '~src/utils/constants';
import { ChatsApi } from '~src/api/chats.api';
import { ChatUsersApi, IChatUsersRequest } from '~src/api/chatUsers.api';

const chatsApi = new ChatsApi();
const chatUsersApi = new ChatUsersApi();

export class ChatAreaController {
    public async initChat() {
        try {
            const { chatId, user, chatsToken, chatsSocket } = store.getState();

            if (!chatId) throw new Error('Неизвестный чат');
            if (!user.id) throw new Error('Пользователь не найден');
            if (!chatsToken[chatId].token) throw new Error('Необходим токен чата');
            if (chatsSocket && Object.prototype.hasOwnProperty.call(chatsSocket, chatId)) return;

            const socket = new WebSocket(
                `${API_WS_HOST}/chats/${user.id}/${chatId}/${chatsToken[chatId].token}`
            );

            socket.addEventListener('open', () => {
                socket.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old',
                    })
                );
            });

            socket.addEventListener('message', (event) => {
                const messages = JSON.parse(event.data);

                if (messages.type === 'pong' || messages.type === 'user connected') return;

                store.set(
                    `chatsMessages.${chatId}`,
                    Array.isArray(messages)
                        ? messages
                        : [messages].concat(store.getState().chatsMessages[chatId])
                );
            });

            socket.addEventListener('error', (event) => { throw new Error(event.message)});

            setInterval(() => { socket.send(JSON.stringify({ type: 'ping' })) }, 20000);

            store.set(`chatsSocket.${chatId}`, socket);
        } catch (e) {  console.log(e); }
    }

    public sendMessage({ chatId, message }) {
        try {
            if (!chatId) throw new Error('Неизвестный чат');

            const state = store.getState();

            if (!state.chatsSocket[chatId]) throw new Error('Неизвестный чат');

            state.chatsSocket[chatId].send(
                JSON.stringify({
                    content: message,
                    type: 'message',
                })
            );
        } catch (e) {  console.log(e); }
    }

    public async getToken() {
        try {
            const { chatId, chatsToken } = store.getState();

            if (!chatId) throw new Error('Неизвестный чат');

            if (chatsToken && chatsToken[chatId]?.token) {
                return;
            }

            const tokenResponse = await chatsApi.getToken({ id: chatId });

            store.set('chatsToken', { [chatId]: tokenResponse.response });
        } catch (e) {}
    }

    public async getChatCommon({ chatId }) {
        try {
            store.set('chatCommonReq', { isLoading: true, errorMessage: '' });

            const chatsResponse = await chatsApi.getChatCommon({ id: chatId });

            store.set('chatCommonReq', { isLoading: false, errorMessage: '' });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            store.set('chatCommon', chatsResponse.response);
        } catch (e) {
            console.error(e);
            store.set('chatCommonReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }

    public async addUsers(data: IChatUsersRequest) {
        try {
            store.set('addUsersInChatReq', {
                isLoading: true,
                errorMessage: '',
            });

            const chatsResponse = await chatUsersApi.addUsers(data);

            store.set('addUsersInChatReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (chatsResponse.status !== 200) {
                throw new Error(
                    chatsResponse.response?.reason || 'Что-то пошло не так'
                );
            }
        } catch (e) {
            console.error(e);
            store.set('addUsersInChatReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
