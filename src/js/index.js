import myTest from '../components/test.tmpl.pug';

document.querySelector('#root').innerHTML = myTest({name: 'QWERTY'});