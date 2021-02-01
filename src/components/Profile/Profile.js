/* eslint-disable class-methods-use-this */
import './Profile.scss';
import { Modal, Toast } from 'bootstrap';
import UI from '../UIclass/UIclass';
import { auth, db, FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';
import { saveDataYesBtn, changeAuthYesBtn, changeEMAILYesBtn, patternPassword } from './Profile.constants';
import '@firebase/firestore';
import '@firebase/auth';

export default class Profile extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.userId = null;
    this.studentInfo = null;
    this.newUserInfoFields = null;
    this.emailUserInfoField = null;
    this.newPrivateUserInfoFields = null;
    this.inputsInfo = null;
    this.submitInfoOnHandler = this.submitInfoOnHandler.bind(this);
    this.submitEmailOnHandler = this.submitEmailOnHandler.bind(this);
    this.submitAuthOnHandler = this.submitAuthOnHandler.bind(this);
    this.saveDataUserPopUp();
    this.changeEMAILPopUp();
    this.firebaseDB = new FirebaseDB();
  }

  disableAuthPassBtn() {
    document.querySelector('#changePass').classList.add('authBtnDisabled');
  }

  saveDataUserPopUp() {
    const saveDataUserModalPopUp = new Modal(document.getElementById('saveDataUserModal'), {});
    const saveDataUserModal = document.getElementById('saveDataUserModal');
    saveDataUserModal.addEventListener('show.bs.modal', () => {
      saveDataYesBtn.addEventListener('click', (e) => {
        e.preventDefault();
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
      this.emailUserInfoField = {
        mail: this.inputEmail.find(({ dataset }) => dataset.type === 'mail').value,
      };
      changeEMAILYesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.updatedNewUserInfoFields = { ...this.getCommonUserInfo() };
        this.updatedNewUserInfoFields.mail = this.emailUserInfoField.mail;
        this.firebaseDB.updateDataInDB('Users', this.userId, this.updatedNewUserInfoFields);

        auth.signInWithEmailAndPassword(this.studentInfo.mail, this.studentInfo.password).then(() => {
          auth.currentUser.updateEmail(`${this.emailUserInfoField.mail}`);
        });
        auth.signOut();
        localStorage.removeItem('uidMath');
        changeEMAILModalPopUp.hide();
        document.location.href = '/login.html';
      });
    });
  }

  changeAuthPopUp() {
    // debugger;
    const changeAuthModalPopUp = new Modal(document.getElementById('changeAuthModal'), {});
    const changeAuthModal = document.getElementById('changeAuthModal');
    changeAuthModal.addEventListener('show.bs.modal', () => {
      this.updatedNewUserInfoFields = { ...this.getCommonUserInfo() };
      this.updatedNewUserInfoFields.password = this.newPrivateUserInfoFields.password;
      changeAuthYesBtn.addEventListener('click', () => {
        this.firebaseDB.updateDataInDB('Users', this.userId, this.updatedNewUserInfoFields);
        auth.signInWithEmailAndPassword(this.studentInfo.mail, this.studentInfo.password).then(() => {
          auth.currentUser.updatePassword(`${this.newPrivateUserInfoFields.password}`);
        });
        auth.signOut();
        changeAuthModalPopUp.hide();
        localStorage.removeItem('uidMath');
        const toast = new Toast(document.getElementById('ToastsChange'), {});
        toast.show();
      });
    });
  }

  renderM() {
    this.rootNode.innerHTML = '';
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
      ['area-label', 'user avatar'],
      ['style', `background: url(${this.studentInfo.avatar})center center/cover`]
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
    this.emailUserInfoField = {
      mail: this.inputEmail.find(({ dataset }) => dataset.type === 'mail').value,
    };

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

    this.formPasswordNEW = UI.renderElement(
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
    this.formEmail.addEventListener('click', this.submitEmailOnHandler);
    this.formPassword.addEventListener('click', this.submitAuthOnHandler);
    this.disableAuthPassBtn();
  }

  submitInfoOnHandler(event) {
    event.preventDefault();
    this.newUserInfoFields = this.getCommonUserInfo();
  }

  submitEmailOnHandler(event) {
    event.preventDefault();
    this.newUserInfoFields = this.getCommonUserInfo();
  }

  submitAuthOnHandler(e) {
    e.preventDefault();
    const newPassword = this.inputsPassword[1].value;
    if (this.inputsPassword[0].value !== '' && this.inputsPassword[0].value !== this.studentInfo.password) {
      this.printError('passChangeErr', 'Вы ввели неверный пароль');
      e.preventDefault();
    } else if (this.inputsPassword[0].value !== '') {
      this.printError('passChangeErr', '<p style = color:green; >Вы ввели верный пароль!</p>');

      if (patternPassword.test(newPassword) === false) {
        this.printError(
          'passErr',
          'Новый пароль должен соответствовать следующим правилам: минимум - 8 знаков, цифры, одна заглавная буква, cтрочные буквы'
        );
        document.querySelector('#changePass').classList.add('authBtnDisabled');
      }
      if (newPassword === '') {
        this.printError('passErr', 'Заполните поле Новый пароль');
        document.querySelector('#changePass').classList.add('authBtnDisabled');
      } else if (newPassword !== '' && patternPassword.test(newPassword) === true) {
        this.printError('passErr', '<p style = color:green; >Вы ввели верный Новый пароль!</p>');
        document.querySelector('#changePass').classList.remove('authBtnDisabled');
        this.newPrivateUserInfoFields = {
          mail: this.inputEmail.find(({ dataset }) => dataset.type === 'mail').value,
          password: newPassword,
        };
        this.newUserInfoFields = this.getCommonUserInfo();
        this.changeAuthPopUp();
      }
    }
  }

  getCommonUserInfo() {
    const commonInfo = {
      fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
      description: this.inputsInfo.find(({ dataset }) => dataset.type === 'description').value,
    };
    return commonInfo;
  }

  printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = '';
    document.getElementById(elemId).innerHTML = hintMsg;
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
        db.collection('Users').doc(this.userId).update({
          avatar: imageBuffer,
        });
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
