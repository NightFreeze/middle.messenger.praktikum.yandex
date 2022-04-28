import { Block } from '~src/utils/block';
import { Button } from '~src/components/button/button';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { connect } from '~src/utils/connect';
import { ValidationNames } from '~src/utils/validator';
import { ChatUsersFormController } from './chat-users-form.controller';
import chatUsersFormTemplate from './chat-users-form.tmpl.pug';
import './chat-users-form.scss';

export enum Views {
    MENU = 'menu',
    ADD = 'add',
    DELETE = 'delete',
    USERS = 'users',
}

const withStore = connect((state) => ({
    chatUsers: { ...state.chatUsers },
    addUserToChatReq: { ...state.addUserToChatReq },
}));

export class ChatUsersForm extends Block {
    chatUsersFormController;

    constructor() {
        super('div');

        this.setState({ view: Views.MENU });

        this.chatUsersFormController = new ChatUsersFormController();
    }

    protected getChildren(): Record<string, Block> {
        const deleteChatButton = new Button({
            className: 'white',
            text: 'Удалить чат',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.chatUsersFormController.deleteChat();
                },
            },
        });

        const addUserButton = new Button({
            className: 'white',
            text: 'Добавить пользователя',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.ADD });
                },
            },
        });

        const removeUserButton = new Button({
            className: 'white',
            text: 'Удалить пользователя',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.DELETE });
                },
            },
        });

        const usersButton = new Button({
            className: 'white',
            text: 'Пользователи',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.USERS });
                },
            },
        });

        const backButton = new Button({
            className: 'white',
            text: 'Назад',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.setState({ view: Views.MENU });
                },
            },
        });

        const loginField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.MESSAGE,
            placeholder: 'Логин',
            name: 'title',
            type: 'text',
            classNames: 'input-field__input',
        });

        const submitAddButton = new Button({
            text: 'Добавить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.chatUsersFormController.addUser({
                        login: loginField.value,
                        chatId: this.props.chatId,
                    });
                },
            },
        });

        const submitDeleteButton = new Button({
            text: 'Удалить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.chatUsersFormController.deleteUser({
                        login: loginField.value,
                        chatId: this.props.chatId,
                    });
                },
            },
        });

        return {
            usersButton,
            backButton,
            deleteChatButton,
            loginField,
            submitAddButton,
            submitDeleteButton,
            addUserButton,
            removeUserButton,
        };
    }

    public componentDidMount() {
        this.chatUsersFormController.getUsers();
    }

    public render() {
        return this.compile(chatUsersFormTemplate, {
            ...this.props,
            view: this.state?.view,
        });
    }
}

export default withStore(ChatUsersForm);
