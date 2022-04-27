import { Block } from '~src/utils/block';
import { Router } from '~src/utils/router';
import { connect } from '~src/utils/connect';
import { Button } from '~src/components/button/button';
import LeftNavigationButton from '~src/components/left-navigation-button/left-navigation-button';
import Avatar from '~src/components/avatar/avatar';
import userTemplate from './user.tmpl.pug';
import { UserController } from './user.controller';
import { PagesPath } from '~src/utils/constants';
import '../index.scss';
import './user.scss';
import '~src/components/left-navigation-button/left-navigation-button.scss';
import '~src/components/avatar/avatar.scss';

const withUser = connect((state) => ({ user: state.user }));

class User extends Block {
    userController;

    router;

    constructor() {
        super('main');

        this.userController = new UserController();
        this.router = new Router('');
    }

    protected getChildren(): Record<string, Block> {
        const leftNavigationButton = new LeftNavigationButton({ path: PagesPath.CHATS });

        const avatar = new Avatar({
            changeHref: PagesPath.USER_AVATAR,
        });

        const userSettingButton = new Button({
            text: 'Изменить данные',
            className: 'white',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.router.go(PagesPath.USER_SETTINGS);
                },
            },
        });

        const passwordChangeButton = new Button({
            text: 'Изменить пароль',
            className: 'white',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.router.go(PagesPath.USER_PASSWORD);
                },
            },
        });

        const logoutButton = new Button({
            text: 'Выйти',
            className: 'white',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.userController.logout();
                },
            },
        });

        return {
            avatar,
            leftNavigationButton,
            userSettingButton,
            passwordChangeButton,
            logoutButton,
        };
    }

    componentDidMount() {
        this.userController.getUser();
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main main-user',
        };
    }

    public render(): DocumentFragment {
        const { user } = this.props;

        return this.compile(userTemplate, { user });
    }
}

export default withUser(User);
