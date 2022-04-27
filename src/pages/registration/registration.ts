import { Block } from '~src/utils/block';
import { connect } from '~src/utils/connect';
import '../index.scss';
import './registration.scss';
import '../../components/form/form.scss';
import '../../components/input/input.scss';
import '../../components/input-validator/input-validator.scss';
import '../../components/button/button.scss';
import { Input } from '~src/components/input/Input';
import registrationTemplate from './registration.tmpl.pug';
import ValidatedInput from '../../components/input-validator/input-validator';
import { Button } from '~src/components/button/button';
import { ValidationNames } from '~src/utils/validator';
import { RegistrationController } from './registration.controller';
import { PagesPath } from '~src/utils/constants';
import { Router } from '~src/utils/router';
import { AuthController } from '~src/controllers/auth.controller';

interface ILoginProps {
    loginField: Input;
    passwordField: Input;
}

const withRegistrationApi = connect((state) => ({
    signupReq: { ...state.signupReq },
}));

export class Registration extends Block<ILoginProps> {
    registrationController;
    authController;
    router;

    constructor() {
        super('main');

        this.registrationController = new RegistrationController();
        this.authController = new AuthController();
        this.router = new Router('');
    }

    protected getChildren(): Record<string, Block> {
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

        const phoneField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PHONE,
            placeholder: 'Телефон',
            name: 'phone',
            type: 'tel',
            classNames: 'input-field__input',
        });

        const passwordField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.PASSWORD,
            placeholder: 'Пароль',
            name: 'password',
            type: 'password',
            classNames: 'input-field__input',
        });

        const validatedInputList: ValidatedInput[] = [
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            passwordField,
        ];

        const submitButton = new Button({
            text: 'Зарегистрироваться',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    validatedInputList.forEach((child) => {
                        child.validate();
                    });

                    this.registrationController.signup({
                        email: emailField.value,
                        login: loginField.value,
                        first_name: firstNameField.value,
                        second_name: secondNameField.value,
                        phone: phoneField.value,
                        password: passwordField.value,
                    });
                },
            },
        });

        const loginButton = new Button({
            text: 'Войти',
            className: 'white',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.router.go(PagesPath.LOGIN);
                },
            },
        });

        return {
            emailField,
            loginField,
            firstNameField,
            secondNameField,
            phoneField,
            passwordField,
            submitButton,
            loginButton,
        };
    }

    protected getAttributes(): Record<string, string> {
        return {
            class: 'main',
        };
    }

    public async componentDidMount() {
        const isAuth = await this.authController.checkAuth();

        if (isAuth) this.router.go(PagesPath.CHATS)
    }

    public render(): DocumentFragment {
        return this.compile(registrationTemplate, this.props);
    }
}

export default withRegistrationApi(Registration);
