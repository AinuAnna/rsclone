import './sass/style.scss';

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
