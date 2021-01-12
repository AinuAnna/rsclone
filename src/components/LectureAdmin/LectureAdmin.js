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
    const listTitle = UI.renderElement(listMainTitle, 'div', 'Раздел:', ['class', 'lecture-admin__list-title']);
    this.lecturesArray.forEach(({ id, title, subtitle }) => {
      const div = UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const ul = UI.renderElement(div, 'ul', null, ['class', 'lecture-admin__ul']);
      const a = UI.renderElement(ul, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'lecture-admin__li']);
      const listSubtitle = UI.renderElement(listMainTitle, 'div', 'Тема:', ['class', 'lecture-admin__list-title']);
      const div1 = UI.renderElement(listSubtitle, 'div', null, ['data-id', id], ['class', 'lecture-admin__div']);
      const ul1 = UI.renderElement(div1, 'ul', null, ['class', 'lecture-admin__ul']);
      const a1 = UI.renderElement(ul1, 'a', null, ['class', 'lecture-admin__a'], ['href', '#']);
      UI.renderElement(a1, 'li', subtitle, ['class', 'lecture-admin__li']);
    });

    const container2 = UI.renderElement(wrapper, 'div', null, ['class', 'lecture-admin__container']);
    const titleAddTests = UI.renderElement(container2, 'div', 'Добавление лекций:', [
      'class',
      'lecture-admin__title-add',
    ]);

    const titleAdd = UI.renderElement(titleAddTests, 'div', 'Введите название раздела:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const divCol1 = UI.renderElement(titleAdd, 'div', null, ['class', 'col-md']);
    const divColMB1 = UI.renderElement(divCol1, 'div', null, ['class', 'mb-0']);
    const titleInput = UI.renderElement(divColMB1, 'input', null, ['class', 'form-control'], ['type', 'text']);
    const titleAdd2 = UI.renderElement(titleAddTests, 'div', 'Введите название лекции:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const divCol2 = UI.renderElement(titleAdd2, 'div', null, ['class', 'col-md']);
    const divColMB2 = UI.renderElement(divCol2, 'div', null, ['class', 'mb-0']);
    const titleInput2 = UI.renderElement(divColMB2, 'input', null, ['class', 'form-control'], ['type', 'text']);
    const questionAdd = UI.renderElement(titleAddTests, 'div', 'Добавьте документ:', [
      'class',
      'lecture-admin__items-add',
    ]);
    const divCol3 = UI.renderElement(questionAdd, 'div', null, ['class', 'col-md']);
    const divColMB3 = UI.renderElement(divCol3, 'div', null, ['class', 'mb-0']);
    const divInputGroup = UI.renderElement(divColMB3, 'div', null, ['class', 'input-group']);
    const divInputText = UI.renderElement(divInputGroup, 'div', null, ['class', 'input-group-text']);
    const optionalInput = UI.renderElement(divInputText, 'input', null, ['type', 'file']);
    UI.renderElement(
      this.rootNode,
      'button',
      'Добавить лекцию',
      ['class', 'btn btn-primary lecture-admin__btn-go'],
      ['type', 'submit']
    );
  }

  setData(tests) {
    this.lecturesArray = tests.flat().map((el) => el);
  }

  render() {
    firebase.getData('Lecture').then((data) => {
      this.setData(data);
      this.renderM();
    });
  }
}
