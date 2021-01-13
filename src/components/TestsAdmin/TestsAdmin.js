/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import './TestsAdmin.scss';
import { Modal } from 'bootstrap';
import UI from '../UIclass/UIclass';
import { FirebaseDB, db } from '../../utils/FirebaseDB/FirebaseDB';
import deleteYesBtn from './TestsAdmin.constants';
import '@firebase/firestore';

export default class TestsAdmin extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.id = null;
    this.deleteTest();
    this.listenerTests();
    this.firebaseDB = new FirebaseDB();
  }

  deleteTest() {
    const deleteTestModalPopUp = new Modal(document.getElementById('deleteTestModal'), {});
    const deleteTestModal = document.getElementById('deleteTestModal');
    deleteTestModal.addEventListener('show.bs.modal', (deleteEvent) => {
      const button = deleteEvent.relatedTarget;
      const testId = button.getAttribute('data-bs-testid');
      deleteYesBtn.addEventListener('click', () => {
        this.firebaseDB.deleteItem('Tests', testId);
        deleteTestModalPopUp.hide();
        this.render();
      });
    });
  }

  listenerTests() {
    db.collection('Tests').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.render();
        } else if (change.type === 'removed') {
          this.render();
        }
      });
    });
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests-admin__container']);
    const listTitle = UI.renderElement(container, 'div', 'Список тестов:', ['class', 'tests-admin__list-title ']);
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
        ['data-bs-target', '#deleteTestModal'],
        ['data-bs-testid', id]
      );
    });
    // container with button add test
    const form = UI.renderElement(wrapper, 'form', null, ['class', 'tests-admin__container needs-validation']);
    // container with text add tests
    const titleAddTests = UI.renderElement(form, 'div', 'Добавление тестов:', ['class', 'tests-admin__title-add']);
    // container with fields(title test, question, option)
    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название теста:', [
      'class',
      'tests-admin__items-add',
    ]);
    // container for oll inputs in tests add
    const divTitleTestInput = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md-cont']);
    const divInputQuestion = UI.renderElement(divTitleTestInput, 'div', null, ['class', 'col-md']);
    const addTitleInput = UI.renderElement(
      divInputQuestion,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const divInputQuestionCont = UI.renderElement(divTitleTestInput, 'div', null, ['class', 'col-md']);
    // container for question
    const questionAdd = UI.renderElement(divInputQuestionCont, 'div', 'Введите вопрос:', [
      'class',
      'tests-admin__items-add',
    ]);
    const divCol2questionAdd = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const divColMB2questionAdd = UI.renderElement(divCol2questionAdd, 'div', null, ['class', 'mb-0']);
    const questionInput = UI.renderElement(
      divColMB2questionAdd,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    // container for option
    const optionAdd = UI.renderElement(divInputQuestionCont, 'div', 'Введите варианты ответов:', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divColoptionAdd = UI.renderElement(optionAdd, 'div', null, ['class', 'col-md']);
    const divColMBoptionAdd = UI.renderElement(divColoptionAdd, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMBoptionAdd);
    // container for button add option
    const addOptionBtn = UI.renderElement(optionAdd, 'button', '+', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);

    addOptionBtn.addEventListener('click', () => {
      this.addInputOption(divColMBoptionAdd);
    });
    // container for button add question
    const addQuestionBtn = UI.renderElement(titleAddTests, 'button', 'Добавить вопрос', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);
    // limit for buttons(9 fields)
    let limit = 0;
    addQuestionBtn.addEventListener('click', () => {
      if (limit < 8) {
        this.addQuestion(divTitleTestInput);
        limit++;
      } else {
        this.hidden = true;
      }
    });
    // button add test submit
    const divForm = UI.renderElement(form, 'div', null, ['class', 'tests-admin__container']);
    UI.renderElement(
      divForm,
      'button',
      'Добавить тест',
      ['class', 'btn btn-primary tests-admin__btn-go'],
      ['type', 'submit']
    );
  }

  addQuestion(parent) {
    const divInputQuestion = UI.renderElement(parent, 'div', null, ['class', 'col-md']);
    const questionAdd = UI.renderElement(divInputQuestion, 'div', 'Введите вопрос:', [
      'class',
      'tests-admin__items-add',
    ]);
    const divColQuestion = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const questionInput = UI.renderElement(
      divColQuestion,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const optionAdd = UI.renderElement(divInputQuestion, 'div', 'Введите варианты ответов:', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divColoptionAdd = UI.renderElement(optionAdd, 'div', null, ['class', 'col-md']);
    const divColMBoptionAdd = UI.renderElement(divColoptionAdd, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMBoptionAdd);

    const addOptionBtn = UI.renderElement(divColoptionAdd, 'button', '+', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);

    addOptionBtn.addEventListener('click', () => {
      this.addInputOption(divColMBoptionAdd);
    });
  }

  addInputOption(parent) {
    const divInputGroup = UI.renderElement(parent, 'div', null, ['class', 'input-group inputRemoveOption']);
    const divInputText = UI.renderElement(divInputGroup, 'div', null, ['class', 'input-group-text']);
    const optionalInput = UI.renderElement(divInputText, 'input', null, ['type', 'checkbox']);
    const optionalInputText = UI.renderElement(divInputGroup, 'input', null, ['class', 'form-control']);
    const svgButtonDelete1 = UI.renderElement(
      divInputGroup,
      'a',
      `<svg width="16" height="16" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.3 4.75V2.5C6.3 1.67157 6.9268 1 7.7 1H13.3C14.0732 1 14.7 1.67157 14.7 2.5V4.75M0 5.5H21M2.1 5.5V20.5C2.1 21.3284 2.7268 22 3.5 22H17.5C18.2732 22 18.9 21.3284 18.9 20.5V5.5M10.5 10.75V18.25M6.3 13.75V18.25M14.7 13.75V18.25" stroke="#F49344"/>
      </svg> `,
      ['class', 'tests-admin__svg-button-del']
    );
    svgButtonDelete1.addEventListener('click', (event) => {
      const cont = event.target.closest('.inputRemoveOption');
      parent.removeChild(cont);
    });
  }

  setData(tests) {
    this.testsArray = tests;
  }

  render() {
    this.firebaseDB.getData('Tests').then((data) => {
      this.setData(data);
      this.rootNode.innerHTML = '';
      this.renderM();
    });
  }
}
