import './sass/style.scss';

function ToggleMenuButton() {
  const triger = document.querySelectorAll('.toggle');

  triger.forEach((x) =>
    x.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('collapsed');
    })
  );
  const dropdown = document.querySelector('.layout-header-right');

  dropdown.addEventListener('click', () => {
    const menu = document.querySelector('.dropdown');
    menu.classList.toggle('dropdown-hidden');
  });
}

ToggleMenuButton();
