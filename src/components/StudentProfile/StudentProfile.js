import './StudentProfile.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();

export default class StudentProfile extends UI {
  constructor() {
    super();
    this.submitInfoOnHandler = this.submitInfoOnHandler.bind(this);
    this.submitPasswordOnHandler = this.submitPasswordOnHandler.bind(this);
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'student-profile__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Мой профиль', ['class', 'student-profile__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'student-profile__container']);
    const left = UI.renderElement(container, 'div', null, ['class', 'student-profile__left']);
    const right = UI.renderElement(container, 'div', null, ['class', 'student-profile__right']);

    UI.renderElement(right, 'span', 'Фото профиля', ['class', 'student-profile__photo-title']);
    UI.renderElement(
      right,
      'img',
      null,
      ['class', 'student-profile__photo'],
      [
        'src',
        'data:image/jpeg;base64,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',
      ]
    );

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

    UI.renderElement(this.formData, 'button', 'Обновить данные', ['class', 'btn btn-primary'], ['type', 'submit']);

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
      return UI.renderElement(this.formPassword, 'input', '', ['class', 'student-profile__input'], ['data-type', el[0]]);
    });

    UI.renderElement(this.formPassword, 'button', 'Обновить данные', ['class', 'btn btn-primary'], ['type', 'submit']);

    this.formPassword.addEventListener('submit', this.submitPasswordOnHandler);
    this.formData.addEventListener('submit', this.submitInfoOnHandler);
  }

  submitInfoOnHandler(event) {
    event.preventDefault();
    const newFields = {
      fullName: this.inputsInfo.find(({ dataset }) => dataset.type === 'name').value,
      mail: this.inputsInfo.find(({ dataset }) => dataset.type === 'mail').value,
      type: this.inputsInfo.find(({ dataset }) => dataset.type === 'role').value,
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

  setData(data) {
    this.studentInfo = data.find(({ id }) => id === this.userId);
  }

  render(rootNode, userId) {
    this.rootNode = rootNode;
    this.userId = userId;
    firebase.getData('Users').then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
