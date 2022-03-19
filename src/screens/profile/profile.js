import profile from './profile.tmpl.pug';

const profileMock = {
    handleAvatarCLick: () => alert('Привет!!!'),
    email: 'pochta@yandex.ru!'
};

document.querySelector('#root').innerHTML = profile(profileMock);