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
      UI.renderElement(a, 'li', title, ['class', 'tests-admin__li']);
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
    this.addInput(divColMB3);

    const addAnswerBtn = UI.renderElement(
      divCol3,
      'button',
      'Добавить вариант ответа',
      ['class', 'btn btn-primary tests-admin__add-option'],
      ['type', 'submit']
    );

    addAnswerBtn.addEventListener('click', () => {
      this.addInput(divColMB3);
    });
  }

  addInput(parent) {
    const divInputGroup = UI.renderElement(parent, 'div', null, ['class', 'input-group']);
    const divInputText = UI.renderElement(divInputGroup, 'div', null, ['class', 'input-group-text']);
    const optionalInput = UI.renderElement(divInputText, 'input', null, ['type', 'checkbox']);
    const optionalInputText = UI.renderElement(divInputGroup, 'input', null, ['class', 'form-control']);
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
