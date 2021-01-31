/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import '@firebase/firestore';
import '@firebase/auth';
import { document } from 'mammoth/mammoth.browser';
import { auth, db } from '../FirebaseDB/FirebaseDB';

// listen for auth status changes

export default class Auth {
  AuthStateChanged() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('uidMath', user.uid);
      } else {
        // setupUI();
        localStorage.removeItem('uidMath');
      }
    });
  }

  goSignUp() {
    this.AuthStateChanged();
    // signup
    const signupForm = document.querySelector('#form-singup');
    document.querySelector('#button-singup').addEventListener('click', () => {
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
            password,
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
    });
  }

  static goLogout() {
    // logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
      auth.signOut();
      localStorage.removeItem('uidMath');
    });
  }

  goLogin() {
    this.AuthStateChanged();
    const checkStatus = (status) => {
      db.collection('Users')
        .doc(status)
        .get()
        .then((doc) => {
          if (doc.data().type === 'student') {
            document.location.href = './main/student/results';
          }
          if (doc.data().type === 'admin') {
            document.location.href = './main/admin/users';
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
  }
}
