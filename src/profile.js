import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Event from './events';
import Profile from './components/Profile/Profile';
import Auth from './utils/Authorization/auth';
import { db } from './utils/FirebaseDB/FirebaseDB';

const profile = new Profile(document.getElementById('profile'));
const uid = localStorage.getItem('uidMath');

profile.render(uid);

const event = new Event();
event.renderDrop();

Auth.goLogout();

document.querySelector('#profilePlace').addEventListener('click', () => {
  db.collection('Users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.data().type === 'student') {
        document.location.href = '../student/results';
      } else if (doc.data().type === 'admin') {
        document.location.href = '../admin/users';
      } else if (doc.data().type === 'teacher') {
        document.location.href = '../teacher/group';
      }
    });
});
