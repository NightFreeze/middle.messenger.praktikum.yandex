import signIn from '../screens/signIn/signIn.tmpl.pug';
import signUp from '../screens/signUp/signUp.tmpl.pug';
import errorPage from '../screens/error404/errorScreen.tmpl.pug';
import chat from '../screens/chat/chat.tmpl.pug';
import profile from '../screens/profile/profile.tmpl.pug';
import screenMock from '../screens/screenMock/screenMock.tmpl.pug';

const renderPage = (page, params) => {
    document.querySelector('#root').innerHTML = "";
    if (params) {
        document.querySelector('#root').innerHTML = page(params);
    } else {
        document.querySelector('#root').innerHTML = page();
    }
};

window.renderPage = renderPage;
window.pages = {screenMock, signIn, signUp, errorPage, chat, profile};

const pages = [
    {
        title: 'Авторизация',
        handleClick: () => renderPage(window.pages.signIn)
    },
    {
        title: 'Регистрация',
        handleClick: () => renderPage(window.pages.signUp)
    },
    {
        title: 'Ошибка 5**',
        handleClick: () => renderPage(window.pages.errorPage, { errorCode: '500', errorText: 'уже фиксим!' })
    },
    {
        title: 'Ошибка 404',
        handleClick: () => renderPage(window.pages.errorPage, { errorCode: '404', errorText: 'Не туда попали' })
    },
    {
        title: 'Чат (заглушка)',
        handleClick: () => renderPage(window.pages.chat)
    },
    {
        title: 'Профиль',
        handleClick: () => renderPage(window.pages.profile)
    },
];

document.querySelector('#root').innerHTML = screenMock({pages});