import './sass/style.scss';
import './utils/FirebaseDB/FirebaseDB';
import './utils/FirebaseAuth/FirebaseAuth';

function ToggleMenuButton() {
  const triger = document.querySelectorAll('.toggle');

  triger.forEach((x) =>
    x.addEventListener('click', () => {
      const sider = document.querySelector('.sider');
      sider.classList.toggle('collapsed');
    })
  );
}

ToggleMenuButton();
