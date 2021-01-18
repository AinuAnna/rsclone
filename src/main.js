import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Menu from './components/Menu/Menu';
import Event from './events';

const event = new Event();
event.renderToggle();

const menu = new Menu(document.getElementById('menu'));
menu.render();
