import errorScreen404 from './errorScreen404.tmpl.pug';

const errorScreen = {
    errorCode: '404',
    errorText: 'Не туда попали'
}

document.querySelector('#root').innerHTML = errorScreen404(errorScreen);