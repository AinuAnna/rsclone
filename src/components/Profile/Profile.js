/* eslint-disable class-methods-use-this */
import './Profile.scss';
import { Modal } from 'bootstrap';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import saveDataYesBtn from './Profile.constants';

const firebase = new FirebaseDB();

export default class Profile extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.saveDataUserPopUp();
    this.submitInfoOnHandler = this.submitInfoOnHandler.bind(this);
    this.submitPasswordOnHandler = this.submitPasswordOnHandler.bind(this);
  }

  saveDataUserPopUp() {
    const SaveDataUserModalPopUp = new Modal(document.getElementById('saveDataUserModal'), {});
    const saveDataUserModal = document.getElementById('saveDataUserModal');
    saveDataUserModal.addEventListener('show.bs.modal', (updateEvent) => {
      const button = updateEvent.relatedTarget;
      const userId = button.getAttribute('data-bs-userid');
      saveDataYesBtn.addEventListener('click', () => {
        this.firebaseDB.updateItem('Users', userId);
        SaveDataUserModalPopUp.hide();
        this.render();
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
      ['Эл. Почта', 'mail', this.studentInfo.mail],
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

    const arrPassword = [
      ['prev', 'Старый пароль'],
      ['new', 'Новый пароль'],
    ];

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
      ['data-bs-target', '#saveDataUserModal']
    );

    this.formPassword.addEventListener('submit', this.submitPasswordOnHandler);
    this.formData.addEventListener('submit', this.submitInfoOnHandler);
  }

  submitInfoOnHandler(event) {
    event.preventDefault();
    const newFields = {
      fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
      mail: this.inputsInfo.find(({ dataset }) => dataset.type === 'mail').value,
      type: this.inputsInfo.find(({ dataset }) => dataset.type === 'role').value,
      description: this.inputsInfo.find(({ dataset }) => dataset.type === 'description').value,
    };
    // do smth with new fields
    // console.log(newFields);
  }

  submitPasswordOnHandler(event) {
    event.preventDefault();
    const infoPassword = {};
    infoPassword[this.inputsPassword[0].dataset.type] = this.inputsPassword[0].value;
    infoPassword[this.inputsPassword[1].dataset.type] = this.inputsPassword[1].value;
    // do smth with new fields
    // console.log(infoPassword);
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
    this.userId = userId;
    firebase.getData('Users').then((data) => {
      this.setData(data);
      this.renderM();
      this.renderAvatar();
    });
  }
}
