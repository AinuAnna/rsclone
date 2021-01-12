import './TestsAdmin.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();
export default class TestsAdmin extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests-admin__container']);
    const listTitle = UI.renderElement(container, 'div', 'Список тестов:', ['class', 'tests-admin__list-title']);
    this.testsArray.forEach(({ id, title }) => {
      const div = UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'tests-admin__div']);
      const ul = UI.renderElement(div, 'ul', null, ['class', 'tests-admin__ul']);
      const a = UI.renderElement(ul, 'a', null, ['class', 'tests-admin__a'], ['href', '#']);
      const li = UI.renderElement(a, 'li', title, ['class', 'tests-admin__li']);
      const svgButtonDelete = UI.renderElement(
        li,
        'a',
        `<svg width="16" height="16" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
        </svg> `,
        ['data-bs-toggle', 'modal'],
        ['href', '#'],
        ['data-bs-target', '#deleteUserModal'],
        ['data-bs-userid', id],
        ['class', 'tests-admin__svg-button-del']
      );
    });

    const container2 = UI.renderElement(wrapper, 'div', null, ['class', 'tests-admin__container']);
    const titleAddTests = UI.renderElement(container2, 'div', 'Добавление тестов:', [
      'class',
      'tests-admin__title-add',
    ]);

    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название теста:', [
      'class',
      'tests-admin__items-add',
    ]);
    const divCol2 = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md']);
    const divColMB2 = UI.renderElement(divCol2, 'div', null, ['class', 'mb-0']);
    const addTitleInput = UI.renderElement(divColMB2, 'input', null, ['class', 'form-control'], ['type', 'text']);

    const addQuestionBtn = UI.renderElement(
      titleAdd,
      'button',
      'Добавить вопрос',
      ['class', 'btn btn-primary tests-admin__add-option'],
      ['type', 'submit']
    );

    addQuestionBtn.addEventListener('click', () => {
      this.addQuestion(titleAdd);
    });

    UI.renderElement(
      this.rootNode,
      'button',
      'Добавить тест',
      ['class', 'btn btn-primary tests-admin__btn-go'],
      ['type', 'submit']
    );
  }

  addQuestion(parent) {
    const questionAdd = UI.renderElement(parent, 'div', 'Введите вопрос:', ['class', 'tests-admin__items-add']);
    const divCol2 = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const divColMB2 = UI.renderElement(divCol2, 'div', null, ['class', 'mb-0']);
    const questionInput = UI.renderElement(divColMB2, 'input', null, ['class', 'form-control'], ['type', 'text']);
    const optionAdd = UI.renderElement(parent, 'div', 'Введите варианты ответов:', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divCol3 = UI.renderElement(optionAdd, 'div', null, ['class', 'col-md']);
    const divColMB3 = UI.renderElement(divCol3, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMB3);

    const addOptionBtn = UI.renderElement(
      divCol3,
      'button',
      'Добавить вариант ответа',
      ['class', 'btn btn-primary tests-admin__add-option'],
      ['type', 'submit']
    );

    addOptionBtn.addEventListener('click', () => {
      this.addInputOption(divColMB3);
    });

    const answerAdd = UI.renderElement(parent, 'div', 'Введите верный(ые) ответ(ы):', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divCol4 = UI.renderElement(answerAdd, 'div', null, ['class', 'col-md']);
    const divColMB4 = UI.renderElement(divCol4, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMB4);

    const addAnswerBtn = UI.renderElement(
      divCol4,
      'button',
      'Добавить верный ответ',
      ['class', 'btn btn-primary tests-admin__add-option'],
      ['type', 'submit']
    );

    addAnswerBtn.addEventListener('click', () => {
      this.addInputAnswer(divColMB4);
    });
  }

  addInputOption(parent) {
    const divInputGroup = UI.renderElement(parent, 'div', null, ['class', 'input-group']);
    const optionalInputText = UI.renderElement(divInputGroup, 'input', null, ['class', 'form-control']);
    const svgButtonDelete1 = UI.renderElement(
      divInputGroup,
      'a',
      `<svg width="16" height="16" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
      </svg> `,
      ['class', 'tests-admin__svg-button-del']
    );
  }

  addInputAnswer(parent) {
    const divInputGroup = UI.renderElement(parent, 'div', null, ['class', 'input-group']);
    const optionalInputText = UI.renderElement(divInputGroup, 'input', null, ['class', 'form-control']);
    const svgButtonDelete2 = UI.renderElement(
      divInputGroup,
      'a',
      `<svg width="16" height="16" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
      </svg> `,
      ['class', 'tests-admin__svg-button-del']
    );
  }

  setData(tests) {
    this.testsArray = tests;
  }

  render() {
    firebase.getData('Tests').then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
