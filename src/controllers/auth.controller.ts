import { Router } from '~src/utils/router';
import store from '~src/utils/store';
import { AuthApi } from '~src/api/auth.api';

const loginApi = new AuthApi();

export class AuthController {
    router;

    constructor() {
        this.router = new Router('');
    }

    public async checkAuth() {
        try {
            const state = store.getState();

            if (state.user) {
                return true;
            }

            const userResponse = await loginApi.user();

            if (userResponse.status === 400) {
                return true;
            }

            if (userResponse.status !== 200) {
                throw new Error(userResponse.response?.reason);
            }

            store.set('user', userResponse.response);

            return true;
        } catch (e) {
            return false;
        }
    }
}
