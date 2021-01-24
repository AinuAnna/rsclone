import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Event from './events';
import Profile from './components/Profile/Profile';

const profile = new Profile(document.getElementById('profile'));
const uid = localStorage.getItem('uidMath');

profile.render(uid);

const event = new Event();
event.renderDrop();
