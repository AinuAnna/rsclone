import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';
// import TestResults from './components/TestResults/TestResults';
import './events';

const admin = new Admin();
admin.render(document.getElementById('table__users'));

// const rez = new TestResults();
// rez.render(document.getElementById('table__users'), 'f0Ld29L3o6G9PU7GKmT6');
