import SignIn from './signIn/signIn';
import SignUp from './signUp/signUp';
import Error400 from './error400/error400';
import Error500 from './error500/error500';
import Profile from './profile/profile';
import Chat from './chat/chat';
import { render } from '../utils/render';

const loginPage = new SignIn();
const registrationPage = new SignUp();
const notFoundPage = new Error400();
const serverErrorPage = new Error500();
const userSettingsPage = new Profile();
const chatsPage = new Chat();
const QUERY = '#app';

switch (document.location.pathname) {
  case '/':
  case '/signin':
    render(QUERY, loginPage);
    break;
  case '/signup':
    render(QUERY, registrationPage);
    break;
  case '/chats':
    render(QUERY, chatsPage);
    break;
  case '/user-settings':
    render(QUERY, userSettingsPage);
    break;
  case '/servererror':
    render(QUERY, serverErrorPage);
    break;
  default:
    render(QUERY, notFoundPage);
}
