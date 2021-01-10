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
  constructor() {
    super();
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
          this.render();
        } else if (change.type === 'removed') {
          this.render();
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'users__wrapper']);
    const tableTitles = ['ФИО', 'Эл.Почта', 'Роль', 'Описание'];
    UI.renderElement(wrapper, 'h2', 'Пользователи', ['class', 'users__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'table-responsive-md']);
    const table = UI.renderElement(container, 'table', null, ['class', 'table']);
    const thead = UI.renderElement(table, 'thead');
    const trh = UI.renderElement(thead, 'tr');
    tableTitles.forEach((title) => UI.renderElement(trh, 'th', title));
    const tbody = UI.renderElement(table, 'tbody');
    this.usersArray
      .forEach(({ fullName, id, mail, type, description }) => {
        const tr = UI.renderElement(tbody, 'tr', null, ['data-id', id]);
        UI.renderElement(tr, 'td', fullName);
        UI.renderElement(tr, 'td', mail);
        UI.renderElement(tr, 'td', type);
        UI.renderElement(tr, 'td', description);
      })
      .join('');
    UI.renderElement(table, 'tbody');
  }

  // eslint-disable-next-line class-methods-use-this
  setData(users) {
    this.usersArray = users.filter(() => true);
  }

  render(rootNode) {
    this.rootNode = rootNode;
    this.firebaseDB.getUsers().then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
