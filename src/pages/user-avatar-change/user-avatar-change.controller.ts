import { UserApi } from '~src/api/user.api';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';
import { Router } from '~src/utils/router';

const userApi = new UserApi();

export class UserAvatarChangeController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async avatar(data) {
        try {
            store.set('changeAvatarReq', {
                isLoading: true,
                errorMessage: '',
            });

            const avatarResponse = await userApi.avatar(data);

            store.set('changeAvatarReq', {
                isLoading: false,
                errorMessage: '',
            });

            if (avatarResponse.status !== 200) {
                throw new Error(
                    avatarResponse.response?.reason || 'Что-то пошло не так'
                );
            }

            this.router.go(PagesPath.USER);
        } catch (e) {
            store.set('changeAvatarReq', {
                isLoading: false,
                errorMessage: e.message,
            });
        }
    }
}
