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
    const form = UI.renderElement(wrapper, 'form', null, ['class', 'tests-admin__container needs-validation']);
    const titleAddTests = UI.renderElement(form, 'div', 'Добавление тестов:', ['class', 'tests-admin__title-add']);

    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название теста:', [
      'class',
      'tests-admin__items-add',
    ]);
    const divCol2 = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md']);
    const divColMB2 = UI.renderElement(divCol2, 'div', null, ['class', 'mb-0']);
    const addTitleInput = UI.renderElement(
      divColMB2,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const questionAdd = UI.renderElement(divCol2, 'div', 'Введите вопрос:', ['class', 'tests-admin__items-add']);
    const divCol2Question = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const divColMB2Question = UI.renderElement(divCol2Question, 'div', null, ['class', 'mb-0']);
    const questionInput = UI.renderElement(
      divColMB2Question,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const optionAdd = UI.renderElement(divCol2, 'div', 'Введите варианты ответов:', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divCol3Question = UI.renderElement(optionAdd, 'div', null, ['class', 'col-md']);
    const divColMB3Question = UI.renderElement(divCol3Question, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMB3Question);

    const addOptionBtn = UI.renderElement(divCol3Question, 'button', '+', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);

    addOptionBtn.addEventListener('click', () => {
      this.addInputOption(divColMB3Question);
    });

    const addQuestionBtn = UI.renderElement(titleAdd, 'button', 'Добавить вопрос', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);

    addQuestionBtn.addEventListener('click', () => {
      this.addQuestion(titleAdd);
    });

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
    const questionAdd = UI.renderElement(parent, 'div', 'Введите вопрос:', ['class', 'tests-admin__items-add']);
    const divCol2Question = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const divColMB2Question = UI.renderElement(divCol2Question, 'div', null, ['class', 'mb-0']);
    const questionInput = UI.renderElement(
      divColMB2Question,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const optionAdd = UI.renderElement(parent, 'div', 'Введите варианты ответов:', [
      'class',
      'tests-admin__items-add-option',
    ]);
    const divCol3 = UI.renderElement(optionAdd, 'div', null, ['class', 'col-md']);
    const divColMB3 = UI.renderElement(divCol3, 'div', null, ['class', 'mb-0']);
    this.addInputOption(divColMB3);

    const addOptionBtn = UI.renderElement(divCol3, 'button', '+', ['class', 'btn btn-primary tests-admin__add-option']);

    addOptionBtn.addEventListener('click', () => {
      this.addInputOption(divColMB3);
    });
    const addQuestionBtn2 = UI.renderElement(parent, 'button', 'Добавить вопрос', [
      'class',
      'btn btn-primary tests-admin__add-option',
    ]);
    addQuestionBtn2.addEventListener('click', () => {
      this.addQuestion(parent);
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
