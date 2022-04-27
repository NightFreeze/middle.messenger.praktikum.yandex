import { Block } from '~src/utils/block';
import '../index.scss';
import './user-settings.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import registrationTemplate from './user-settings.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '~src/components/button/button';
import { ValidationNames } from '~src/utils/validator';
import { UserSettingsController } from './user-settings.controller';
import { UserController } from '../user/user.controller';
import { connect } from '~src/utils/connect';
import LeftNavigationButton from '~src/components/left-navigation-button/left-navigation-button';
import '~src/components/left-navigation-button/left-navigation-button.scss';
import { PagesPath } from '~src/utils/constants';

const withState = connect((state) => ({
    user: state.user,
    profileReq: state.profileReq,
}));

export class UserSettings extends Block {
    userSettingsController;

    userController;

    constructor() {
        super('main');

        this.userSettingsController = new UserSettingsController();
        this.userController = new UserController();
    }

    protected getChildren(): Record<string, Block> {
        const leftNavigationButton = new LeftNavigationButton({ path: PagesPath.USER });

        const emailField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.EMAIL,
            placeholder: 'Почта',
            name: 'email',
            type: 'email',
            classNames: 'input-field__input',
        });

        const loginField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.LOGIN,
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
            classNames: 'input-field__input',
        });

        const firstNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Имя',
            name: 'first_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const secondNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Фамилия',
            name: 'second_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const displayNameField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.NAME,
            placeholder: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            classNames: 'input-field__input',
        });

        const phoneField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PHONE,
            placeholder: 'Телефон',
            name: 'phone',
            type: 'tel',
            classNames: 'input-field__input',
        });

        const validatedInputList: ValidatedInput[] = [
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            displayNameField,
            phoneField,
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

                    this.userSettingsController.changeProfile({
                        first_name: firstNameField.value,
                        second_name: secondNameField.value,
                        display_name: displayNameField.value,
                        login: loginField.value,
                        email: emailField.value,
                        phone: phoneField.value,
                    });
                },
            },
        });

        return {
            leftNavigationButton,
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            displayNameField,
            phoneField,
            submitButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    async componentDidMount() {
        await this.userController.getUser();

        this.children.emailField.setValue(this.props?.user?.email);
        this.children.loginField.setValue(this.props?.user?.login);
        this.children.firstNameField.setValue(this.props?.user?.first_name);
        this.children.secondNameField.setValue(this.props?.user?.second_name);
        this.children.displayNameField.setValue(this.props?.user?.display_name);
        this.children.phoneField.setValue(this.props?.user?.phone);
    }

    public render(): DocumentFragment {
        return this.compile(registrationTemplate, this.props);
    }
}

export default withState(UserSettings);
