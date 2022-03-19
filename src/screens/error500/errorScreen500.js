import errorScreen404 from './errorScreen500.tmpl.pug';

const errorScreen = {
    errorCode: '500',
    errorText: 'Уже фиксим!'
}

document.querySelector('#root').innerHTML = errorScreen404(errorScreen);