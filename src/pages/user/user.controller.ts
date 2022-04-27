import { AuthApi } from '~src/api/auth.api';
import { Router } from '~src/utils/router';
import store from '~src/utils/store';
import { PagesPath } from '~src/utils/constants';

const loginApi = new AuthApi();

export class UserController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async getUser() {
        try {
            const userResponse = await loginApi.user();

            if (userResponse.status === 401) {
                this.router.go(PagesPath.LOGIN);
                return;
            }

            if (userResponse.status !== 200) {
                throw new Error(userResponse.response?.reason);
            }

            store.set('user', userResponse.response);
        } catch (e) {
            console.error(e);
        }
    }

    public async logout() {
        try {
            const logoutResponse = await loginApi.logout();

            if (logoutResponse.status !== 200) {
                throw new Error(logoutResponse.response.reason);
            }

            store.set('user', undefined)
            this.router.go(PagesPath.LOGIN);
        } catch (e) {
            console.error(e);
        }
    }
}
