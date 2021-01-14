/* eslint-disable no-console */
// import { firebase } from '@firebase/app';
// import firebaseConfig from '../FirebaseDB/FirebaseDB.constants';
// import '@firebase/firestore';
// import '@firebase/auth';

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// add firebase data/guides
/*
// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // const adminEmail = document.querySelector('#admin-email').value;
  // const addAdminRole = functions.httpsCallable('addAdminRole');
  // addAdminRole({ email: adminEmail }).then(result => {
  //   console.log(result);
  // });

  // auth.then((cred) =>
  //   db
  //     .collection('UsersBio')
  //     .doc(cred.user.uid)
  //     .set({
  //       status: document.querySelector('#admin-email').value,
  //     })
  // );
  const user = firebase.auth().currentUser;
  console.log(user);
  // user
  //   .updateProfile({
  //     displayName: 'Admin',
  //   })
  //   .then(() => {
  //     // Update successful.
  //   })
  //   .catch((error) => {
  //     // An error happened.
  //   });
});
*/
// listen for auth status changes

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection('Guides').onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      },
      (err) => console.log(err.message)
    );
  } else {
    setupUI();
    setupGuides([]);
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
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  console.log(email, password);

  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) =>
      db.collection('UsersBio').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value,
      })
    )
    .then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
