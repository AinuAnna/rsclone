import './sass/style.scss';
import './utils/FirebaseAuth/FirebaseAuth';
import Admin from './components/Admin/Admin';

function ToggleMenuButton() {
  const trigger = document.querySelectorAll('.toggle');

  trigger.forEach((x) =>
    x.addEventListener('click', () => {
      const sideBar = document.querySelector('.sidebar');
      sideBar.classList.toggle('collapsed');
    })
  );
  const dropdown = document.querySelector('.layout-header-right');

  dropdown.addEventListener('click', () => {
    const menu = document.querySelector('.dropdown');
    menu.classList.toggle('dropdown-hidden');
  });
}

const admin = new Admin();
admin.render();

ToggleMenuButton();
