import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import userAvatarChange from './user-avatar-change.tmpl.pug';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { Button } from '~src/components/button/button';
import LeftNavigationButton from '~src/components/left-navigation-button/left-navigation-button';
import { UserAvatarChangeController } from './user-avatar-change.controller';
import './user-avatar-change.scss';
import { PagesPath } from '~src/utils/constants';

const withStore = connect((state) => ({ state }));

class UserAvatarChange extends Block {
    userAvatarChangeController;

    constructor() {
        super('main');

        this.userAvatarChangeController = new UserAvatarChangeController();
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    protected getChildren(): Record<string, Block> {
        const leftNavigationButton = new LeftNavigationButton({ path: PagesPath.USER });

        const fileField = new ValidatedInput({
            isValid: true,
            placeholder: 'Выберите файл на компьютере',
            name: 'avatar',
            id: 'avatar',
            type: 'file',
            classNames: 'input-field__input',
        });

        const submitButton = new Button({
            text: 'Сохранить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();

                    const userAvatarForm =
                        document.getElementById('user-avatar-change');
                    const form = new FormData(userAvatarForm);

                    this.userAvatarChangeController.avatar(form);
                },
            },
        });

        return {
            leftNavigationButton,
            fileField,
            submitButton,
        };
    }

    public render() {
        return this.compile(userAvatarChange);
    }
}

export default withStore(UserAvatarChange);
