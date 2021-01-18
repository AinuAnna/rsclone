import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
// import Admin from './components/Admin/Admin';
// import Tests from './components/Tests/Tests';
// import TestsAdmin from './components/TestsAdmin/TestsAdmin';
// import LectureAdmin from './components/LectureAdmin/LectureAdmin';
import Menu from './components/Menu/Menu';
// import TestResults from './components/TestResults/TestResults';
import Event from './events';
// import Lecture from './components/Lecture/Lecture';

const event = new Event();
event.renderToggle();
const menu = new Menu(document.getElementById('menu'));
menu.renderM();
// import Profile from './components/Profile/Profile';

// const st = new Profile();
// st.render(document.getElementById('container'), '544tvGg7MrAno1wxXc8Z');

// const admin = new Admin(document.getElementById('container'));
// admin.render();
// const tests = new Tests(document.getElementById('container'));
// tests.render();
// const testsAdmin = new TestsAdmin(document.getElementById('container'));
// testsAdmin.render();

const lectureAdmin = new LectureAdmin(document.getElementById('container'));
lectureAdmin.render();

// const lecture = new Lecture(document.getElementById('container'));
// lecture.render();

// const rez = new TestResults();
// rez.render(document.getElementById('container'), 'f0Ld29L3o6G9PU7GKmT6');
