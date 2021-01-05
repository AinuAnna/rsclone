import './sass/style.scss';
import './utils/FirebaseDB/FirebaseDB';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';
import RequestForBD from './requestForBD';

const admin = new Admin();

function ToggleMenuButton() {
  const trigger = document.querySelectorAll('.toggle');

  trigger.forEach((x) =>
    x.addEventListener('click', () => {
      const sideBar = document.querySelector('.sidebar');
      sideBar.classList.toggle('collapsed');
    })
  );
}
function startApp() {
  RequestForBD.getUsers().then((data) => {
    admin.setData(data);
  });
}

ToggleMenuButton();
startApp();
