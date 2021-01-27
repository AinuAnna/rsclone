import './sass/style.scss';
import Auth from './utils/Authorization/auth';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Event from './events';

const loginSignUp = new LoginSignUp(document.getElementById('login'));
loginSignUp.renderM();

const event = new Event();
event.renderValidSignUp();

const auth = new Auth();
auth.goSignUp();
auth.goLogout();
