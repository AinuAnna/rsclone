/* eslint-disable no-unused-vars */
import './Admin.scss';
import { Modal } from 'bootstrap';
import { db, FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import UI from '../UIclass/UIclass';
import '@firebase/firestore';

import {
  addInputName,
  addInputEmail,
  addInputRole,
  addInputDescription,
  editInputName,
  editInputEmail,
  editInputRole,
  editInputDescription,
  deleteYesBtn,
  addYesBtn,
  editYesBtn,
} from './Admin.constants';

export default class Admin extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.getAddUserPopUp();
    this.getEditUserPopUp();
    this.deleteUser();
    this.addUser();
    this.id = null;
    this.updateUser();
    this.listenerUsers();
    this.firebaseDB = new FirebaseDB();
  }

  // eslint-disable-next-line class-methods-use-this
  deleteUser() {
    const deleteUserModalPopUp = new Modal(document.getElementById('deleteUserModal'), {});
    const deleteUserModal = document.getElementById('deleteUserModal');
    deleteUserModal.addEventListener('show.bs.modal', (deleteEvent) => {
      const button = deleteEvent.relatedTarget;
      const userId = button.getAttribute('data-bs-userid');
      deleteYesBtn.addEventListener('click', () => {
        this.firebaseDB.deleteItem('Users', userId);
        deleteUserModalPopUp.hide();
        this.render();
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getAddUserPopUp() {
    const addUserModal = document.getElementById('addUserModal');
    addUserModal.addEventListener('show.bs.modal', () => {
      addInputName.value = '';
      addInputEmail.value = '';
      addInputRole.value = '';
      addInputDescription.value = '';
    });
  }

  addUser() {
    const addUserModalPopUp = new Modal(document.getElementById('addUserModal'), {});
    addYesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const FULL_NAME = addInputName.value;
      const MAIL = addInputEmail.value;
      const ROLE = addInputRole.value;
      const DESCRIPTION = addInputDescription.value;
      const USER = {
        description: DESCRIPTION,
        fullName: FULL_NAME,
        mail: MAIL,
        type: ROLE,
      };
      this.firebaseDB.addDataToDB('Users', USER);
      addUserModalPopUp.hide();
      this.render();
    });
  }

  getEditUserPopUp() {
    const editUserModal = document.getElementById('editUserModal');
    editUserModal.addEventListener('show.bs.modal', (editEvent) => {
      this.id = editEvent.relatedTarget.closest('tr').dataset.id;
      const OBJECT_DOM = editEvent.relatedTarget.closest('tr').children;
      const EXISTING_DATA = {};
      for (let i = 0; i < OBJECT_DOM.length; i++) {
        if (OBJECT_DOM[i].className === 'description') {
          EXISTING_DATA.description = OBJECT_DOM[i].innerText;
        } else if (OBJECT_DOM[i].className === 'name') {
          EXISTING_DATA.fullName = OBJECT_DOM[i].innerText;
        } else if (OBJECT_DOM[i].className === 'mail') {
          EXISTING_DATA.mail = OBJECT_DOM[i].innerText;
        } else if (OBJECT_DOM[i].className === 'type') {
          EXISTING_DATA.type = OBJECT_DOM[i].innerText;
        }
      }

      editInputName.value = EXISTING_DATA.fullName;
      editInputEmail.value = EXISTING_DATA.mail;
      editInputRole.value = EXISTING_DATA.type;
      editInputDescription.value = EXISTING_DATA.description;
    });
  }

  updateUser() {
    const editUserModalPopUp = new Modal(document.getElementById('editUserModal'), {});

    editYesBtn.addEventListener('click', () => {
      const FULL_NAME = editInputName.value;
      const MAIL = editInputEmail.value;
      const ROLE = editInputRole.value;
      const DESCRIPTION = editInputDescription.value;

      const EDITED_USER = {
        description: DESCRIPTION,
        fullName: FULL_NAME,
        mail: MAIL,
        type: ROLE,
      };
      this.firebaseDB.updateDataInDB('Users', this.id, EDITED_USER);
      editUserModalPopUp.hide();
      this.render();
    });
  }

  listenerUsers() {
    db.collection('Users').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.update();
        } else if (change.type === 'removed') {
          this.update();
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'users__wrapper']);
    const tableTitles = ['Аватар', 'ФИО', 'Эл.Почта', 'Роль', 'Описание', 'Действия'];
    UI.renderElement(wrapper, 'h2', 'Пользователи', ['class', 'users__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'table-responsive-md']);
    const table = UI.renderElement(container, 'table', null, ['class', 'table']);
    const thead = UI.renderElement(table, 'thead');
    const trh = UI.renderElement(thead, 'tr');
    tableTitles.forEach((title) => UI.renderElement(trh, 'th', title));
    const tbody = UI.renderElement(table, 'tbody');
    this.usersArray.forEach(({ fullName, id, mail, type, description, avatar }) => {
      const tr = UI.renderElement(tbody, 'tr', null, ['data-id', id]);
      const tdavatar = UI.renderElement(tr, 'td', null, ['class', 'avatar']);
      if (avatar !== '' || undefined) {
        UI.renderElement(tdavatar, 'img', null, ['src', `${avatar}`], ['class', 'avatar rounded-circle']);
      } else {
        UI.renderElement(
          tdavatar,
          'img',
          null,
          ['src', '../../assets/icon/user.svg'],
          ['class', 'avatar rounded-circle']
        );
      }
      UI.renderElement(tr, 'td', fullName, ['class', 'name']);
      UI.renderElement(tr, 'td', mail, ['class', 'mail']);
      UI.renderElement(tr, 'td', type, ['class', 'type']);
      UI.renderElement(tr, 'td', description, ['class', 'description']);
      const svgButtonEdit = UI.renderElement(
        tr,
        'a',
        `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 14.5L0.640299 14.1527L0.5 14.298V14.5H1ZM14.0345 1L14.3942 0.652703C14.3 0.555116 14.1701 0.5 14.0345 0.5C13.8988 0.5 13.769 0.555116 13.6748 0.652703L14.0345 1ZM21.2759 8.5L21.6356 8.8473C21.8226 8.65355 21.8226 8.34645 21.6356 8.1527L21.2759 8.5ZM8.24138 22V22.5H8.45364L8.60108 22.3473L8.24138 22ZM1 22H0.5C0.5 22.2761 0.723858 22.5 1 22.5V22ZM1.3597 14.8473L14.3942 1.3473L13.6748 0.652703L0.640299 14.1527L1.3597 14.8473ZM13.6748 1.3473L20.9162 8.8473L21.6356 8.1527L14.3942 0.652703L13.6748 1.3473ZM20.9162 8.1527L7.88168 21.6527L8.60108 22.3473L21.6356 8.8473L20.9162 8.1527ZM8.24138 21.5H1V22.5H8.24138V21.5ZM1.5 22V14.5H0.5V22H1.5ZM9.32995 5.8473L16.5713 13.3473L17.2907 12.6527L10.0494 5.1527L9.32995 5.8473ZM11.8621 22.5H22V21.5H11.8621V22.5Z" fill="#F49344"/>
      </svg> `,
        ['data-bs-toggle', 'modal'],
        ['href', '#'],
        ['data-bs-target', '#editUserModal'],
        ['data-bs-userid', id]
      );
      const svgButtonDelete = UI.renderElement(
        tr,
        'a',
        `<svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
        </svg> `,
        ['data-bs-toggle', 'modal'],
        ['href', '#'],
        ['data-bs-target', '#deleteUserModal'],
        ['data-bs-userid', id]
      );
    });
    UI.renderElement(table, 'tbody');
    const ButtonAddUser = UI.renderElement(
      wrapper,
      'a',
      'Добавить пользователя',
      ['href', '#'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#addUserModal'],
      ['class', 'btn btn-primary']
    );
  }

  // eslint-disable-next-line class-methods-use-this
  setData(users) {
    this.usersArray = users.filter(() => true);
  }

  update() {
    if (this.mounted) {
      this.render();
    }
  }

  render() {
    this.mounted = true;
    this.firebaseDB.getUsers().then((data) => {
      this.setData(data);
      this.rootNode.innerHTML = '';
      this.renderM();
    });
  }

  unmount() {
    this.mounted = false;
  }
}
