import './sass/style.scss';
import Auth from './utils/Authorization/auth';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Event from './events';

const loginSignUp = new LoginSignUp(document.getElementById('login'));
loginSignUp.renderLogin();

const event = new Event();
event.renderValidLogin();

const auth = new Auth();
auth.goLogin();
auth.goLogout();
