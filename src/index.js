import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/index';
import './events';

const admin = new Admin();
admin.render();
