import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';
// import TestResults from './components/TestResults/TestResults';
import './events';

const admin = new Admin(document.getElementById('table__users'));
admin.render();

// const rez = new TestResults();
// rez.render(document.getElementById('table__users'), 'f0Ld29L3o6G9PU7GKmT6');
