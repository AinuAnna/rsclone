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

// add firebase data/guides
/*
// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });

  auth.then((cred) =>
    db
      .collection('UsersBio')
      .doc(cred.user.uid)
      .set({
        status: document.querySelector('#admin-email').value,
      })
  );
  const user = firebase.auth().currentUser;
  console.log(user);
  user
    .updateProfile({
      displayName: 'Admin',
    })
    .then(() => {
      // Update successful.
    })
    .catch((error) => {
      // An error happened.
    });
});
*/
// listen for auth status changes

export default class Auth {
  AuthStateChanged() {
    // const guideList = document.querySelector('.guides');
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
        });
    };

    // setup guides
    // const setupGuides = (data) => {
    //   if (data.length) {
    //     let html = '';
    //     data.forEach((doc) => {
    //       const guide = doc.data();
    //       const li = `
    //     <li>
    //       <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
    //       <div class="collapsible-body white"> ${guide.content} </div>
    //     </li>
    //   `;
    //       html += li;
    //     });
    //     guideList.innerHTML = html;
    //   } else {
    //     guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    //   }
    // };

    auth.onAuthStateChanged((user) => {
      // console.log(user.uid);
      if (user) {
        localStorage.setItem('uidMath', user.uid);
        // db.collection('UsersBio')
        //   .doc(user.uid)
        //   .get()
        //   .then((doc) => {
        //     doc.data().status;
        //   });
        // db.collection('Guides').onSnapshot(
        //   (snapshot) => {
        //     setupGuides(snapshot.docs);
        //     setupUI(user);
        //   },
        //   (err) => console.log(err.message)
        // );
      } else {
        setupUI();
        // setupGuides([]);
      }
    });

    // create new guide
    const createForm = document.querySelector('#create-form');
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      db.collection('Guides')
        .add({
          title: createForm.title.value,
          content: createForm.content.value,
        })
        .then(() => {
          // close the create modal & reset form
          const modal = document.querySelector('#modal-create');
          M.Modal.getInstance(modal).close();
          createForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    // signup
    const signupForm = document.querySelector('#form-singup');
    document.querySelector('#button-singup').addEventListener('click', () => {
      // e.preventDefault();

      // get user info
      const mail = signupForm['input-email'].value;
      const password = signupForm['input-password'].value;
      // const fullname = signupForm['input-fullname'].value;
      // const group = signupForm['input-group'].value;

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
          // close the signup modal & reset form
          // const modal = document.querySelector('#modal-signup');
          // M.Modal.getInstance(modal).close();
          // signupForm.reset();
          document.location.href = './main/student/results';
        });
    });

    // logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
      // e.preventDefault();
      // document.location.href = './main';
      auth.signOut();
    });

    // login
    const loginForm = document.querySelector('#form-login');
    document.querySelector('#submit-main').addEventListener('click', () => {
      // e.preventDefault();

      // get user info
      const mail = loginForm['input-email'].value;
      const password = loginForm['input-password'].value;

      // log the user in
      auth.signInWithEmailAndPassword(mail, password).then((cred) => {
        // document.location.href = `./main/student/results:${cred.user.uid}`;
        // console.log(cred.user);
        checkStatus(cred.user.uid);
        // close the signup modal & reset form
        // const modal = document.querySelector('#modal-login');
        // M.Modal.getInstance(modal).close();
        // loginForm.reset();
      });
    });
    // setup materialize components
    document.addEventListener('DOMContentLoaded', () => {
      const modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

      const items = document.querySelectorAll('.collapsible');
      M.Collapsible.init(items);
    });
  }
}
