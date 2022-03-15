// import myTest from '../components/test.tmpl.pug';

// document.querySelector('#root').innerHTML = myTest({name: 'QWERTY'});

import signIn from '../screens/signIn/signIn.tmpl.pug';
import signUp from '../screens/signUp/signUp.tmpl.pug';
import errorPage from '../screens/errors/errorScreen.tmpl.pug';
import chat from '../screens/chat/chat.tmpl.pug'

// document.querySelector('#root').innerHTML = errorPage({ errorCode: '500', errorText: 'уже фиксим!' });
document.querySelector('#root').innerHTML = signUp();