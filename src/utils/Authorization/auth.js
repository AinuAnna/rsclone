/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { firebase } from '@firebase/app';
import firebaseConfig from '../FirebaseDB/FirebaseDB.constants';
import '@firebase/firestore';
import '@firebase/auth';

// update firesto
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
db.settings({ timestampsInSnapshots: true });
// make auth and firestore references
// listen for auth status changes

export default class Auth {
  AuthStateChanged() {
    const loggedOutLinks = document.querySelectorAll('.logged-out');
    const loggedInLinks = document.querySelectorAll('.logged-in');
    const accountDetails = document.querySelector('.account-details');

    const setupUI = (user) => {
      if (user) {
        // account info
        db.collection('UsersBio')
          .doc(user.uid)
          .get()
          .then((doc) => {
            const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
            accountDetails.innerHTML = html;
          });
        // toggle user UI elements
        loggedInLinks.forEach((item) => (item.style.display = 'block'));
        loggedOutLinks.forEach((item) => (item.style.display = 'none'));
      } else {
        // clear account info
        accountDetails.innerHTML = '';
        // toggle user elements
        loggedInLinks.forEach((item) => (item.style.display = 'none'));
        loggedOutLinks.forEach((item) => (item.style.display = 'block'));
      }
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('uidMath', user.uid);
      } else {
        setupUI();
      }
    });
  }

  goSignUp() {
    // signup
    const signupForm = document.querySelector('#form-singup');
    // document.querySelector('#button-singup').addEventListener('click', () => {
    // e.preventDefault();

    // get user info
    const mail = signupForm['input-email'].value;
    const password = signupForm['input-password'].value;

    console.log(mail, password);

    // sign up the user & add firestore data
    auth
      .createUserWithEmailAndPassword(mail, password)
      .then((cred) =>
        db.collection('Users').doc(cred.user.uid).set({
          fullName: signupForm['input-fio'].value,
          mail: signupForm['input-email'].value,
          description: signupForm['input-group'].value,
          type: 'student',
        })
      )
      .then(() =>
        fetch('/api/sendMail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mail, name: signupForm['input-fio'].value }),
        })
      )
      .then(() => {
        document.location.href = './main/student/results';
      });
    // });
    this.AuthStateChanged();
  }

  goLogout() {
    // logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
      auth.signOut();
    });
    this.AuthStateChanged();
  }

  goLogin() {
    const checkStatus = (status) => {
      db.collection('Users')
        .doc(status)
        .get()
        .then((doc) => {
          if (doc.data().type === 'student') {
            document.location.href = './main/student/results';
          }
          if (doc.data().type === 'admin') {
            document.location.href = './main/admin';
          }
          if (doc.data().type === 'teacher') {
            document.location.href = './main/teacher/group';
          }
        });
    };
    // login
    const loginForm = document.querySelector('#form-login');
    document.querySelector('#submit-main').addEventListener('click', () => {
      // e.preventDefault();

      // get user info
      const mail = loginForm['input-email'].value;
      const password = loginForm['input-password'].value;

      // log the user in
      auth.signInWithEmailAndPassword(mail, password).then((cred) => {
        checkStatus(cred.user.uid);
      });
    });
    this.AuthStateChanged();
  }
}
