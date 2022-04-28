import { Router } from '~src/utils/router';
import Login from './login/login';
import Registration from './registration/registration';
import { NotFound } from './not-found/not-found';
import { ServerError } from './server-error/server-error';
import User from './user/user';
import UserSettings from './user-settings/user-settings';
import UserPasswordChange from './user-password-change/user-password-change';
import UserAvatarChange from './user-avatar-change/user-avatar-change';
import Chats from './chats/chats';
import { Tooltip } from '~src/components/tooltip/tooltip';
import { PagesPath } from '~src/utils/constants';

const tooltip = new Tooltip();
tooltip.attachClick(document.body);

const router = new Router('#app');

router
    .use(PagesPath.MAIN, Login)
    .use(PagesPath.LOGIN, Login)
    .use(PagesPath.REGISTRATION, Registration)
    .use(PagesPath.CHATS, Chats)
    .use(PagesPath.USER, User)
    .use(PagesPath.USER_SETTINGS, UserSettings)
    .use(PagesPath.USER_PASSWORD, UserPasswordChange)
    .use(PagesPath.USER_AVATAR, UserAvatarChange)
    .use(PagesPath.SERVER_ERROR, ServerError)
    .use('*', NotFound)
    .start();
