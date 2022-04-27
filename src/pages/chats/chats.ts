import { Block } from '~src/utils/block';
import ChatsList from './components/chats-list/chats-list';
import { Button } from '~src/components/button/button';
import { PagesPath } from '~src/utils/constants';
import ChatArea from './components/chat-area/chat-area';
import store from '~src/utils/store';
import chatsTemplate from './chats.tmpl.pug';
import '../index.scss';
import './chats.scss';
import { Router } from '~src/utils/router';
import { AuthController } from '~src/controllers/auth.controller';
import { getQuery } from '~src/utils/get-query';

export class Chats extends Block {
    router;

    authController;

    constructor() {
        super('div');

        this.setState({ activeChatId: null });
        this.router = new Router('');
        this.authController = new AuthController();
    }

    protected getChildren(): Record<string, Block> {
        const chatsList = new ChatsList();
        const chatArea = new ChatArea();

        const userButton = new Button({
            className: 'white',
            text: 'Профиль',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.router.go(PagesPath.USER);
                },
            },
        });

        return {
            chatsList,
            chatArea,
            userButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chats-wrapper',
        };
    }

    public async componentDidMount() {
        const isAuth = await this.authController.checkAuth();

        if (!isAuth) this.router.go(PagesPath.LOGIN)

        const chatId = getQuery('chat_id')
            ? parseInt(getQuery('chat_id'), 10)
            : null;

        store.set('chatId', chatId);
    }

    public render(): DocumentFragment {
        return this.compile(chatsTemplate);
    }
}

export default Chats;
