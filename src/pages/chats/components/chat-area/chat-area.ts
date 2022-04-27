import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import singleModal from '~src/components/single-modal/single-modal';
import ChatUsersForm from '../chat-users-form/chat-users-form';
import MessagesList from '../messages-list/messages-list';
import MessagesForm from '../messages-form/messages-form';
import { AuthController } from '~src/controllers/auth.controller';
import { ChatAreaController } from './chat-area.controller';
import chatAreaTemplate from './chat-area.tmpl.pug';
import hamburgerImage from '../../../../../static/images/hamburger.svg';
import './chat-area.scss';

const withStore = connect((state) => ({
    chatId: state.chatId || null,
    chat: state?.chats && state?.chatId ? state.chats.find(({ id }) => id === state.chatId) : null,
    chatCommonReq: state.chatCommonReq,
}));

export class ChatArea extends Block {
    authController;
    chatsAreaController;

    constructor() {
        super('div');

        this.setState({ chatId: null });

        this.authController = new AuthController();
        this.chatsAreaController = new ChatAreaController();
    }

    protected getEvents(): Record<string, (e: Event) => void> {
        return {
            click: (event) => {
                if (
                    event.target.matches('.chat-menu__hamburger') ||
                    event.target.closest('.chat-menu__hamburger')
                ) {
                    singleModal.show(new ChatUsersForm());
                }
            },
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'chat-wrapper',
        };
    }

    protected getChildren(): Record<string, Block> {
        const messagesList = new MessagesList();
        const messagesForm = new MessagesForm({
            events: {
                submit: (event) => {
                    event.preventDefault();
                    const input =
                        event.target.querySelector('[name="message"]');

                    const message = input.value;
                    input.value = '';

                    this.chatsAreaController.sendMessage({ chatId: this.props.chatId, message });
                },
            },
        });

        return {
            messagesList,
            messagesForm,
        };
    }

    public async componentDidMount() {
        await this.authController.checkAuth();
        await this.chatsAreaController.getToken();
        await this.chatsAreaController.initChat();
    }

    public render(): DocumentFragment {
        return this.compile(chatAreaTemplate, { chat: this.props.chat, hamburgerImage });
    }
}

export default withStore(ChatArea);
