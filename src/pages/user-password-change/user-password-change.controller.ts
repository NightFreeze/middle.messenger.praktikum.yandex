import { UserApi, IPasswordRequest } from '~src/api/user.api';
import { validate, ValidationNames } from '~src/utils/validator';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';
import { Router } from '~src/utils/router';

const userApi = new UserApi();

export class UserPasswordChangeController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async changePassword(data: IPasswordRequest) {
        try {
            const validateOldPassword = validate(
                ValidationNames.PASSWORD,
                data.oldPassword
            );
            const validateNewPassword = validate(
                ValidationNames.PASSWORD,
                data.newPassword
            );

            if (!validateOldPassword.isValid || !validateNewPassword.isValid) {
                throw new Error('Заполните обязательные поля');
            }

            store.set('changePasswordReq', {
                isLoading: true,
                errorMessage: '',
            });

            const passwordResponse = await userApi.password(data);

            store.set('changePasswordReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (passwordResponse.status !== 200) {
                throw new Error(
                    passwordResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            this.router.go(PagesPath.USER);
        } catch (e) {
            store.set('changePasswordReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
