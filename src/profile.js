import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Event from './events';
import Profile from './components/Profile/Profile';

const profile = new Profile(document.getElementById('profile'));
profile.render('ESY4qxNAPSVHqKiyJ7Js');

const event = new Event();
event.renderDrop();
