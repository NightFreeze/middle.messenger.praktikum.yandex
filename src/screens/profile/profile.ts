import profile from './profile.tmpl.pug';

const profileMock = {
    email: 'pochta@yandex.ru',
    name: 'Иван',
    surname: 'Иванов',
    login: 'ivanivanov',
    nickname: 'Иван',
    phone: '+7 (909) 967 30 30'
};

document.querySelector('#root').innerHTML = profile(profileMock);