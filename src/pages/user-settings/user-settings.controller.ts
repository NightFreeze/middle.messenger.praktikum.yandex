import { UserApi } from '~src/api/user.api';
import { Router } from '~src/utils/router';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';

interface UserSettingsFormModel {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

const userApi = new UserApi();

export class UserSettingsController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async changeProfile(data: UserSettingsFormModel) {
        try {
            const validateFirstName = validate(
                ValidationNames.NAME,
                data.first_name
            );
            const validateSecondName = validate(
                ValidationNames.NAME,
                data.second_name
            );
            const validateDisplayName = validate(
                ValidationNames.NAME,
                data.display_name
            );
            const validateLogin = validate(ValidationNames.LOGIN, data.login);
            const validateEmail = validate(ValidationNames.EMAIL, data.email);
            const validatePhone = validate(ValidationNames.PHONE, data.phone);

            if (
                !validateFirstName.isValid ||
                !validateSecondName.isValid ||
                !validateDisplayName.isValid ||
                !validateLogin.isValid ||
                !validateEmail.isValid ||
                !validatePhone.isValid
            ) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('profileReq', { isLoading: true, errorMessage: '' });

            const profileResponse = await userApi.profile(data);

            store.set('profileReq', { isLoading: false, errorMessage: '' });

            if (profileResponse.status !== 200) {
                throw new Error(
                    profileResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            store.set('user', profileResponse.response);

            this.router.go(PagesPath.USER);
        } catch (e) {
            store.set('profileReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
