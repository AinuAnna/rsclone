import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';

// import Admin from './components/Admin/Admin';
// import Tests from './components/Tests/Tests';
// import TestsAdmin from './components/TestsAdmin/TestsAdmin';
import LectureAdmin from './components/LectureAdmin/LectureAdmin';
// import TestResults from './components/TestResults/TestResults';
import './events';
import Lecture from './components/Lecture/Lecture';
// import Profile from './components/Profile/Profile';

// const st = new Profile();
// st.render(document.getElementById('table__users'), '544tvGg7MrAno1wxXc8Z');

// const admin = new Admin(document.getElementById('table__users'));
// admin.render();
// const tests = new Tests(document.getElementById('table__users'));
// tests.render();
// const testsAdmin = new TestsAdmin(document.getElementById('table__users'));
// testsAdmin.render();

// const lectureAdmin = new LectureAdmin(document.getElementById('table__users'));
// lectureAdmin.render();

const lecture = new Lecture(document.getElementById('table__users'));
lecture.render();

// const rez = new TestResults();
// rez.render(document.getElementById('table__users'), 'f0Ld29L3o6G9PU7GKmT6');
