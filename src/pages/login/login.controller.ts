import { AuthApi } from '~src/api/auth.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new AuthApi();

export class LoginController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async login(data: LoginFormModel) {
        try {
            const validateLogin = validate(ValidationNames.LOGIN, data.login);
            const validatePassword = validate(
                ValidationNames.PASSWORD,
                data.password
            );

            if (!validateLogin.isValid || !validatePassword.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('signinReq', { isLoading: true, errorMessage: '' });

            const loginResponse = await loginApi.signin(data);

            store.set('signinReq', { isLoading: false, errorMessage: '' });

            if (loginResponse.status === 400) {
                this.router.go(PagesPath.CHATS);
            }

            if (loginResponse.status !== 200) {
                throw new Error(
                    loginResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            this.router.go(PagesPath.CHATS);
        } catch (e) {
            store.set('signinReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
