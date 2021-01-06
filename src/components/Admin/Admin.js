import './Admin.scss';
import { Modal } from 'bootstrap';
import FirebaseDB from '../../utils/FirebaseDB/FirebaseDB';

export default class Admin {
  constructor() {
    this.addUser();
    this.editUser();
    this.deleteUser();
  }

  // eslint-disable-next-line class-methods-use-this
  deleteUser() {
    const deleteModal = new Modal(document.getElementById('deleteUserModal'), {});
    const exampleModal = document.getElementById('deleteUserModal');
    exampleModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      const user = button.getAttribute('data-bs-username');
      const userId = button.getAttribute('data-bs-userid');
      const deleteYesBtn = document.querySelector('#delete-user-yes');
      deleteYesBtn.addEventListener('click', () => {
        const firebaseDB = new FirebaseDB();
        firebaseDB.deleteItem('Users', userId);
        this.render();
        deleteModal.hide();
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addUser() {
    const exampleModal2 = document.getElementById('addUserModal');
    exampleModal2.addEventListener('show.bs.modal', (event) => {
      const buttonAdd = event.relatedTarget;
      const user = buttonAdd.getAttribute('data-bs-username');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  editUser() {
    const exampleModal3 = document.getElementById('editUserModal');
    exampleModal3.addEventListener('show.bs.modal', (event) => {
      const buttonEdit = event.relatedTarget;
      const user = buttonEdit.getAttribute('data-bs-username');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setData(users) {
    document.getElementById('table__users').innerHTML = `<div class="table-responsive-md">
    <table class="table">
    <thead>
  <tr>
    <th class = "name">ФИО</th>
    <th class = "mail">Эл.Почта</th>
    <th class = "password">Пароль</th>
    <th class = "type">Роль</th>
    <th class = "description">Описание</th>
    <th class = "actions">Действия</th>
  </tr>
</thead>
<tbody>
    ${users
      .map(
        (item) =>
          `<tr data-id="${item.id}"><td>${item.fullName}</td><td>${item.mail}</td><td>${item.password}</td><td>${item.type}</td><td>${item.description}</td><td class="table__action">
        <a href="#" data-bs-toggle="modal" data-bs-target="#editUserModal"
          ><svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 14.5L0.640299 14.1527L0.5 14.298V14.5H1ZM14.0345 1L14.3942 0.652703C14.3 0.555116 14.1701 0.5 14.0345 0.5C13.8988 0.5 13.769 0.555116 13.6748 0.652703L14.0345 1ZM21.2759 8.5L21.6356 8.8473C21.8226 8.65355 21.8226 8.34645 21.6356 8.1527L21.2759 8.5ZM8.24138 22V22.5H8.45364L8.60108 22.3473L8.24138 22ZM1 22H0.5C0.5 22.2761 0.723858 22.5 1 22.5V22ZM1.3597 14.8473L14.3942 1.3473L13.6748 0.652703L0.640299 14.1527L1.3597 14.8473ZM13.6748 1.3473L20.9162 8.8473L21.6356 8.1527L14.3942 0.652703L13.6748 1.3473ZM20.9162 8.1527L7.88168 21.6527L8.60108 22.3473L21.6356 8.8473L20.9162 8.1527ZM8.24138 21.5H1V22.5H8.24138V21.5ZM1.5 22V14.5H0.5V22H1.5ZM9.32995 5.8473L16.5713 13.3473L17.2907 12.6527L10.0494 5.1527L9.32995 5.8473ZM11.8621 22.5H22V21.5H11.8621V22.5Z" fill="#F49344"/>
          </svg>
          </a>
          <a href = "#" data-bs-userid="${item.id}" data-bs-username="${item.fullName}" data-bs-toggle="modal" data-bs-target="#deleteUserModal"
          ><svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
          </svg>
          </a>
      </td></tr>`
      )
      .join('')}
</tbody>
    </table>
  </div>
`;
  }

  render() {
    const firebaseDB = new FirebaseDB();
    firebaseDB.getUsers().then((data) => {
      this.setData(data);
    });
  }
}
