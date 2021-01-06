import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';
import './events';

const admin = new Admin();
admin.render();
