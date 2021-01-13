import './LectureAdmin.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

const firebase = new FirebaseDB();
export default class LectureAdmin extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'lecture-admin__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Лекции', ['class', 'lecture-admin__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    const listMainTitle = UI.renderElement(container, 'div', 'Список лекций:', [
      'class',
      'lecture-admin__list-main-title',
    ]);
    const listTitle = UI.renderElement(listMainTitle, 'div', null, ['class', 'lecture-admin__list-title']);
    const ol = UI.renderElement(listTitle, 'ol', null, ['class', 'lecture-admin__ul']);
    this.lecturesArray.forEach(({ id, title, subtitle }) => {
      const div = UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const a = UI.renderElement(ol, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'lecture-admin__li']);
      subtitle.forEach((value) => {
        const div1 = UI.renderElement(ol, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
        const ul1 = UI.renderElement(div1, 'ul', null, ['class', 'lecture-admin__ul']);
        const a1 = UI.renderElement(ul1, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
        UI.renderElement(a1, 'li', value, ['class', 'lecture-admin__li']);
      });
    });
    const form = UI.renderElement(wrapper, 'form', null, ['class', 'tests-admin__container needs-validation']);
    const titleAddTests = UI.renderElement(form, 'div', 'Добавление лекций:', ['class', 'lecture-admin__title-add']);

    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название раздела:', [
      'class',
      'lecture-admin__items-add ',
    ]);
    const divColTitleInput = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md']);
    const divColMBTitleInput = UI.renderElement(divColTitleInput, 'div', null, ['class', 'mb-0']);
    const titleInput = UI.renderElement(
      divColMBTitleInput,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const titleAdd2 = UI.renderElement(titleAddTests, 'div', 'Введите название лекции:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const divColDoc = UI.renderElement(titleAdd2, 'div', null, ['class', 'col-md']);
    const divColMBDoc = UI.renderElement(divColDoc, 'div', null, ['class', 'mb-0']);
    const titleInput2 = UI.renderElement(
      divColMBDoc,
      'input',
      null,
      ['class', 'form-control'],
      ['type', 'text'],
      ['required', '']
    );
    const questionAdd = UI.renderElement(titleAddTests, 'div', 'Добавьте документ:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const optionalInput = UI.renderElement(
      questionAdd,
      'input',
      null,
      ['class', 'form-control form-control-lg'],
      ['type', 'file'],
      ['required', '']
    );
    UI.renderElement(
      titleAddTests,
      'button',
      'Добавить лекцию',
      ['class', 'btn btn-primary lecture-admin__btn-go'],
      ['type', 'submit']
    );
  }

  setData(tests) {
    this.lecturesArray = tests;
  }

  render() {
    firebase.getData('Lecture').then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
