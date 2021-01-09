import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/index';
import './events';
import StudentProfile from './components/StudentProfile/StudentProfile';

// const admin = new Admin();
// admin.render();

const st = new StudentProfile();
st.render(document.getElementById('table__users'), '544tvGg7MrAno1wxXc8Z');
