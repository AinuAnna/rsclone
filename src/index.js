import './sass/style.scss';
import Event from './events';
import { db } from './utils/FirebaseDB/FirebaseDB';

const uid = localStorage.getItem('uidMath');
document.querySelector('#profilePlace').addEventListener('click', () => {
  if (uid) {
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
  } else {
    document.location.href = 'signup.html';
  }
});

document.querySelector('#input-email').addEventListener('click', () => {
  if (uid) {
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
  } else {
    document.location.href = 'login.html';
  }
});

const event = new Event();
event.renderFocus();
