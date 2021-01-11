/* eslint-disable no-console */
// import { firebase } from '@firebase/app';
// import firebaseConfig from '../FirebaseDB/FirebaseDB.constants';
// import '@firebase/firestore';
// import '@firebase/auth';

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  console.log(email, password);

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});