import { Block } from '~src/utils/block';
import { LoginController } from './login.controller';
import { AuthController } from '~src/controllers/auth.controller';
import '../index.scss';
import './login.scss';
import { Input } from '~src/components/input/Input';
import loginTemplate from './login.tmpl.pug';
import ValidatedInput from '~src/components/input-validator/input-validator';
import { Button } from '~src/components/button/button';
import { ValidationNames } from '~src/utils/validator';
import { Router } from '~src/utils/router';
import { connect } from '~src/utils/connect';
import { PagesPath } from '~src/utils/constants';

interface ILoginProps {
    loginField: Input;
    passwordField: Input;
}

const withLoginApi = connect((state) => ({
    user: { ...state.user },
    signinReq: { ...state.signinReq },
}));

export class Login extends Block<ILoginProps> {
    loginController;
    authController;
    router;

    constructor() {
        super('main');

        this.authController = new AuthController();
        this.loginController = new LoginController();
        this.router = new Router('');
    }

    protected getChildren(): Record<string, Block> {
        const loginField = new ValidatedInput({
            isValid: false,
            validationName: ValidationNames.LOGIN,
            placeholder: 'Логин',
            name: 'login',
            type: 'text',
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

        const submitButton = new Button({
            text: 'Войти',
            className: 'blue',
            events: {
                click: (event) => {
                    event.preventDefault();
                    loginField.validate();
                    passwordField.validate();

                    this.loginController.login({
                        login: loginField.value,
                        password: passwordField.value,
                    });
                },
            },
        });

        const registrationButton = new Button({
            text: 'Зарегистрироваться',
            className: 'white',
            href: '/registration',
            events: {
                click: (event) => {
                    event.preventDefault();

                    this.router.go(PagesPath.REGISTRATION);
                },
            },
        });

        return {
            loginField,
            passwordField,
            submitButton,
            registrationButton,
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
        return this.compile(loginTemplate, this.props);
    }
}

export default withLoginApi(Login);
