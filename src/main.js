import './sass/style.scss';
import Menu from './components/Menu/Menu';
import Event from './events';
import Avatar from './components/Avatar/Avatar';
import Auth from './utils/Authorization/auth';

const event = new Event();
event.renderToggle();

const avatar = new Avatar();
avatar.render();

const menu = new Menu(document.getElementById('menu'));
menu.initRender();
Auth.goLogout();
