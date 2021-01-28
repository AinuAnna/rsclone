/* eslint-disable class-methods-use-this */
import './Profile.scss';
import { Modal } from 'bootstrap';
import { firebase } from '@firebase/app';
import UI from '../UIclass/UIclass';
import { db, FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import { saveDataYesBtn, changeAuthYesBtn, changeEMAILYesBtn } from './Profile.constants';
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
    this.newPrivateUserInfoFields = null;
    this.inputsInfo = null;
    this.submitInfoOnHandler = this.submitInfoOnHandler.bind(this);
    this.submitPasswordOnHandler = this.submitPasswordOnHandler.bind(this);
    this.saveDataUserPopUp();
    this.changeEMAILPopUp();
    // this.changeAuthPopUp();
    this.firebaseDB = new FirebaseDB();
  }

  saveDataUserPopUp() {
    const saveDataUserModalPopUp = new Modal(document.getElementById('saveDataUserModal'), {});
    const saveDataUserModal = document.getElementById('saveDataUserModal');
    saveDataUserModal.addEventListener('show.bs.modal', () => {
      saveDataYesBtn.addEventListener('click', () => {
        /* Update data user info in Users table */
        this.firebaseDB.updateDataInDB('Users', this.userId, this.newUserInfoFields);
        saveDataUserModalPopUp.hide();
        this.render(this.userId);
      });
    });
  }

  changeEMAILPopUp() {
    const changeEMAILModalPopUp = new Modal(document.getElementById('changeEMAILModal'), {});
    const changeEMAILModal = document.getElementById('changeEMAILModal');
    changeEMAILModal.addEventListener('show.bs.modal', () => {
      changeEMAILYesBtn.addEventListener('click', () => {});
    });
  }

  changeAuthPopUp() {
    if (
      this.inputsPassword[0].value !== '' &&
      this.inputsPassword[1].value !== '' &&
      this.inputsPassword[0].value === this.studentInfo.password
    ) {
      const changeAuthModalPopUp = new Modal(document.getElementById('changeAuthModal'), {});
      const changeAuthModal = document.getElementById('changeAuthModal');
      changeAuthModal.addEventListener('show.bs.modal', () => {
        changeAuthYesBtn.addEventListener('click', () => {
          this.updatedNewUserInfoFields = { ...this.newUserInfoFields };
          this.updatedNewUserInfoFields.mail = this.newPrivateUserInfoFields.mail;
          if (this.inputsPassword[1].value !== '' && this.inputsPassword[0].value !== '') {
            this.updatedNewUserInfoFields.password = this.newPrivateUserInfoFields.password;
          }
          /* Login in Auth and update email and password */
          this.firebaseDB.updateDataInDB('Users', this.userId, this.updatedNewUserInfoFields);

          if (this.inputsPassword[1].value !== '' && this.inputsPassword[0].value !== '') {
            auth.signInWithEmailAndPassword(auth.currentUser.email, this.studentInfo.password).then(() => {
              auth.currentUser.updatePassword(`${this.newPrivateUserInfoFields.password}`);
              auth.currentUser.updateEmail(`${this.newPrivateUserInfoFields.mail}`);
            });
          } else {
            auth.signInWithEmailAndPassword(auth.currentUser.email, this.studentInfo.password).then(() => {
              auth.currentUser.updateEmail(`${this.newPrivateUserInfoFields.mail}`);
            });
          }
          changeAuthModalPopUp.hide();
          auth.signOut();
        });
      });
    }
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

    this.formEmail = UI.renderElement(
      left,
      'form',
      null,
      ['class', 'student-profile__email-form'],
      ['id', 'student-profile__email-form']
    );

    const changeMail = [['mail', 'Эл. Почта', this.studentInfo.mail]];

    const arrPassword = [
      ['prev', 'Старый пароль'],
      ['new', 'Новый пароль'],
    ];

    // инпут для почты с введенным значением почты
    this.inputEmail = changeMail.map((el) => {
      UI.renderElement(this.formEmail, 'span', el[1], ['class', 'student-profile__info-title']);
      return UI.renderElement(
        this.formEmail,
        'input',
        '',
        ['class', 'student-profile__input'],
        ['data-type', el[0]],
        ['value', el[2]]
      );
    });

    UI.renderElement(
      this.formEmail,
      'button',
      'Обновить данные',
      ['type', 'submit'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#changeEMAILModal'],
      ['class', 'btn btn-primary']
    );

    // инпуты для паролей без значений
    this.inputsPassword = arrPassword.map((el) => {
      UI.renderElement(this.formPassword, 'span', el[1], ['class', 'student-profile__info-title']);
      UI.renderElement(this.formPassword, 'div', null, ['class', 'error'], ['id', 'passChangeErr']);
      UI.renderElement(this.formPassword, 'div', null, ['class', 'error'], ['id', 'passErr']);
      return UI.renderElement(
        this.formPassword,
        'input',
        null,
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
      ['id', 'changePass'],
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#changeAuthModal']
    );

    this.formData.addEventListener('click', this.submitInfoOnHandler);
    this.formPassword.addEventListener('click', this.submitPasswordOnHandler);
    this.formEmail.addEventListener('click', this.submitEmailOnHandler);
  }

  submitInfoOnHandler(event) {
    event.preventDefault();
    this.newUserInfoFields = {
      fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
      type: this.inputsInfo.find(({ dataset }) => dataset.type === 'role').value,
      description: this.inputsInfo.find(({ dataset }) => dataset.type === 'description').value,
    };
  }

  submitEmailOnHandler(event) {
    event.preventDefault();
  }

  printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
  }

  submitPasswordOnHandler(event) {
    event.preventDefault();
    document.querySelector('#changePass').addEventListener('click', () => {
      if (this.inputsPassword[0].value !== '' && this.inputsPassword[0].value !== this.studentInfo.password) {
        this.printError('passChangeErr', 'Вы ввели неверный пароль');
      } else {
        this.printError('passChangeErr', '<p style = color:green; >Вы ввели верный пароль!</p>');
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(this.inputsPassword[1]) === false) {
          this.printError(
            'passErr',
            'Введите пароль, соответствующий правилам: минимум - 8 знаков, одна заглавная буква, одна строчная буква'
          );
        }
        if (
          this.inputsPassword[1].value !== '' &&
          this.inputsPassword[0].value === this.studentInfo.password &&
          this.inputsPassword[0].value !== ''
        ) {
          this.newPrivateUserInfoFields = {
            mail: this.inputEmail.find(({ dataset }) => dataset.type === 'mail').value,
            password: this.inputsPassword[1].value,
          };
        } else {
          this.newPrivateUserInfoFields = {
            mail: this.inputEmail.find(({ dataset }) => dataset.type === 'mail').value,
          };
        }
        this.newUserInfoFields = {
          fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
          type: this.inputsInfo.find(({ dataset }) => dataset.type === 'role').value,
          description: this.inputsInfo.find(({ dataset }) => dataset.type === 'description').value,
        };

        this.changeAuthPopUp();
      }
    });
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
