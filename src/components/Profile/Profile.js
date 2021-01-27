/* eslint-disable class-methods-use-this */
import './Profile.scss';
import { Modal } from 'bootstrap';
import { firebase } from '@firebase/app';
import UI from '../UIclass/UIclass';
import { db, FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import { saveDataYesBtn, changeAuthYesBtn } from './Profile.constants';
import '@firebase/firestore';
import '@firebase/auth';

const auth = firebase.auth();

export default class Profile extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.userId = null;
    this.studentInfo = null;
    this.newUserInfoFields = null;
    this.inputsInfo = null;
    this.submitInfoOnHandler = this.submitInfoOnHandler.bind(this);
    this.submitPasswordOnHandler = this.submitPasswordOnHandler.bind(this);
    this.saveDataUserPopUp();
    this.changeAuthPopUp();
    this.firebaseDB = new FirebaseDB();
  }

  saveDataUserPopUp() {
    const saveDataUserModalPopUp = new Modal(document.getElementById('saveDataUserModal'), {});
    const saveDataUserModal = document.getElementById('saveDataUserModal');
    saveDataUserModal.addEventListener('show.bs.modal', () => {
      saveDataYesBtn.addEventListener('click', () => {
        /* Update data user info in Users table */
        this.firebaseDB.updateDataInDB('Users', this.userId, this.newUserInfoFields);
        /* Login in Auth and update email */
        auth.signInWithEmailAndPassword(auth.currentUser.email, this.studentInfo.password).then(() => {
          auth.currentUser.updateEmail(`${this.newUserInfoFields.mail}`);
        });
        saveDataUserModalPopUp.hide();
        this.render(this.userId);
      });
    });
  }

  changeAuthPopUp() {
    const changeAuthModalPopUp = new Modal(document.getElementById('changeAuthModal'), {});
    const changeAuthModal = document.getElementById('changeAuthModal');
    changeAuthModal.addEventListener('show.bs.modal', () => {
      changeAuthYesBtn.addEventListener('click', () => {
        // я перенесла, дальше не буду трогать
        /* Login in Auth and update email */
        auth.signInWithEmailAndPassword(auth.currentUser.email, this.studentInfo.password).then(() => {
          auth.currentUser.updateEmail(`${this.newUserInfoFields.mail}`);
        });
        // я так понимаю тут же прописывается выход из акка при нажатии на кнопку, скорее всго надо будет вызвать метод класса auth goLogout();
        changeAuthModalPopUp.hide();
        this.render(this.userId);
      });
    });
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'student-profile__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Мой профиль', ['class', 'student-profile__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'student-profile__container']);
    const left = UI.renderElement(container, 'div', null, ['class', 'student-profile__left']);
    const containerFluid = UI.renderElement(container, 'div', null, ['class', 'container-fluid p-0']);
    const right = UI.renderElement(containerFluid, 'div', null, ['class', 'student-profile__right']);

    const CardAvatar = UI.renderElement(right, 'div', null, ['class', 'col-md-8 col-xl-4']);
    const cardHeader = UI.renderElement(CardAvatar, 'div', null, ['class', 'card-header']);
    const CardAvatarMD = UI.renderElement(CardAvatar, 'div', null, ['class', 'center-cont']);
    UI.renderElement(cardHeader, 'h5', 'Фото профиля', ['class', 'student-profile__photo-title card-title mb-0']);
    const cardBody = UI.renderElement(
      CardAvatarMD,
      'div',
      null,
      ['class', 'card-body'],
      ['id', 'user-avatar'],
      ['area-label', 'user avatar']
    );

    UI.renderElement(cardBody, 'input', null, ['id', 'upload'], ['type', 'file'], ['accept', 'image/*']);
    const labelButtonAvatar = UI.renderElement(cardBody, 'label', null, ['for', 'upload']);
    UI.renderElement(
      labelButtonAvatar,
      'span',
      '🡇',
      ['role', 'button'],
      ['tabindex', '0'],
      ['aria-label', 'upload user profile']
    );

    const divInputs = UI.renderElement(
      CardAvatar,
      'div',
      null,
      ['data-id', this.studentInfo.id],
      ['class', 'divInputs']
    );
    UI.renderElement(divInputs, 'h5', this.studentInfo.fullName, [
      'class',
      'student-profile__photo-title card-title mb-0',
    ]);
    UI.renderElement(divInputs, 'div', this.studentInfo.description, [
      'class',
      'student-profile__photo-title text-muted mb-2',
    ]);

    this.formData = UI.renderElement(
      left,
      'form',
      null,
      ['class', 'student-profile__info-form'],
      ['id', 'student-profile__info-form']
    );

    const arrInfo = [
      ['Имя пользователя', 'name', this.studentInfo.fullName],
      ['Роль', 'role', this.studentInfo.type],
      ['Описание', 'description', this.studentInfo.description],
    ];

    this.inputsInfo = arrInfo.map((el) => {
      UI.renderElement(this.formData, 'span', el[0], ['class', 'student-profile__info-title']);
      return UI.renderElement(
        this.formData,
        'input',
        null,
        ['class', 'student-profile__input'],
        ['data-type', el[1]],
        ['value', el[2]]
      );
    });

    UI.renderElement(
      this.formData,
      'button',
      'Обновить данные',
      ['type', 'submit'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#saveDataUserModal'],
      ['class', 'btn btn-primary']
    );

    this.formPassword = UI.renderElement(
      left,
      'form',
      null,
      ['class', 'student-profile__password-form'],
      ['id', 'student-profile__password-form']
    );

    const changeMail = [['mail', 'Эл. Почта', this.studentInfo.mail]];
    const arrPassword = [
      ['prev', 'Старый пароль'],
      ['new', 'Новый пароль'],
    ];
    // инпут для почты с введенным значением почты
    this.inputsPassword = changeMail.map((el) => {
      UI.renderElement(this.formPassword, 'span', el[1], ['class', 'student-profile__info-title']);
      return UI.renderElement(
        this.formPassword,
        'input',
        '',
        ['class', 'student-profile__input'],
        ['data-type', el[0]],
        ['value', el[2]]
      );
    });
    // инпуты для паролей без значений
    this.inputsPassword = arrPassword.map((el) => {
      UI.renderElement(this.formPassword, 'span', el[1], ['class', 'student-profile__info-title']);
      return UI.renderElement(
        this.formPassword,
        'input',
        '',
        ['class', 'student-profile__input'],
        ['data-type', el[0]]
      );
    });

    UI.renderElement(
      this.formPassword,
      'button',
      'Обновить данные',
      ['class', 'btn btn-primary'],
      ['type', 'submit'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#changeAuthModal']
    );

    this.formPassword.addEventListener('submit', this.submitPasswordOnHandler);
    this.formData.addEventListener('submit', this.submitInfoOnHandler);
  }

  submitInfoOnHandler(event) {
    event.preventDefault();
    this.newUserInfoFields = {
      fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
      mail: this.inputsInfo.find(({ dataset }) => dataset.type === 'mail').value,
      type: this.inputsInfo.find(({ dataset }) => dataset.type === 'role').value,
      description: this.inputsInfo.find(({ dataset }) => dataset.type === 'description').value,
    };
  }

  listenerUsers() {
    db.collection('Users').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.render(this.userId);
        } else if (change.type === 'removed') {
          this.render(this.userId);
        }
      });
    });
  }

  submitPasswordOnHandler(event) {
    event.preventDefault();
    const infoPassword = {};
    infoPassword[this.inputsPassword[0].dataset.type] = this.inputsPassword[0].value;
    infoPassword[this.inputsPassword[1].dataset.type] = this.inputsPassword[1].value;
  }

  renderAvatar() {
    const AVATAR = document.querySelector('#user-avatar');
    const INPUT = document.querySelector('#upload');
    const BTN = document.querySelector('span[role="button"]');

    const handleUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageBuffer = reader.result;
        AVATAR.style.background = `url(${imageBuffer}) center center/cover`;
      };
    };

    INPUT.addEventListener('change', handleUpload);
    BTN.addEventListener('keypress', (event) => {
      if (event.key === ' ' || event.key === 'Enter') BTN.click();
    });
  }

  setData(data) {
    this.studentInfo = data.find(({ id }) => id === this.userId);
  }

  render(userId) {
    this.rootNode.innerHTML = '';
    this.userId = userId;
    this.firebaseDB.getData('Users').then((data) => {
      this.setData(data);
      this.renderM();
      this.renderAvatar();
    });
  }
}
