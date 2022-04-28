import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import userPasswordChange from './user-password-change.tmpl.pug';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { ValidationNames } from '~src/utils/validator';
import { Button } from '~src/components/button/button';
import LeftNavigationButton from '~src/components/left-navigation-button/left-navigation-button';
import { UserPasswordChangeController } from './user-password-change.controller';
import { PagesPath } from '~src/utils/constants';

const withStore = connect((state) => ({ state }));

class UserPasswordChange extends Block {
    userPasswordChangeController;

    constructor() {
        super('main');

        this.userPasswordChangeController = new UserPasswordChangeController();
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    protected getChildren(): Record<string, Block> {
        const leftNavigationButton = new LeftNavigationButton({ path: PagesPath.USER });

        const oldPasswordField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PASSWORD,
            placeholder: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            classNames: 'input-field__input',
        });

        const newPasswordField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PASSWORD,
            placeholder: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            classNames: 'input-field__input',
        });

        const validatedInputList: ValidatedInput[] = [
            oldPasswordField,
            newPasswordField,
        ];

        const submitButton = new Button({
            text: 'Сохранить',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    validatedInputList.forEach((input) => {
                        input.validate();
                    });

                    this.userPasswordChangeController.changePassword({
                        oldPassword: oldPasswordField.value,
                        newPassword: newPasswordField.value,
                    });
                },
            },
        });

        return {
            leftNavigationButton,
            oldPasswordField,
            newPasswordField,
            submitButton,
        };
    }

    public render() {
        return this.compile(userPasswordChange);
    }
}

export default withStore(UserPasswordChange);
