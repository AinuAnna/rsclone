import './sass/style.scss';
import './utils/FirebaseDB/FirebaseDB';
import './utils/FirebaseAuth/FirebaseAuth';

function ToggleMenuButton() {
  const triger = document.querySelectorAll('.toggle');

  triger.forEach((x) =>
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

ToggleMenuButton();
