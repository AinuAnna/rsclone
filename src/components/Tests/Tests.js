import './Tests.scss';
import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

export default class Tests extends UI {
  constructor(rootNode) {
    super();
    this.rootNode = rootNode;
    this.firebaseDB = new FirebaseDB();
  }

  renderList() {
    const goBtn = UI.renderElement(this.rootNode, 'div', null, ['class', 'go-back-btn']);
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);

    const goBackBtn = UI.renderElement(goBtn, 'button', 'Вернуться назад', [
      'class',
      'btn btn-primary lecture__btn-go-test',
    ]);

    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const listTitle = UI.renderElement(container, 'div', 'Список тестов:', ['class', 'tests__list-title ']);
    this.testsArray.forEach(({ id, title }) => {
      const div = UI.renderElement(listTitle, 'div', null, ['data-id', id], ['class', 'tests__div']);
      const ul = UI.renderElement(div, 'ul', null, ['class', 'tests__ul']);
      const a = UI.renderElement(ul, 'a', null, ['class', 'tests__a'], ['href', '#']);
      UI.renderElement(a, 'li', title, ['class', 'tests__li']);
    });
  }

  renderM() {
    const wrapper = UI.renderElement(this.rootNode, 'div', null, ['class', 'tests__wrapper']);
    UI.renderElement(wrapper, 'h2', 'Тесты', ['class', 'tests__title']);
    const container = UI.renderElement(wrapper, 'div', null, ['class', 'tests__container']);
    const containerList = UI.renderElement(container, 'div', null, ['class', 'tests__containerList']);
    this.testsArray.forEach(({ id, question, option, answer }) => {
      const p = UI.renderElement(containerList, 'div', question, ['class', 'tests__label']);
      const divInputs = UI.renderElement(p, 'div', null, ['data-id', id], ['class', 'tests__divInputs']);
      option.forEach((value) => {
        const divInputList = UI.renderElement(divInputs, 'div', null, ['class', 'tests__divInputList']);
        const label = UI.renderElement(divInputList, 'label', null, ['class', 'tests__label']);
        UI.renderElement(label, 'input', null, ['type', 'checkbox'], ['class', 'tests__input'], ['name', 'question']);
        UI.renderElement(label, 'label', value, ['class', 'tests__label-list'], ['for', 'question']);
      });
    });

    UI.renderElement(
      this.rootNode,
      'button',
      'Закончить тест',
      ['class', 'btn btn-primary tests__btn-go'],
      ['type', 'submit']
    );
  }

  setData(tests) {
    this.testsArray = tests;
  }

  render() {
    this.firebaseDB.getData('Tests').then((data) => {
      this.setData(data);
      this.renderM();
      this.renderList();
    });
  }
}
