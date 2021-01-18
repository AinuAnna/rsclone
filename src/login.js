import './sass/style.scss';
import Auth from './utils/Authorization/auth';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';

const loginSignUp = new LoginSignUp(document.getElementById('login'));
loginSignUp.render();

const auth = new Auth();
auth.AuthStateChanged();
