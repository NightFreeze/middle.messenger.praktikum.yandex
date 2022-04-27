import { AuthApi } from '~src/api/auth.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';

interface RegistrationFormModel {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

const authApi = new AuthApi();

export class RegistrationController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async signup(data: RegistrationFormModel) {
        try {
            const validateFirstName = validate(
                ValidationNames.NAME,
                data.first_name
            );
            const validateSecondName = validate(
                ValidationNames.NAME,
                data.second_name
            );
            const validateLogin = validate(ValidationNames.LOGIN, data.login);
            const validatePassword = validate(
                ValidationNames.PASSWORD,
                data.password
            );
            const validateEmail = validate(ValidationNames.EMAIL, data.email);
            const validatePhone = validate(ValidationNames.PHONE, data.phone);
            const notValidMessages = [];

            if (!validateFirstName.isValid)
                notValidMessages.push(validateFirstName.message);
            if (!validateSecondName.isValid)
                notValidMessages.push(validateSecondName.message);
            if (!validatePassword.isValid)
                notValidMessages.push(validatePassword.message);
            if (!validateLogin.isValid)
                notValidMessages.push(validateLogin.message);
            if (!validateEmail.isValid)
                notValidMessages.push(validateEmail.message);
            if (!validatePhone.isValid)
                notValidMessages.push(validatePhone.message);

            if (notValidMessages.length) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('signupReq', { isLoading: true, errorMessage: '' });

            const profileResponse = await authApi.signup(data);

            store.set('signupReq', { isLoading: false, errorMessage: '' });

            if (profileResponse.status !== 200) {
                throw new Error(
                    profileResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            this.router.go(PagesPath.CHATS);
        } catch (e) {
            store.set('signupReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
