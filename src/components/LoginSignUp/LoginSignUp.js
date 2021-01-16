/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import './LoginSignUp.scss';
import UI from '../UIclass/UIclass';

export default class LoginSignUp extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'card shadow zindex-100 mb-0']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'card-body px-md-5']);
    const containerMB = UI.renderElement(container, 'div', null, ['class', 'mb-5']);
    UI.renderElement(containerMB, 'h3', 'Регистрация', ['class', 'display-4 font-weight-light']);
    UI.renderElement(containerMB, 'p', 'Войдите в свою учетную запись, чтобы продолжить.', [
      'class',
      'text-muted mb-0',
    ]);
    UI.renderElement(container, 'span', null, ['class', 'clearfix']);
    const form = UI.renderElement(container, 'form', null, ['role', 'form']);
    const divFormGroup = UI.renderElement(form, 'div', null, ['class', 'form-group']);
    const divMail = UI.renderElement(divFormGroup, 'div', null, ['class', 'form-group']);
    UI.renderElement(divMail, 'label', 'Эл. Почта', ['class', 'form-control-label']);
    UI.renderElement(
      divFormGroup,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'email'],
      ['id', 'input-email'],
      ['placeholder', 'name@example.com']
    );
    const divFormGroupMB2 = UI.renderElement(form, 'div', null, ['class', 'form-group mb-2']);
    const divDFlex = UI.renderElement(divFormGroupMB2, 'div', null, [
      'class',
      'd-flex align-items-center justify-content-between',
    ]);
    const divPassword = UI.renderElement(divDFlex, 'div', null, ['class', 'form-group']);
    UI.renderElement(divPassword, 'label', 'Пароль', ['class', 'form-control-label']);
    const divForget = UI.renderElement(divDFlex, 'div', null, ['class', 'mb-2']);
    UI.renderElement(
      divForget,
      'a',
      'Забыли пароль?',
      ['class', 'small text-muted text-underline--dashed border-primary'],
      ['href', '#!']
    );
    UI.renderElement(
      divFormGroupMB2,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'password'],
      ['id', 'input-password'],
      ['placeholder', 'Пароль']
    );
    const divFormGroup3 = UI.renderElement(form, 'div', null, ['class', 'form-group']);
    const divFullName = UI.renderElement(divFormGroup3, 'div', null, ['class', 'form-group']);
    UI.renderElement(divFullName, 'label', 'Имя Фамилия Отчество', ['class', 'form-control-label']);
    UI.renderElement(divFormGroup3, 'input', null, ['class', 'form-control'], ['type', 'text'], ['placeholder', 'ФИО']);

    const divFormGroup4 = UI.renderElement(form, 'div', null, ['class', 'form-group']);
    const divType = UI.renderElement(divFormGroup4, 'div', null, ['class', 'form-group']);
    UI.renderElement(divType, 'label', 'Роль', ['class', 'form-control-label']);
    const selectType = UI.renderElement(divFormGroup4, 'select', null, ['class', 'form-control']);
    UI.renderElement(selectType, 'option', 'Преподаватель', ['value', 'Преподаватель']);
    UI.renderElement(selectType, 'option', 'Студент', ['value', 'Студент']);
    UI.renderElement(selectType, 'option', 'Администратор', ['value', 'Администратор']);

    const divFormGroup5 = UI.renderElement(form, 'div', null, ['class', 'form-group']);
    const divDescription = UI.renderElement(divFormGroup5, 'div', null, ['class', 'form-group']);
    UI.renderElement(divDescription, 'label', 'Описание', ['class', 'form-control-label']);
    UI.renderElement(
      divFormGroup5,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['placeholder', 'Номер группы, категория']
    );

    const divFormGroup6 = UI.renderElement(form, 'div', null, ['class', 'mt-4']);
    const ButtonSubmit = UI.renderElement(
      divFormGroup6,
      'button',
      null,
      ['class', 'btn btn-primary rounded-pill'],
      ['type', 'button']
    );
    UI.renderElement(ButtonSubmit, 'span', '✓', ['class', 'btn-inner--text'], ['style', 'font-size: 18px; ']);

    const divFormGroup7 = UI.renderElement(
      wrapper,
      'div',
      null,
      ['class', 'card-footer px-md-5'],
      ['style', 'color: #6c757d;']
    );
    const smallText = UI.renderElement(divFormGroup7, 'small', 'Уже зарегистрированы?', ['class', 'login__small']);
    UI.renderElement(smallText, 'a', 'Вход', ['class', 'small font-weight-bold'], ['href', '#']);
  }

  renderLogin() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'card shadow zindex-100 mb-0']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'card-body px-md-5']);
    const containerMB = UI.renderElement(container, 'div', null, ['class', 'mb-5']);
    UI.renderElement(containerMB, 'h3', 'Вход', ['class', 'display-4 font-weight-light']);
    UI.renderElement(containerMB, 'p', 'Войдите в свою учетную запись, чтобы продолжить.', [
      'class',
      'text-muted mb-0',
    ]);
    UI.renderElement(container, 'span', null, ['class', 'clearfix']);
    const form = UI.renderElement(container, 'form', null, ['role', 'form']);
    const divFormGroup = UI.renderElement(form, 'div', null, ['class', 'form-group']);
    const divMail = UI.renderElement(divFormGroup, 'div', null, ['class', 'form-group']);
    UI.renderElement(divMail, 'label', 'Эл. Почта', ['class', 'form-control-label']);
    UI.renderElement(
      divFormGroup,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'email'],
      ['id', 'input-email'],
      ['placeholder', 'name@example.com']
    );
    const divFormGroupMB2 = UI.renderElement(form, 'div', null, ['class', 'form-group mb-2']);
    const divDFlex = UI.renderElement(divFormGroupMB2, 'div', null, [
      'class',
      'd-flex align-items-center justify-content-between',
    ]);
    const divPassword = UI.renderElement(divDFlex, 'div', null, ['class', 'form-group']);
    UI.renderElement(divPassword, 'label', 'Пароль', ['class', 'form-control-label']);
    const divForget = UI.renderElement(divDFlex, 'div', null, ['class', 'mb-2']);
    UI.renderElement(
      divForget,
      'a',
      'Забыли пароль?',
      ['class', 'small text-muted text-underline--dashed border-primary'],
      ['href', '#!']
    );
    UI.renderElement(
      divFormGroupMB2,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'password'],
      ['id', 'input-password'],
      ['placeholder', 'Пароль']
    );

    const divFormGroup6 = UI.renderElement(form, 'div', null, ['class', 'mt-4']);
    const ButtonSubmit = UI.renderElement(
      divFormGroup6,
      'button',
      null,
      ['class', 'btn btn-primary rounded-pill'],
      ['type', 'button']
    );
    UI.renderElement(ButtonSubmit, 'span', '✓', ['class', 'btn-inner--text'], ['style', 'font-size: 18px; ']);

    const divFormGroup7 = UI.renderElement(
      wrapper,
      'div',
      null,
      ['class', 'card-footer px-md-5'],
      ['style', 'color: #6c757d;']
    );
    const smallText = UI.renderElement(divFormGroup7, 'small', 'Еще нет аккаунта?', ['class', 'login__small']);
    UI.renderElement(smallText, 'a', 'Регистрация', ['class', 'small font-weight-bold'], ['href', '#']);
  }

  render() {
    this.renderM();
    this.renderLogin();
  }
}
