import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';
// import TestResults from './components/TestResults/TestResults';
import './events';
// import Profile from './components/Profile/Profile';

// const st = new Profile();
// st.render(document.getElementById('table__users'), '544tvGg7MrAno1wxXc8Z');

const admin = new Admin(document.getElementById('table__users'));
admin.render();

// const rez = new TestResults();
// rez.render(document.getElementById('table__users'), 'f0Ld29L3o6G9PU7GKmT6');
