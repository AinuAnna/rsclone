import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Menu from './components/Menu/Menu';
import Event from './events';
import Profile from './components/Profile/Profile';

const profile = new Profile(document.getElementById('profile'));
profile.render('ESY4qxNAPSVHqKiyJ7Js');

const event = new Event();
event.renderToggle();

const menu = new Menu(document.getElementById('menu'));
menu.initRender();
