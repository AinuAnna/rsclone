function ToggleMenuButton() {
  const simpleBarElement = document.getElementsByClassName('js-simplebar')[0];

  if (simpleBarElement) {
    const sidebarElement = document.getElementsByClassName('sidebar')[0];
    const sidebarToggleElement = document.getElementsByClassName('sidebar-toggle')[0];

    sidebarToggleElement.addEventListener('click', () => {
      sidebarElement.classList.toggle('collapsed');
    });
  }
  const dropdown = document.querySelector('.nav-item.dropdown');

  dropdown.addEventListener('mousemove', () => {
    const menu = document.querySelector('.dropdown-menu.dropdown-menu-right');
    menu.classList.add('show');
    menu.addEventListener('mouseleave', () => {
      const menuDrop = document.querySelector('.dropdown-menu.dropdown-menu-right');
      menuDrop.classList.remove('show');
    });
  });
}

ToggleMenuButton();
