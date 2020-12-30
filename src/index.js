import './sass/style.scss';

function ToggleMenuButton() {
  const buttons = global.document.querySelectorAll('.toggle');

  buttons.forEach((el) =>
    el.addEventListener('click', function () {
      this.parentElement.classList.toggle('change');
    })
  );
}
ToggleMenuButton();
